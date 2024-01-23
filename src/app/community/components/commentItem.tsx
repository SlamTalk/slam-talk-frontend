import React, { useState } from 'react';

const CommentItem: React.FC<ICommentItemProps> = ({ comment, onEdit }) => {
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
  return (
    <div key={comment.id}>
      {editToggle ? (
        <input
          placeholder={comment.content}
          value={editedComment}
          onChange={(e) => {
            setEditedComment(e.target.value);
          }}
        />
      ) : (
        <h2>{comment.content}</h2>
      )}
      <button type="button" onClick={editHandler}>
        수정
      </button>
      <button type="button">삭제</button>
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
}
