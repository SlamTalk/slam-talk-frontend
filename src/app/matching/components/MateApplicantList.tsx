import React from 'react';
import { Button } from '@nextui-org/react';
import { Participant } from './MateDataType';

interface User {
  userId: number;
  // user 객체의 다른 필요한 타입 정의
}

interface MateApplicantListProps {
  user: User;
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
  const handleAccept = (participantTableId: number) => {
    // 수락 로직 구현
    console.log(participantTableId);
  };

  const handleReject = (participantTableId: number) => {
    // 거절 로직 구현
    console.log(participantTableId);
  };

  const handleCancel = (participantTableId: number) => {
    // 취소 로직 구현
    console.log(participantTableId);
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

export default MateApplicantList;
