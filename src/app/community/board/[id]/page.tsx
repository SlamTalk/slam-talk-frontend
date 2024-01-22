'use client';

import { Button } from '@nextui-org/button';
import { useParams, useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa';

import React from 'react';

const Page = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const dummyData = localStorage.getItem('community');
  const communityData = dummyData ? JSON.parse(dummyData) : [];
  const matchedData = communityData.find(
    (item: ICommunityItem) => item.id === Number(params.id)
  );

  return (
    <div>
      {matchedData ? (
        <div>
          <div className="flex items-center justify-center border-b-2">
            <Button
              className="flex-none border-2"
              isIconOnly
              color="default"
              onClick={() => {
                router.push('/community/all');
              }}
            >
              <IoIosArrowBack />
            </Button>

            <h1 className="flex-grow text-center">{matchedData.title}</h1>
          </div>

          <div className="flex h-40 flex-col justify-between border-b-2">
            <p>{matchedData.content}</p>
            <div className="flex justify-between">
              <Button isIconOnly>
                <FaHeart />
              </Button>
              <div>
                <Button>수정</Button>
                <Button>삭제</Button>
              </div>
            </div>
          </div>
          <input placeholder="댓글을 입력해주세요" />
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
}
