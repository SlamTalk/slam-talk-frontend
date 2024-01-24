import React, { useState } from 'react';

interface ICommentItemProps {
  comment: {
    id: string;
    postId: string;
    userId: string;
    content: string;
  };
  onEdit: (id: string, editedComment: string) => void;
  onDelete: (id: string) => void;
}

const CommentItem: React.FC<ICommentItemProps> = ({
  comment,
  onEdit,
  onDelete,
}) => {
  const [editToggle, setEditToggle] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const handleEdit = () => {
    setEditToggle(!editToggle);
    if (editToggle) {
      onEdit(comment.id, editedComment);
      setEditedComment('');
      setEditToggle(false);
    }
  };
  const handleDelete = () => {
    onDelete(comment.id);
  };
  return (
    <div
      key={comment.id}
      className="border-gray mt-2 flex items-center border-b-2"
    >
      <p className="m-2 w-14 text-sm">{comment.userId}</p>
      {editToggle ? (
        <input
          placeholder={comment.content}
          value={editedComment}
          onChange={(e) => {
            setEditedComment(e.target.value);
          }}
        />
      ) : (
        <h2 className="ml-2 mt-2 h-10 w-[750px]">{comment.content}</h2>
      )}
      <div aria-label="comment button group" className="w-40">
        <button
          className="text-gray-600 hover:text-primary"
          type="button"
          onClick={handleEdit}
        >
          수정
        </button>
        <button
          type="button"
          className="mx-3 text-gray-600 hover:text-primary"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
