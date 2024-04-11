'use client';

import React from 'react';
import { UserInfo } from '@/types/user/userInfo';
import { TeamApplied } from '@/types/matching/teamDataType';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { AxiosResponse } from 'axios';
import axiosInstance from '@/app/api/axiosInstance';
import { useDisclosure } from '@nextui-org/react';
import UserProfile from '@/app/components/profile/UserProfile';

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
  const {
    isOpen: profileModalIsOpen,
    onOpen: profileModalOnOpen,
    onClose: profileModalOnClose,
  } = useDisclosure();

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
        <div>
          <UserProfile
            isOpen={profileModalIsOpen}
            userId={applicant?.applicantId || -1}
            onClose={profileModalOnClose}
          />
          <span
            className="mr-2 w-[110px] overflow-hidden truncate font-semibold sm:max-w-[40px]"
            role="button"
            tabIndex={0}
            onClick={profileModalOnOpen}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                profileModalOnOpen();
              }
            }}
            aria-label={`${applicant.applicantNickname}의 프로필 모달 열기`}
          >
            {applicant.applicantNickname}
          </span>
        </div>
        <div className="y-1 mr-2 font-semibold">[{applicant.teamName}]</div>
        <div className="rounded-md bg-gray-200 px-2 py-1 text-xs dark:bg-gray-400">
          {applicant.skillLevel}
        </div>
      </div>
      <div className="flex items-center">
        {isWriter && applicant.applyStatus === 'WAITING' ? (
          <>
            <button
              type="button"
              className="mx-1 rounded-lg bg-success px-2 py-1.5 text-xs text-black"
              onClick={() => handleAccept(applicant.teamApplicantTableId)}
            >
              수락
            </button>
            <button
              type="button"
              className="mx-1 rounded-lg bg-danger px-2 py-1.5 text-xs text-black"
              onClick={() => handleReject(applicant.teamApplicantTableId)}
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
        {user?.id === applicant.applicantId &&
          applicant.applyStatus === 'WAITING' && (
            <button
              type="button"
              className="mx-1 rounded-lg bg-gray-400 px-2 py-1.5 text-xs text-black"
              onClick={() => handleCancel(applicant.teamApplicantTableId)}
            >
              취소
            </button>
          )}
      </div>
    </div>
  );
};

export default TeamApplicantList;
