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
import { useMutation } from '@tanstack/react-query';
import { postCommunity } from '@/services/community/postCommunityArticle';
// import { getUserData } from '@/services/user/getUserData';
// import { IArticle } from '@/types/community/article';
// import { postTokenRefresh } from '@/services/token/postTokenRefresh';
import Image from 'next/image';

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('FREE');
  const [images, setImages] = useState<File[]>([]);
  const imageInput = useRef<HTMLInputElement>(null);
  const [postData, setPostData] = useState<FormData>(new FormData());

  const onClickImageUpload = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, [imageInput]);

  const handleImageUpload = () => {
    if (imageInput.current && imageInput.current.files) {
      const selectedImages = Array.from(imageInput.current.files);

      setImages(selectedImages);
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
      setTag('FREE');
    }
    if (key === '질문') {
      setTag('QUESTION');
    }
    if (key === '중고 거래') {
      setTag('USED');
    }
    if (key === '대관 양도') {
      setTag('TRANSFER');
    }
  };

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );
  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(new Set<string>(Array.from(keys).map(String)));
  };

  // const { data } = useQuery({
  //   queryKey: ['tokenData'],
  //   queryFn: postTokenRefresh,
  // });
  const postArticle = useMutation({
    mutationKey: ['postArticleData'],
    mutationFn: () => postCommunity(postData),

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
      new Blob([JSON.stringify({ title, content, category: tag })], {
        type: 'application/json',
      })
    );
    // 이미지가 있는 경우에만 이미지 추가
    if (images && images.length > 0) {
      formData.append('images', images[0]);
    }

    setPostData(formData);

    postArticle.mutate();
  };

  return (
    <form method="post" encType="multipart/form-data">
      <title>슬램톡 | 커뮤니티 작성하기</title>
      <div className="flex flex-col">
        <div className="flex space-x-[460px] sm:space-x-60">
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
          <div className="space-x-1">
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
          className="my-3 border-b border-solid border-gray-200 text-3xl font-bold"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={handleTitle}
        />
        <textarea
          className="h-48 border-b border-solid border-gray-200 text-xl font-medium"
          placeholder="
          커뮤니티에서는 상대를 존중하고 비방이나 욕설을 피하며, 허위 정보와 스팸을 제한하며, 책임감 있는 토론을 지향해야 합니다."
          value={content}
          onChange={handleContent}
          style={{ resize: 'none' }}
        />
        <input
          type="file"
          hidden
          ref={imageInput}
          onChange={handleImageUpload}
          accept="image/png, image/jpg, image/jpeg"
        />
        <button type="button" onClick={onClickImageUpload}>
          이미지 업로드
        </button>
        {images.map((file, index) => (
          <Image
            key={URL.createObjectURL(file)}
            src={URL.createObjectURL(file)}
            alt={`Preview ${index}`}
            width={200}
            height={200}
          />
        ))}
      </div>
    </form>
  );
};
export default Page;
