import React, { useEffect, useState } from 'react';

import CommentItem, { ICommentItemProps } from './commentItem';

interface ICommentListProps {
  commentListData: ICommentItemProps[];
  refetch: () => void;
}

const CommentList: React.FC<ICommentListProps> = ({
  commentListData,
  refetch,
}) => {
  const [comments, setComments] =
    useState<ICommentItemProps[]>(commentListData);
  useEffect(() => {
    setComments(commentListData);
  }, [comments, commentListData]);
  return (
    <div className="mx-1 h-[calc(100vh-450px)] overflow-auto pb-4 sm:text-sm">
      {comments?.map((i: ICommentItemProps) => (
        <div key={i.commentId}>
          <CommentItem
            key={i.commentId}
            commentId={+i.commentId}
            userId={+i.userId}
            content={i.content}
            communityId={+i.communityId}
            refetch={refetch}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
