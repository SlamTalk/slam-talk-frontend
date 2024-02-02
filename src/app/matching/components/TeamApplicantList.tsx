import React from 'react';
import { Button } from '@nextui-org/react';

interface User {
  userId: number;
  // 여기에 User 객체의 다른 필요한 타입 정의
}

interface Applicant {
  participantTableId: number;
  participantNickname: string;
  teamName: string;
  applyStatus: string;
  skillLevel: string;
  participantId: number;
}

interface TeamApplicantListProps {
  user: User;
  applicant: Applicant;
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
  const handleAccept = (participantTableId: number) => {
    // 수락 로직 구현
    console.log(`Accepted: ${participantTableId}`);
  };

  const handleReject = (participantTableId: number) => {
    // 거절 로직 구현
    console.log(`Rejected: ${participantTableId}`);
  };

  const handleCancel = (participantTableId: number) => {
    // 취소 로직 구현
    console.log(`Canceled: ${participantTableId}`);
  };

  return (
    <div
      key={applicant.participantTableId}
      className="mb-2 mt-2 flex justify-between rounded-md bg-gray-300 px-3 py-1"
    >
      <div className="flex items-center">
        <span
          className="w-30 mr-2 overflow-hidden truncate font-semibold"
          style={{ width: '110px' }}
        >
          {applicant.participantNickname}
        </span>
        <div className="y-1 mr-2 font-semibold">[{applicant.teamName}]</div>
        <div className="rounded-md bg-gray-200 px-2 py-1">
          {applicant.skillLevel}
        </div>
      </div>
      <div className="flex items-center">
        {isWriter && applicant.applyStatus === 'WAITING' ? (
          <>
            <Button
              size="sm"
              color="success"
              onClick={() => handleAccept(applicant.participantTableId)}
            >
              수락
            </Button>
            <Button
              className="ml-1"
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
        {user.userId === applicant.participantId &&
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

export default TeamApplicantList;
