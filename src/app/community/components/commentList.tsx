import { useParams } from 'next/navigation';
import React from 'react';
import CommentItem from './commentItem';

const CommentList = () => {
  const params = useParams();
  const dummyData = localStorage.getItem('community');
  const communityData = dummyData ? JSON.parse(dummyData) : [];
  const matchedData = communityData.find(
    (item: ICommunityItem) => item.id === Number(params.id)
  );
  const editCommentHandler = (id: string, editedComment: string) => {
    const newComment = {
      id: 2,
      postId: params.id,
      userId: 'user123',
      content: editedComment,
    };
    matchedData.comment.splice(newComment.id - 1, 1, newComment);
    const updatedData = communityData.map((item: ICommunityItem) =>
      item.id === matchedData.id ? matchedData : item
    );
    localStorage.setItem('community', JSON.stringify(updatedData));
  };

  return (
    <div>
      {matchedData.comment?.map((i: ICommentItemProps) => (
        <CommentItem key={i.id} comment={i} onEdit={editCommentHandler} />
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
interface ICommentItemProps {
  id: string;
  postId: string;
  userId: string;
  content: string;

  onEdit: (id: string, editedComment: string) => void;
}
