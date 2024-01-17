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
  const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const contentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const tagHandler = (key: Key) => {
    console.log({ tag });
    setTag(key.toString());
  };
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );
  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(new Set<string>(Array.from(keys).map(String)));
  };
  const submitHandler = () => {
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
    <div>
      <input placeholder="title" value={title} onChange={titleHandler} />
      <textarea
        placeholder="contents"
        value={content}
        onChange={contentHandler}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">{selectedValue}</Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={tagHandler}
          aria-label="Static Actions"
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
        >
          <DropdownItem key="자유" value="free">
            자유
          </DropdownItem>
          <DropdownItem
            key="중고 거래
"
            value="usedtrade"
          >
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
      <button type="button" onClick={submitHandler}>
        작성완료
      </button>
    </div>
  );
};
export default Page;
