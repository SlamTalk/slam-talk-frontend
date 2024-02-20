'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { UserInfo } from '@/types/user/userInfo';
import { TeamApplied } from '@/types/matching/teamDataType';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { AxiosResponse } from 'axios';
import axiosInstance from '@/app/api/axiosInstance';

interface PatchTeamApplicantStatusParams {
  teamApplicantTableId: number;
  status: string;
}

interface TeamApplicantListProps {
  user: UserInfo | null | undefined;
  applicant: TeamApplied;
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

const TeamApplicantList: React.FC<TeamApplicantListProps> = ({
  user,
  applicant,
  isWriter,
}) => {
  const { postId } = useParams();

  const patchTeamApplicantStatus = async ({
    teamApplicantTableId,
    status,
  }: PatchTeamApplicantStatusParams): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.patch<AxiosResponse>(
        `/api/match/${postId}/apply/${teamApplicantTableId}?applyStatus=${status}`
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
    PatchTeamApplicantStatusParams
  >({
    mutationFn: patchTeamApplicantStatus,
    onSuccess: () => {
      console.log('success');
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const handleAccept = (teamApplicantTableId: number) => {
    const status = 'ACCEPTED';
    patchStatusMutation.mutate({
      teamApplicantTableId,
      status,
    });
    window.location.reload();
  };

  const handleReject = (teamApplicantTableId: number) => {
    const status = 'REJECTED';
    patchStatusMutation.mutate({
      teamApplicantTableId,
      status,
    });
    window.location.reload();
  };

  const handleCancel = (teamApplicantTableId: number) => {
    const status = 'CANCELED';
    patchStatusMutation.mutate({
      teamApplicantTableId,
      status,
    });
    window.location.reload();
  };

  return (
    <div
      key={applicant.applicantId}
      className="mb-2 mt-2 flex justify-between rounded-md border-2 px-3 py-1 sm:px-1"
    >
      <div className="flex items-center">
        <span
          className="w-30 mr-2 overflow-hidden truncate font-semibold sm:max-w-[40px]"
          style={{ width: '110px' }}
        >
          {applicant.applicantNickname}
        </span>
        <div className="y-1 mr-2 font-semibold">[{applicant.teamName}]</div>
        <div className="rounded-md bg-gray-200 px-2 py-1 text-xs dark:bg-gray-400">
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
              onClick={() => handleAccept(applicant.teamApplicantTableId)}
            >
              수락
            </Button>
            <Button
              className="ml-1 text-black"
              size="sm"
              color="danger"
              onClick={() => handleReject(applicant.teamApplicantTableId)}
            >
              거절
            </Button>
          </>
        ) : (
          <div className="mr-2 text-sm sm:mr-1">
            <span className={getStatusClassName(applicant.applyStatus)}>
              {applicant.applyStatus}
            </span>
          </div>
        )}
        {user?.id === applicant.applicantId &&
          applicant.applyStatus === 'WAITING' && (
            <Button
              className="bg-gray-400"
              size="sm"
              onClick={() => handleCancel(applicant.teamApplicantTableId)}
            >
              취소
            </Button>
          )}
      </div>
    </div>
  );
};

export default TeamApplicantList;
