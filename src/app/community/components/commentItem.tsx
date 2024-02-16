import { patchComment } from '@/services/community/comment/patchComment';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

interface ICommentItemProps {
  commentId: number;
  communityId: number;
  userId: number;
  content: string;
}

const CommentItem: React.FC<ICommentItemProps> = ({
  userId,
  communityId,
  content,
  commentId,
}) => {
  const [editToggle, setEditToggle] = useState(false);
  const [editedComment, setEditedComment] = useState('');
  const patchArticleComment = useMutation({
    mutationKey: ['patchComment'],
    mutationFn: () => patchComment(communityId, editedComment, commentId),
  });
  const handleEdit = async () => {
    setEditToggle(!editToggle);
    if (editToggle && editedComment !== '') {
      console.log(editedComment);
      await patchArticleComment.mutate();
      setEditToggle(false);
      window.location.reload();
    }
  };
  return (
    <div
      key={commentId}
      className="border-gray mt-2 flex items-center border-b-2"
    >
      <p className="m-2 w-14 text-sm">{commentId}</p>
      <p>{userId}</p>
      {editToggle ? (
        <input
          className="ml-2 mt-2 h-10 w-[750px]"
          placeholder={content}
          onChange={(e) => {
            setEditedComment(e.target.value);
          }}
        />
      ) : (
        <h2 className="ml-2 mt-2 h-10 w-[750px]">{content}</h2>
      )}
      <div aria-label="comment button group" className="w-40">
        <button
          onClick={handleEdit}
          className="text-gray-600 hover:text-primary"
          type="button"
        >
          수정
        </button>
        <button type="button" className="mx-3 text-gray-600 hover:text-primary">
          삭제
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
