import React from 'react';
import { Card } from '@nextui-org/react';
import { MateCardInfo } from './MateDataType';

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours < 12 ? '오전' : '오후';
  const formattedHour = hours % 12 || 12;

  const formattedMinutes = minutes !== 0 ? `${minutes}분` : '';

  return `${period} ${formattedHour}시${formattedMinutes.length > 0 ? ` ${formattedMinutes}` : ''}`;
};

const MatePostCard: React.FC<MateCardInfo> = ({
  title,
  date,
  startTime,
  location,
  level,
  positionNeeds,
}) => {
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = formatTime(startTime);

  const simplifiedLocation = location.split(' ').slice(0, 2).join(' ');

  return (
    <Card className="m-3">
      <div className="p-4">
        <h4 className="text-md font-bold">{title}</h4>
        <div className="mb-1 mt-2 flex items-center justify-between">
          <p className="text-sm">{simplifiedLocation}</p>{' '}
          {/* 수정된 주소 사용 */}
          <div className="flex flex-wrap">
            {positionNeeds.map(({ position, maxPosition, currentPosition }) => (
              <div
                key={position}
                className="mx-1 rounded border bg-gray-300 p-1 text-xs font-bold text-black"
              >
                {`${position}: ${currentPosition}/${maxPosition}`}
              </div>
            ))}
          </div>
        </div>
        <div className="my-1 flex items-center justify-between">
          <p className="text-sm">{`${formattedDate} ${formattedTime}`}</p>
          <div className="flex flex-wrap">
            {level.map((lvl) => (
              <div
                key={lvl}
                className="mx-1 rounded border bg-gray-300 p-1 text-xs font-bold text-black"
              >
                {lvl}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MatePostCard;
