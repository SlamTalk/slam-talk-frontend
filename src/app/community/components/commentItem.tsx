import { deleteComment } from '@/services/community/comment/deleteComment';
import { patchComment } from '@/services/community/comment/patchComment';

import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getOtherUserData } from '@/services/user/getOtherUserData';
import { OtherUserInfo } from '@/types/user/otherUserInfo';
import { Avatar } from '@nextui-org/react';
import { getUserData } from '@/services/user/getUserData';

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
    onSuccess: () => {
      window.location.reload();
    },
  });
  const { data: writerUserInfo } = useQuery<OtherUserInfo | null>({
    queryKey: ['getWriterInfo'],
    queryFn: () => getOtherUserData({ userId }),
  });
  const { data: loginUserData } = useQuery({
    queryKey: ['getLoginData'],
    queryFn: getUserData,
  });
  const handleEdit = () => {
    setEditToggle(!editToggle);
    if (editToggle && editedComment !== '') {
      console.log(editedComment);
      patchArticleComment.mutate();
      setEditToggle(false);
    }
  };
  const deleteArticleComment = useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: () => deleteComment(communityId, commentId),
    onSuccess: () => {
      window.location.reload();
    },
  });
  const handleDelete = () => {
    deleteArticleComment.mutate();
  };
  return (
    <div
      key={commentId}
      className="border-gray mt-2 flex items-center border-b-2"
    >
      <div aria-label="작성자 정보">
        <Avatar src={writerUserInfo?.imageUrl} />
        <p className="text-center">{writerUserInfo?.nickname}</p>
      </div>

      {editToggle ? (
        <input
          className="ml-2 mt-2 h-10 w-[750px]"
          placeholder={content}
          onChange={(e) => {
            setEditedComment(e.target.value);
          }}
        />
      ) : (
        <h2 className="ml-2 ms-5 mt-2 h-10 w-[750px]">{content}</h2>
      )}
      {loginUserData?.id === writerUserInfo?.id ? (
        <div aria-label="comment button group" className="w-40">
          <button
            onClick={handleEdit}
            className="text-gray-600 hover:text-primary"
            type="button"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="mx-3 text-gray-600 hover:text-primary"
          >
            삭제
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CommentItem;
