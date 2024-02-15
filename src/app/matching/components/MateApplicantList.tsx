import React from 'react';
import { Button } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '@/app/api/axiosInstance';
import { UserInfo } from '@/types/user/userInfo';
import { Participant } from './MateDataType';

interface PatchParticipantStatusParams {
  participantTableId: number;
  status: string;
}

interface MateApplicantListProps {
  user: UserInfo | null | undefined;
  applicant: Participant;
  isWriter: boolean;
}

const getStatusClassName = (status: string) => {
  switch (status) {
    case 'WAITING':
      return 'text-yellow-500';
    case 'ACCEPTED':
      return 'text-green-500';
    case 'REJECTED':
      return 'text-red-500';
    case 'CANCELED':
      return 'text-gray-400';
    default:
      return '';
  }
};

const MateApplicantList: React.FC<MateApplicantListProps> = ({
  user,
  applicant,
  isWriter,
}) => {
  const { postId } = useParams();

  const patchParticipantStatus = async ({
    participantTableId,
    status,
  }: PatchParticipantStatusParams): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.patch<AxiosResponse>(
        `/api/mate/${postId}/participants/${participantTableId}?applyStatus=${status}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const patchStatusMutation = useMutation<
    AxiosResponse,
    Error,
    PatchParticipantStatusParams
  >({
    mutationFn: patchParticipantStatus,
    onSuccess: () => {
      console.log('success');
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const handleAccept = (participantTableId: number) => {
    const status = 'ACCEPTED';
    patchStatusMutation.mutate({
      participantTableId,
      status,
    });
    window.location.reload();
  };

  const handleReject = (participantTableId: number) => {
    const status = 'REJECTED';
    patchStatusMutation.mutate({
      participantTableId,
      status,
    });
    window.location.reload();
  };

  const handleCancel = (participantTableId: number) => {
    const status = 'CANCELED';
    patchStatusMutation.mutate({
      participantTableId,
      status,
    });
    window.location.reload();
  };

  return (
    <div
      key={applicant.participantTableId}
      className="mb-2 mt-2 flex justify-between rounded-md border-2 px-3 py-1"
    >
      <div className="flex items-center">
        <span
          className="w-30 mr-2 overflow-hidden truncate font-semibold"
          style={{ width: '110px' }}
        >
          {applicant.participantNickname}
        </span>
        <div className="mr-1 rounded-md bg-gray-200 px-2 py-1 dark:bg-gray-400">
          {applicant.position}
        </div>
        <div className="rounded-md bg-gray-200 px-2 py-1 dark:bg-gray-400">
          {applicant.skillLevel}
        </div>
      </div>
      <div className="flex items-center">
        {isWriter && applicant.applyStatus === 'WAITING' ? (
          <>
            <Button
              className="text-black"
              size="sm"
              color="success"
              onClick={() => handleAccept(applicant.participantTableId)}
            >
              수락
            </Button>
            <Button
              className="ml-1 text-black"
              size="sm"
              color="danger"
              onClick={() => handleReject(applicant.participantTableId)}
            >
              거절
            </Button>
          </>
        ) : (
          <div className="mr-2 text-sm">
            <span className={getStatusClassName(applicant.applyStatus)}>
              {applicant.applyStatus}
            </span>
          </div>
        )}
        {user?.id === applicant.participantId &&
          applicant.applyStatus === 'WAITING' && (
            <Button
              className="bg-gray-400 text-black"
              size="sm"
              onClick={() => handleCancel(applicant.participantTableId)}
            >
              취소
            </Button>
          )}
      </div>
    </div>
  );
};

export default MateApplicantList;
