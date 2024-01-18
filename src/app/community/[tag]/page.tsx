'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
// TODO: 게시글 페이지, 게시판, 작성 페이지 , 댓글

const Page = () => {
  const params = useParams<{ tag: string }>();
  const [data, setData] = useState<ICommunityItem[]>([]);
  const dummyData = localStorage.getItem('community');

  useEffect(() => {
    if (dummyData) {
      setData(JSON.parse(dummyData));
    }
  }, [dummyData]);
  return (
    <div>
      {params.tag === 'all'
        ? data.map((item) => (
            <div key={item.id}>
              <h1>{item.title}</h1>
            </div>
          ))
        : data
            .filter((item) => item.tag === params.tag)
            .map((item) => (
              <div key={item.id}>
                <h1>{item.title}</h1>
              </div>
            ))}
    </div>
  );
};

export default Page;
interface ICommunityItem {
  id: number;
  title: string;
  tag: string;
  // 추가 필요한 속성들을 정의해주세요.
}
