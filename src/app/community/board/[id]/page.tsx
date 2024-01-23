'use client';

import { Button } from '@nextui-org/button';
import { useParams, useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa';

import React, { useState } from 'react';
import CommentList from '../../components/commentList';

const Page = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const dummyData = localStorage.getItem('community');
  const communityData = dummyData ? JSON.parse(dummyData) : [];
  const matchedData = communityData.find(
    (item: ICommunityItem) => item.id === Number(params.id)
  );
  const [comment, setComment] = useState('');
  const CommentHandler = () => {
    if (comment !== '') {
      const newComment = {
        id: 2,
        postId: params.id,
        userId: 'user123',
        content: comment,
      };
      matchedData.comment.push(newComment);
      const updatedData = communityData.map((item: ICommunityItem) =>
        item.id === matchedData.id ? matchedData : item
      );
      localStorage.setItem('community', JSON.stringify(updatedData));
      setComment('');
    }
  };

  return (
    <div>
      {matchedData ? (
        <div>
          <div className="flex items-center justify-center border-b-2">
            <Button
              className="flex-none rounded-md focus:outline-none"
              isIconOnly
              color="default"
              variant="ghost"
              onClick={() => {
                router.push('/community/all');
              }}
            >
              <IoIosArrowBack className="text-gray-600 hover:text-black" />
            </Button>

            <h1 className="flex-grow text-center">{matchedData.title}</h1>
          </div>

          <div className="flex h-40 flex-col justify-between border-b-2">
            <p>{matchedData.content}</p>
            <div className="flex justify-between">
              <Button aria-label="like button" variant="ghost" isIconOnly>
                <FaHeart />
              </Button>
              <div>
                <Button
                  variant="ghost"
                  className=""
                  onClick={() => {
                    router.push(`/community/board/${params.id}/edit`);
                  }}
                >
                  수정
                </Button>
                <Button variant="ghost">삭제</Button>
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
              variant="ghost"
              className="w-[10px]"
              type="button"
              onClick={CommentHandler}
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

interface ICommunityItem {
  id: number;
  title: string;
  content: string;
  tag: string;
  comment: [
    {
      id: number;
      postId: string;
      userId: string;
      content: string;
    },
  ];
}
