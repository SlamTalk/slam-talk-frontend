import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@nextui-org/react';

type MateApplicantListProps = {
  user: {
    userId: number;
    // user 객체의 다른 필요한 타입 정의
  };
  applicant: {
    participantTableId: number;
    participantNickname: string;
    applyStatus: string;
    position: string;
    skillLevel: string;
    participantId: number;
  };
  isWriter: boolean;
};

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

const MateApplicantList = ({
  user,
  applicant,
  isWriter,
}: MateApplicantListProps) => {
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
      className="mb-2 mt-2 flex justify-between rounded-md bg-gray-300 px-3 py-1"
    >
      <div className="flex items-center">
        <span
          className="w-30 mr-2 truncate font-semibold"
          style={{ minWidth: '80px' }}
        >
          {applicant.participantNickname}
        </span>
        <div className="mr-1 rounded-md bg-gray-200 px-2 py-1">
          {applicant.position}
        </div>
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
MateApplicantList.propTypes = {
  applicant: PropTypes.shape({
    participantTableId: PropTypes.number.isRequired,
    participantNickname: PropTypes.string.isRequired,
    applyStatus: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    skillLevel: PropTypes.string.isRequired,
    participantId: PropTypes.number.isRequired,
  }).isRequired,
  isWriter: PropTypes.bool.isRequired,
};

export default MateApplicantList;
