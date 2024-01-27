'use client';

import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, useMemo } from 'react';
import { Key, Selection } from '@react-types/shared';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(['자유'])
  );

  const [testList, setTestList] = useState<
    { title: string; content: string; tag: string }[]
  >([]); // test code

  const router = useRouter();
  const handelTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const contentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleTag = (key: Key) => {
    if (key === '자유') {
      setTag('free');
    }
    if (key === '질문') {
      setTag('question');
    }
    if (key === '중고 거래') {
      setTag('usedtrade');
    }
    if (key === '대관 양도') {
      setTag('rentaltransfer');
    }
  };

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );
  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(new Set<string>(Array.from(keys).map(String)));
  };
  const handleSubmit = () => {
    setTitle('');
    setContent('');
    const storeData: { title: string; content: string; tag: string } = {
      title,
      content,
      tag,
    };

    setTestList((prev) => [...prev, storeData]);

    localStorage.setItem('community', JSON.stringify(testList)); // test code

    router.push('/community/all');
  };

  return (
    <div className="flex flex-col">
      <div className="flex space-x-96">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">{selectedValue}</Button>
          </DropdownTrigger>
          <DropdownMenu
            onAction={handleTag}
            aria-label="Static Actions"
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
          >
            <DropdownItem key="자유" value="free">
              자유
            </DropdownItem>
            <DropdownItem key="중고 거래" value="usedtrade">
              중고 거래
            </DropdownItem>
            <DropdownItem key="질문" value="question">
              질문
            </DropdownItem>
            <DropdownItem key="대관 양도" value="rentaltransfer">
              대관 양도
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="space-x-4">
          <button type="button">임시저장</button>
          <button
            className="font-bold text-orange-600"
            type="button"
            onClick={handleSubmit}
          >
            작성완료
          </button>
        </div>
      </div>

      <input
        className="border-b border-solid border-gray-200"
        placeholder="title"
        value={title}
        onChange={handelTitle}
      />
      <textarea
        className="h-48 border-b border-solid border-gray-200"
        placeholder="contents"
        value={content}
        onChange={contentHandler}
        style={{ resize: 'none' }}
      />
    </div>
  );
};
export default Page;
