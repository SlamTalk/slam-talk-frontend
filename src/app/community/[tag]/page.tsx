'use client';

import { Listbox, ListboxItem } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';

import React, { useState, useEffect } from 'react';
// TODO: 게시글 페이지, 게시판, 작성 페이지 , 댓글

const Page = () => {
  const router = useRouter();
  const params = useParams<{ tag: string }>();
  const [data, setData] = useState<ICommunityItem[]>([
    {
      id: 1,
      title: '농구화 추천해주세요',
      content: '농구화 추천 좀 해주세요~~',
      tag: 'question',
      comment: [
        {
          id: 'c1',
          userId: 'user-1',
          postId: '1',
          content: '농구화 추천해드렸습니다~',
        },
      ],
    },
    {
      id: 2,
      title: '헤어밴드 팝니다',
      content: '나이키 헤어밴드입니다. 착감 거의 없습니다~~',
      tag: 'usedtrade',
      comment: [],
    },
  ]);

  useEffect(() => {
    const dummyData = localStorage.getItem('community');
    localStorage.setItem('community', JSON.stringify(data));
    if (!dummyData && dummyData !== null) {
      setData(JSON.parse(dummyData));
    }
  }, [data]);
  const LinkHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    router.push(`/community/board/${e.currentTarget.value}`);
  };
  return (
    <Listbox color="warning">
      {params.tag === 'all'
        ? data.map((item) => (
            <ListboxItem
              onClick={LinkHandler}
              className="h-4/5"
              key={item.id}
              value={item.id}
              aria-labelledby={`title-${item.id}`}
            >
              {item.title}
            </ListboxItem>
          ))
        : data
            .filter((item) => item.tag === params.tag)
            .map((item) => (
              <ListboxItem key={item.id}>{item.title}</ListboxItem>
            ))}
    </Listbox>
  );
};

export default Page;
interface ICommunityItem {
  id: number;
  title: string;
  content: string;
  tag: string;
  comment?: {
    id: string;
    postId: string;
    userId: string;
    content: string;
  }[];
}
