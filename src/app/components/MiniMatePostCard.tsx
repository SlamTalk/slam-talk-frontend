import React from 'react';
import { Card, CardHeader, CardBody, Divider, Link } from '@nextui-org/react';
import { MatePost } from '@/types/matching/mateDataType';

const MiniMatePostCard = ({ matePost }: { matePost: MatePost }) => {
  const shortLocation = matePost.locationDetail
    .split(' ')
    .slice(0, 2)
    .join(' ');
  const formattedDate = new Date(matePost.scheduledDate).toLocaleDateString(
    'ko-KR',
    {
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <Link href={`/matching/mate-details/${matePost.matePostId}`}>
      <Card className="my-4 h-[180px] w-[180px]">
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-md font-bold">{shortLocation}</p>
            <p className="text-small text-default-500">
              {formattedDate} {matePost.startTime}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="overflow-hidden">{matePost.title}</p>
        </CardBody>
      </Card>
    </Link>
  );
};
export default MiniMatePostCard;
