import { useParams } from 'next/navigation';
import React from 'react';

const CommentList = () => {
  const params = useParams();
  const dummyData = localStorage.getItem('community');
  const communityData = dummyData ? JSON.parse(dummyData) : [];
  const matchedData = communityData.find(
    (item: ICommunityItem) => item.id === Number(params.id)
  );
  return (
    <div>
      {matchedData.comment?.map((i: ICommunityItem) => (
        <div key={i.id}>
          <h2>{i.content}</h2>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
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
