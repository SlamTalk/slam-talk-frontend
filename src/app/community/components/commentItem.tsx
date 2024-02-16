import React from 'react';

interface ICommentItemProps {
  commentId: number;
  // communityId: number;
  userId: number;
  content: string;
}

const CommentItem: React.FC<ICommentItemProps> = ({
  userId,
  // communityId,
  content,
  commentId,
}) => (
  <div
    key={commentId}
    className="border-gray mt-2 flex items-center border-b-2"
  >
    <p className="m-2 w-14 text-sm">{commentId}</p>
    <p>{userId}</p>

    <h2 className="ml-2 mt-2 h-10 w-[750px]">{content}</h2>

    <div aria-label="comment button group" className="w-40">
      <button className="text-gray-600 hover:text-primary" type="button">
        수정
      </button>
      <button type="button" className="mx-3 text-gray-600 hover:text-primary">
        삭제
      </button>
    </div>
  </div>
);

export default CommentItem;
