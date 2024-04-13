'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '@/app/api/axiosInstance';
import { UserInfo } from '@/types/user/userInfo';
import { useDisclosure } from '@nextui-org/react';
import UserProfile from '@/app/components/profile/UserProfile';
import { Participant } from '../../../types/matching/mateDataType';

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      className="mb-2 mt-2 flex justify-between rounded-md border-2 px-3 py-1 sm:px-1"
    >
      <div className="flex items-center">
        <div>
          <UserProfile
            isOpen={isOpen}
            userId={applicant?.participantId || -1}
            onClose={onClose}
          />
          <span
            className="mr-2 w-[110px] overflow-hidden truncate font-semibold sm:max-w-[40px]"
            role="button"
            tabIndex={0}
            onClick={onOpen}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onOpen();
              }
            }}
            aria-label={`${applicant.participantNickname}의 프로필 모달 열기`}
          >
            {applicant.participantNickname}
          </span>
        </div>

        <div className="mr-1 rounded-md bg-gray-200 px-2 py-1 text-xs dark:bg-gray-400">
          {applicant.position}
        </div>
        <div className="rounded-md bg-gray-200 px-2 py-1 text-xs  dark:bg-gray-400">
          {applicant.skillLevel}
        </div>
      </div>
      <div className="flex items-center">
        {isWriter && applicant.applyStatus === 'WAITING' ? (
          <>
            <button
              type="button"
              className="mx-1 rounded-lg bg-success px-2 py-1.5 text-xs text-black"
              onClick={() => handleAccept(applicant.participantTableId)}
            >
              수락
            </button>
            <button
              type="button"
              className="mx-1 rounded-lg bg-danger px-2 py-1.5 text-xs text-black"
              onClick={() => handleReject(applicant.participantTableId)}
            >
              거절
            </button>
          </>
        ) : (
          <div className="mr-2 text-sm sm:mr-1">
            <span className={getStatusClassName(applicant.applyStatus)}>
              {applicant.applyStatus}
            </span>
          </div>
        )}
        {user?.id === applicant.participantId &&
          applicant.applyStatus === 'WAITING' && (
            <button
              type="button"
              className="mx-1 rounded-lg bg-gray-400 px-2 py-1.5 text-xs text-black"
              onClick={() => handleCancel(applicant.participantTableId)}
            >
              취소
            </button>
          )}
      </div>
    </div>
  );
};

export default MateApplicantList;
