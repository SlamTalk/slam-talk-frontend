import React from 'react';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { MatePost } from '@/types/matching/mateDataType';
import { useRouter } from 'next/navigation';

const MiniMatePostCard = ({ matePost }: { matePost: MatePost }) => {
  const router = useRouter();
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

  const handleClick = () => {
    router.push(`/matching/mate-details/${matePost.matePostId}`);
  };

  return (
    <Card
      fullWidth
      className="h-[180px] max-w-[180px]"
      isPressable
      onPress={handleClick}
    >
      <CardHeader>
        <div className="w-full">
          <div className="text-md line-clamp-1 w-full text-left font-bold">
            {shortLocation}
          </div>
          <div className="line-clamp-1 w-full text-left text-small text-default-500">
            {formattedDate} {matePost.startTime}
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="line-clamp-3">{matePost.title}</div>
      </CardBody>
    </Card>
  );
};
export default MiniMatePostCard;
