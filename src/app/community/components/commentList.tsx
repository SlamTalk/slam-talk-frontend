import React from 'react';

import CommentItem, { ICommentItemProps } from './commentItem';

interface ICommentListProps {
  commentListData: ICommentItemProps[];
}

const CommentList: React.FC<ICommentListProps> = ({ commentListData }) => (
  <div className="mx-1 h-[calc(100vh-450px)] overflow-auto pb-4 sm:text-sm">
    {commentListData?.map((i: ICommentItemProps) => (
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

export default CommentList;
