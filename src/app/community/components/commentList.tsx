import { useParams } from 'next/navigation';
import React from 'react';

const CommentList = () => {
  const params = useParams();
  const dummyData = localStorage.getItem('community');
  const communityData = dummyData ? JSON.parse(dummyData) : [];
  const matchedData = communityData.find(
    (item: ICommunityItem) => item.id === Number(params.id)
  );
  console.log(matchedData.comment);
  return (
    <div>
      {matchedData.comment.map((i: ICommunityItem) => (
        <li>{i.content}</li>
      ))}
    </div>
  );
};

export default CommentList;

interface ICommunityItem {
  id: number;
  title: string;
  content: string;
  tag: string;
  comment?: [
    {
      id: string;
      postId: string;
      userId: string;
      content: string;
    },
  ];
}
