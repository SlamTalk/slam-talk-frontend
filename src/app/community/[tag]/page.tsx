'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';

import React, { useState, useEffect } from 'react';
// TODO: 게시글 페이지, 게시판, 작성 페이지 , 댓글

interface ICommunityItem {
  id: number;
  userId: string;
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

const Page = () => {
  const router = useRouter();
  const params = useParams<{ tag: string }>();
  const [data, setData] = useState<ICommunityItem[]>([
    {
      id: 1,
      title: '농구화 추천해주세요',
      userId: 'user-1',
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
      userId: 'user-2',
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
  const handleLink = (id: number) => {
    router.push(`/community/article/${id}`);
  };
  return (
    <Table color="primary">
      <TableHeader>
        <TableColumn>TITLE</TableColumn>
        <TableColumn>USER</TableColumn>
      </TableHeader>
      <TableBody>
        {params.tag === 'all'
          ? data.map((item) => (
              <TableRow
                className="cursor-pointer hover:bg-primary hover:text-white"
                onClick={() => handleLink(item.id)}
                key={item.id}
                aria-labelledby={`title-${item.id}`}
              >
                <TableCell className="flex-grow">{item.title}</TableCell>
                <TableCell>{item.userId}</TableCell>
              </TableRow>
            ))
          : data
              .filter((item) => item.tag === params.tag)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="flex-grow">{item.title}</TableCell>
                  <TableCell>{item.userId}</TableCell>
                </TableRow>
              ))}
      </TableBody>
    </Table>
  );
};

export default Page;
