'use client';

import { useRouter } from 'next/navigation';
import React, {
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
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
import { useMutation } from '@tanstack/react-query';
import { postCommunity } from '@/services/community/postCommunityArticle';
// import { getUserData } from '@/services/user/getUserData';
import { IArticle } from '@/types/community/article';

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('free');
  const [images, setImages] = useState<string[]>([]);
  const imageInput = useRef<HTMLInputElement>(document.createElement('input'));

  const onClickImageUpload = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, [imageInput]);
  const handleImageUpload = () => {
    if (imageInput.current.files) {
      const selectedImage = imageInput.current.files[0];
      if (!selectedImage) return;
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result as string;
        setImages((prevUploadImage) => [...prevUploadImage, imageUrl]);
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(['자유'])
  );
  const [postData, setPostData] = useState<IArticle | FormData>({
    title: '',
    // writerId: 0,
    // writerNickname: '',
    // writerImageUrl: '',
    content: '',
    tag: '',
    images: [],
    // comments: [{ id: 0, writerId: 0, writerNickaname: '', content: '' }],
  });

  // const { data: user } = useQuery({
  //   queryKey: ['loginData'],
  //   queryFn: getUserData,
  // });

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
  const postArticle = useMutation({
    mutationKey: ['postArticleData'],
    mutationFn: () => postCommunity(postData),
  });
  const handleSubmit = () => {
    if (images) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('tag', tag);
      for (let i = 0; i < images.length; i += 1) {
        formData.append('images', images[i]);
      }
      setPostData(formData);
      postArticle.mutate();
      setTitle('');
      setContent('');
      router.push('/community/all');
    }
    postArticle.mutate();
    setTitle('');
    setContent('');
    router.push('/community/all');
    console.log(postData);
  };
  useEffect(() => {
    setPostData({
      title,
      // writerId: user?.id,
      // writerNickname: user?.nickname,
      // writerImageUrl: user?.imageUrl,
      images,
      content,
      tag,
      // comments: [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content, tag, images]);
  return (
    <form>
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
        {images.map((url, index) => (
          <img
            src={url}
            alt={`Preview ${index}`}
            style={{ width: '200px', height: '200px' }}
          />
        ))}
      </div>
    </form>
  );
};
export default Page;
