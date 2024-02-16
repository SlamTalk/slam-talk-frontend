'use client';

import { Button } from '@nextui-org/button';
import { useParams, useRouter } from 'next/navigation';
import { Avatar } from '@nextui-org/react';
import { IoChevronBackSharp } from 'react-icons/io5';
// import { FaHeart } from 'react-icons/fa';

import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCommunityArticle } from '@/services/community/getCommunityArticle';
import Image from 'next/image';
import { deleteCommunityArticle } from '@/services/community/deleteCommunityArticle';
import { postComment } from '@/services/community/comment/postComment';
import { getUserData } from '@/services/user/getUserData';
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
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: articleData } = useQuery({
    queryKey: ['articleData'],
    queryFn: () => getCommunityArticle(params.id),
  });
  const { data: loginData } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });
  const writeName = articleData?.userNickname;
  const loginUserName = loginData?.nickname;
  const [commentData, setCommentData] = useState({
    communityId: 0,
    content: '',
  });
  const [comment, setComment] = useState('');
  const postCommunityComment: any = useMutation({
    mutationKey: ['postComment'],
    mutationFn: () => postComment(commentData),
  });
  const handlePostComment = () => {
    if (comment !== '') {
      setCommentData({
        communityId: +params.id,
        content: comment,
      });
      postCommunityComment.mutate();

      setComment('');

      window.location.reload();
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

  return (
    <div className="h-[90vh]">
      {articleData ? (
        <div>
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

          <div className="flex h-[295px] flex-col">
            <div aria-label="contentsCard">
              <div
                aria-label="유저 아바타"
                className="mt-1 flex items-center justify-start border-b-1"
              >
                <Avatar name={articleData.userNickname} className="me-2" />
                <p className="text-lg	">{articleData.userNickname}</p>
              </div>

              <div className="h-[200px] border-b-2">
                <p aria-label="게시글 컨텐츠" className="m-2">
                  {articleData.content}
                </p>
                {articleData.imageUrls
                  ? articleData.imageUrls.map((i: string) => (
                      <Image
                        key={i}
                        src={i}
                        alt="images"
                        width={100}
                        height={100}
                      />
                    ))
                  : null}
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
          <div className="flex">
            <input
              placeholder="댓글을 입력해주세요"
              className="w-11/12 rounded-md bg-background p-1 p-2 shadow-md focus:outline-none focus:ring-0"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button
              className="w-[10px] hover:bg-primary hover:text-white"
              onClick={handlePostComment}
            >
              입력
            </Button>
          </div>
          <CommentList />
        </div>
      ) : (
        <p>404 not found</p>
      )}
    </div>
  );
};

export default Page;
