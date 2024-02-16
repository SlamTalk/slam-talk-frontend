import { useParams } from 'next/navigation';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getComment } from '@/services/community/comment/getCommnet';
import CommentItem from './commentItem';

// interface ICommunityItem {
//   id: number;
//   title: string;
//   content: string;
//   tag: string;
//   comment?: [
//     {
//       id: string;
//       postId: string;
//       userId: string;
//       content: string;
//     },
//   ];
// }
interface ICommentItemProps {
  commentId: string;
  communityId: string;
  userId: string;
  content: string;

  onEdit: (id: string, editedComment: string) => void;
  onDelete: (id: string, editedComment: string) => void;
}

const CommentList = () => {
  const params = useParams();
  const { data: commentListData } = useQuery({
    queryKey: ['getComment'],
    queryFn: () => getComment(+params.id),
  });
  // const handleEditComment = (id: string, editedComment: string) => {
  //   const newComment = {
  //     id: 2,
  //     postId: params.id,
  //     userId: 'user123',
  //     content: editedComment,
  //   };

  return (
    <div>
      {commentListData?.map((i: ICommentItemProps) => (
        <div key={i.commentId}>
          <CommentItem
            key={i.commentId}
            commentId={+i.commentId}
            userId={+i.userId}
            content={i.content}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
