import React, { useState } from 'react';

const CommentItem: React.FC<ICommentItemProps> = ({
  comment,
  onEdit,
  onDelete,
}) => {
  const [editToggle, setEditToggle] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const editHandler = () => {
    setEditToggle(!editToggle);
    if (editToggle) {
      onEdit(comment.id, editedComment);
      setEditedComment('');
      setEditToggle(false);
    }
  };
  const deleteHandler = () => {
    onDelete(comment.id);
  };
  return (
    <div key={comment.id} className="border-gray flex border-b-2">
      {editToggle ? (
        <input
          placeholder={comment.content}
          value={editedComment}
          onChange={(e) => {
            setEditedComment(e.target.value);
          }}
        />
      ) : (
        <h2 className="w-[500px]">{comment.content}</h2>
      )}
      <div>
        <button
          className="text-gray-600 hover:text-danger"
          type="button"
          onClick={editHandler}
        >
          수정
        </button>
        <button
          type="button"
          className="mx-3 text-gray-600 hover:text-danger"
          onClick={deleteHandler}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CommentItem;

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
