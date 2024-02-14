'use client';

import { useRouter } from 'next/navigation';
import React, {
  useState,
  ChangeEvent,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { Key, Selection } from '@react-types/shared';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postCommunity } from '@/services/community/postCommunityArticle';
// import { getUserData } from '@/services/user/getUserData';
// import { IArticle } from '@/types/community/article';
import { postTokenRefresh } from '@/services/token/postTokenRefresh';

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('free');
  const [images, setImages] = useState<File[]>([]);
  const imageInput = useRef<HTMLInputElement>(document.createElement('input'));
  const [postData, setPostData] = useState<FormData>(new FormData());

  const onClickImageUpload = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, [imageInput]);

  const handleImageUpload = () => {
    if (imageInput.current && imageInput.current.files) {
      const selectedImages = Array.from(imageInput.current.files);
      // const formDataCopy = new FormData();
      // selectedImages.forEach((file) => {
      //   formDataCopy.append('images', file);
      // });
      // setPostData(formDataCopy);
      console.log({ images });
      setImages((prevImages) => [...prevImages, ...selectedImages]);
    }
  };

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(['자유'])
  );

  const router = useRouter();
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

  const { data } = useQuery({
    queryKey: ['tokenData'],
    queryFn: postTokenRefresh,
  });
  const postArticle = useMutation({
    mutationKey: ['postArticleData'],
    mutationFn: () => postCommunity(postData, data),

    onSuccess: () => {
      setTitle('');
      setContent('');
      router.push('/community/all');
    },
  });
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(
      'requestDTO',
      JSON.stringify({
        title,
        content,
        category: tag,
      })
    );
    // 이미지가 있는 경우에만 이미지 추가
    if (images && images.length > 0) {
      formData.append('images', JSON.stringify(images));
    }
    console.log({ formData });

    setPostData(formData);
    console.log(postData);
    postArticle.mutate();
  };

  return (
    <form method="post" encType="multipart/form-data">
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
          onChange={handleTitle}
        />
        <textarea
          className="h-48 border-b border-solid border-gray-200"
          placeholder="contents"
          value={content}
          onChange={handleContent}
          style={{ resize: 'none' }}
        />
        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={handleImageUpload}
          accept="image/*"
        />
        <button type="button" onClick={onClickImageUpload}>
          이미지 업로드
        </button>
        {/* {images.map((file, index) => (
          <Image
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Preview ${index}`}
            width={200}
            height={200}
          />
        ))} */}
      </div>
    </form>
  );
};
export default Page;
