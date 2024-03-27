import React from 'react';

import CommentItem, { ICommentItemProps } from './commentItem';

interface ICommentListProps {
  commentListData: ICommentItemProps[];
}

const CommentList: React.FC<ICommentListProps> = ({ commentListData }) => (
  <div className="h-fit min-h-[400px] overflow-y-auto sm:h-[340px]">
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
