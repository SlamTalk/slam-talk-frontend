import { deleteComment } from '@/services/community/comment/deleteComment';
import { patchComment } from '@/services/community/comment/patchComment';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getOtherUserData } from '@/services/user/getOtherUserData';
import { OtherUserInfo } from '@/types/user/otherUserInfo';
import { Avatar, useDisclosure } from '@nextui-org/react';
import { getUserData } from '@/services/user/getUserData';
import UserProfile from '@/app/components/UserProfile';

export interface ICommentItemProps {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: writerUserInfo } = useQuery<OtherUserInfo | null>({
    queryKey: [`getWriterInfo${userId}`],
    queryFn: () => getOtherUserData({ userId }),
  });
  const { data: loginUserData } = useQuery({
    queryKey: ['getLoginData'],
    queryFn: getUserData,
  });
  const handleEdit = () => {
    setEditToggle(!editToggle);
    if (editToggle && editedComment !== '') {
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
      className="border-gray mt-2 flex items-center border-b-1"
    >
      <UserProfile isOpen={isOpen} userId={userId} onClose={onClose} />

      <div aria-label="작성자 정보" className="cursor-pointer p-2">
        <Avatar
          size="md"
          src={writerUserInfo?.imageUrl}
          onClick={() => {
            onOpen();
          }}
        />
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
        <div className="flex w-full justify-between">
          <div className="my-2 ml-1 flex flex-col">
            <p className="font-bold">{writerUserInfo?.nickname}</p>
            <p className="">{content}</p>
          </div>
          {loginUserData?.id === userId && (
            <div
              aria-label="comment button group"
              className="my-2 mr-4 flex flex-col break-keep text-sm"
            >
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
                className="text-gray-600 hover:text-primary"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
