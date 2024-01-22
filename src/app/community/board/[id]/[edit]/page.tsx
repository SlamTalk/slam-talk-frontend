'use client';

import { Button } from '@nextui-org/button';
import { useParams, useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa';

import React, { useState } from 'react';

const Page = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const dummyData = localStorage.getItem('community');
  const communityData = dummyData ? JSON.parse(dummyData) : [];
  const matchedData = communityData.find(
    (item: ICommunityItem) => item.id === Number(params.id)
  );
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const editorHandler = () => {
    matchedData.title = editedTitle;
    matchedData.content = editedContent;
    communityData.splice(matchedData.id - 1, 1, {
      id: matchedData.id,
      title: editedTitle,
      tag: matchedData.tag,
      content: editedContent,
    });
    localStorage.setItem('community', JSON.stringify(communityData));
  };
  const deleteHandler = () => {
    communityData.splice(matchedData.id - 1, 1);
    localStorage.setItem('community', JSON.stringify(communityData));
  };
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

            <input
              className="flex-grow text-center"
              placeholder={matchedData.title}
              onChange={(e) => {
                setEditedTitle(e.target.value);
              }}
            />
          </div>

          <div className="flex h-40 flex-col justify-between border-b-2">
            <textarea
              placeholder={matchedData.content}
              onChange={(e) => {
                setEditedContent(e.target.value);
              }}
            />
            <div className="flex justify-between">
              <Button isIconOnly>
                <FaHeart />
              </Button>
              <div>
                <Button
                  onClick={() => {
                    editorHandler();
                    router.push(`/community/board/${params.id}`);
                  }}
                >
                  수정 완료
                </Button>
                <Button onClick={deleteHandler}>삭제</Button>
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
