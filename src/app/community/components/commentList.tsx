import { useParams } from 'next/navigation';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCommunityArticle } from '@/services/community/getCommunityArticle';
import { Spinner } from '@nextui-org/react';
import CommentItem from './commentItem';

interface ICommentItemProps {
  commentId: string;
  communityId: string;
  userId: string;
  content: string;

  onEdit: (id: string, editedComment: string) => void;
  onDelete: (id: string, editedComment: string) => void;
}

const CommentList = () => {
  const params = useParams<{ id: string }>();

  const { data: commentListData } = useQuery({
    queryKey: ['getCommunityComment'],
    queryFn: () => getCommunityArticle(params.id),
  });
  if (!commentListData) {
    return (
      <div className="align-center flex h-screen justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="h-[280px] overflow-y-auto sm:h-[340px]">
      {commentListData?.comments.map((i: ICommentItemProps) => (
        <div key={i.commentId}>
          <CommentItem
            key={i.commentId}
            commentId={+i.commentId}
            userId={+i.userId}
            content={i.content}
            communityId={+i.communityId}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
