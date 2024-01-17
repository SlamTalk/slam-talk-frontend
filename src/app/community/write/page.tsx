'use client';

import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [testList, setTestList] = useState<
    { title: string; content: string }[]
  >([]); // test code

  const router = useRouter();
  const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const contentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const submitHandler = () => {
    setTitle('');
    setContent('');
    const storeData: { title: string; content: string } = { title, content };

    setTestList((prev) => [...prev, storeData]);
    console.log({ testList });
    localStorage.setItem('community', JSON.stringify(testList)); // test code

    router.push('/community/all');
  };

  return (
    <div>
      <input placeholder="title" value={title} onChange={titleHandler} />
      <textarea
        placeholder="contents"
        value={content}
        onChange={contentHandler}
      />
      <button type="button" onClick={submitHandler}>
        작성완료
      </button>
    </div>
  );
};
export default Page;
