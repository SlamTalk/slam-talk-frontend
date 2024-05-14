'use client';

import { Button } from '@nextui-org/button';
import { useParams, useRouter } from 'next/navigation';
import {
  Avatar,
  useDisclosure,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react';
import { IoChevronBackSharp } from 'react-icons/io5';
// import { FaHeart } from 'react-icons/fa';

import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCommunityArticle } from '@/services/community/getCommunityArticle';
import Image from 'next/image';
import { deleteCommunityArticle } from '@/services/community/deleteCommunityArticle';
import { postComment } from '@/services/community/comment/postComment';
import { getUserData } from '@/services/user/getUserData';
import UserProfile from '@/app/components/profile/UserProfile';
import { getOtherUserData } from '@/services/user/getOtherUserData';
import { OtherUserInfo } from '@/types/user/otherUserInfo';
import CommentList from '../../components/commentList';

// interface ICommunityItem {
//   id: number;
//   title: string;
//   content: string;
//   tag: string;
//   comment: [
//     {
//       id: number;
//       postId: string;
//       userId: string;
//       content: string;
//     },
//   ];
// }

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const params = useParams<{ id: string }>();
  const { data: articleData, isLoading } = useQuery({
    queryKey: ['articleData'],
    queryFn: () => getCommunityArticle(params.id),
  });
  const { data: loginData, isSuccess } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });
  const writeName = articleData?.userNickname;
  const writerId = articleData?.userId;
  const loginUserName = loginData?.nickname;
  const [commentData, setCommentData] = useState({
    communityId: 0,
    content: '',
  });
  const [isZoom, setIsZoom] = useState(false);
  const [writerInfo, setWriterInfo] = useState<OtherUserInfo | null>();
  useEffect(() => {
    if (isSuccess && writerId !== undefined) {
      getOtherUserData({ userId: writerId }).then((data) => {
        setWriterInfo(data);
      });
    }
  }, [isSuccess, writerId]);

  const [comment, setComment] = useState('');
  const postCommunityComment: any = useMutation({
    mutationKey: ['postComment'],
    mutationFn: () => postComment(commentData),
  });
  const handlePostComment = () => {
    if (comment !== '' || comment.length <= 50) {
      setCommentData({
        communityId: +params.id,
        content: comment,
      });
      postCommunityComment.mutate();
      const currentUrl = window.location.href;
      const domain = new URL(currentUrl).origin;
      if (domain === 'http://localhost:3000') {
        window.location.href = `http://localhost:3000/community/article/${params.id}`;
      } else {
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/community/article/${params.id}`;
      }
    }
  };
  const deleteArticle: any = useMutation({
    mutationKey: ['deleteArticle'],
    mutationFn: () => deleteCommunityArticle(params.id),
    onSuccess: () => {
      router.push('/community/all');
    },
  });

  const handelDelete = () => {
    deleteArticle.mutate();
  };
  if (isLoading) {
    return (
      <div className="align-center flex h-[calc(100vh-109px)] w-full justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    ); // 로딩 중일 때 로딩 화면을 표시합니다.
  }

  return (
    <div className="relative h-[calc(100vh-109px)] w-full overflow-hidden">
      <UserProfile isOpen={isOpen} userId={writerId} onClose={onClose} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>hi</ModalHeader>
        <ModalBody>eee</ModalBody>
      </Modal>
      {articleData ? (
        <div>
          <title>슬램톡 | 커뮤니티</title>

          <div className="flex h-[50px] items-center justify-center border-b-2">
            <IoChevronBackSharp
              cursor="pointer"
              size={24}
              onClick={() => {
                router.push('/community/all');
              }}
            />
            <h1 className="flex-grow text-center">{articleData.title}</h1>
          </div>
          <div className="flex flex-col">
            <div aria-label="contentsCard">
              <div
                aria-label="유저 아바타"
                className="mx-2 flex items-center border-b-1 sm:space-x-[30px] md:space-x-[260px]"
                style={{ cursor: 'pointer' }}
              >
                <div className="ml-1 flex items-center p-1">
                  <Avatar
                    onClick={() => {
                      onOpen();
                    }}
                    src={writerInfo?.imageUrl || ''}
                    className="me-2"
                  />
                  <p
                    aria-label="작성자 닉네임"
                    className="text-md w-[170px] font-bold"
                  >
                    {articleData.userNickname}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p
                    aria-label="작성일자"
                    className="w-[100px] text-sm text-gray-400"
                  >
                    {articleData.updatedAt.toString().split('T')[0]}
                  </p>
                  <p
                    aria-label="작성일자"
                    className="w-[60px] text-sm text-gray-400"
                  >
                    {
                      articleData.updatedAt
                        .toString()
                        .split('T')[1]
                        .split('.')[0]
                    }
                  </p>
                </div>
              </div>

              <div className="min-h-[200px] border-b-2">
                <p aria-label="게시글 컨텐츠" className="m-2">
                  {articleData.content}
                </p>
                {articleData.imageUrls
                  ? articleData.imageUrls.map((i: string) => (
                      <Image
                        className="cursor-pointer"
                        onClick={() => {
                          setIsZoom(true);
                        }}
                        key={i}
                        src={i}
                        alt="images"
                        width={100}
                        height={100}
                      />
                    ))
                  : null}
                {isZoom &&
                  (articleData.imageUrls
                    ? articleData.imageUrls.map((i: string) => (
                        // eslint-disable-next-line
                        <div
                          role="button"
                          onClick={() => setIsZoom(false)}
                          className="absolute top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-60"
                        >
                          <Image
                            aria-label="확대 이미지"
                            onClick={() => {
                              setIsZoom(false);
                            }}
                            key={i}
                            src={i}
                            width={300}
                            height={200}
                            alt="zoomImages"
                          />
                        </div>
                      ))
                    : null)}
              </div>

              <div className="flex justify-between">
                {/* <div className="m-1 text-lg text-danger">
                  <FaHeart aria-label="like button" />
                </div> */}
                {loginUserName === writeName ? (
                  <div aria-label="수정 삭제 버튼 그룹">
                    <button
                      type="button"
                      className="hover:text-primary"
                      onClick={() => {
                        router.push(`/community/article/${params.id}/edit`);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={handelDelete}
                      type="button"
                      className="ml-3 hover:text-primary"
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex" aria-label="댓글 입력">
            <input
              placeholder="댓글을 입력해주세요 (50자 이하)"
              className="w-11/12 rounded-md bg-background p-2 shadow-md focus:outline-none focus:ring-0"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            {loginData ? (
              <Button radius="sm" color="primary" onClick={handlePostComment}>
                입력
              </Button>
            ) : (
              <Button
                isDisabled
                radius="sm"
                color="primary"
                onClick={handlePostComment}
              >
                입력
              </Button>
            )}
          </div>
          <CommentList commentListData={articleData?.comments} />
        </div>
      ) : null}
    </div>
  );
};

export default Page;
