import React from 'react';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { TeamPost } from '@/types/matching/teamDataType';
import { useRouter } from 'next/navigation';

const MiniTeamPostCard = ({ teamPost }: { teamPost: TeamPost }) => {
  const router = useRouter();
  const shortLocation = teamPost.locationDetail
    .split(' ')
    .slice(0, 2)
    .join(' ');
  const formattedDate = new Date(teamPost.scheduledDate).toLocaleDateString(
    'ko-KR',
    {
      month: 'long',
      day: 'numeric',
    }
  );

  const handleClick = () => {
    router.push(`/matching/team-details/${teamPost.teamMatchingId}`);
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
            {formattedDate} {teamPost.startTime}
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="line-clamp-3">{teamPost.title}</div>
      </CardBody>
    </Card>
  );
};
export default MiniTeamPostCard;
