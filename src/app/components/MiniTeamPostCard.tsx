import React from 'react';
import { Card, CardHeader, CardBody, Divider, Link } from '@nextui-org/react';
import { TeamPost } from '@/types/matching/teamDataType';

const MiniTeamPostCard = ({ teamPost }: { teamPost: TeamPost }) => {
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

  return (
    <Link href={`/matching/team-details/${teamPost.teamMatchingId}`}>
      <Card className="my-4 h-[180px] w-[180px]">
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-md line-clamp-1 font-bold">{shortLocation}</p>
            <p className="text-small text-default-500">
              {formattedDate} {teamPost.startTime}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="line-clamp-3">{teamPost.title}</p>
        </CardBody>
      </Card>
    </Link>
  );
};
export default MiniTeamPostCard;
