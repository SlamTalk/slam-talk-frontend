'use client';

import { useParams, useRouter } from 'next/navigation';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useMutation, useQuery } from '@tanstack/react-query';
import { patchCommunityArticle } from '@/services/community/patchCommunityArticle';
import React, { useState, useCallback, useRef } from 'react';
import { getCommunityArticle } from '@/services/community/getCommunityArticle';
import Image from 'next/image';

const Page = () => {
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [postData, setPostData] = useState<FormData>(new FormData());
  const imageInput = useRef<HTMLInputElement>(document.createElement('input'));
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: articleData } = useQuery({
    queryKey: ['articleData'],
    queryFn: () => getCommunityArticle(params.id),
  });
  const patchArticle: any = useMutation({
    mutationKey: ['patchedArtcle'],
    mutationFn: () => patchCommunityArticle(+params.id, postData),
    onSuccess: () => {
      setEditedTitle('');
      setEditedContent('');
      router.push(`/community/article/${params.id}`);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onClickImageUpload = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, [imageInput]);

  const handleImageUpload = () => {
    if (imageInput.current && imageInput.current.files) {
      const selectedImages = Array.from(imageInput.current.files);

      setImages((prevImages) => [...prevImages, ...selectedImages]);
    }
  };

  const HandleEditor = async () => {
    const formData = new FormData();
    formData.append(
      'requestDTO',
      new Blob(
        [
          JSON.stringify({
            title: editedTitle,
            content: editedContent,
            category: articleData.category,
            imageUrl: articleData.imageUrl,
          }),
        ],
        { type: 'application/json' }
      )
    );
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i += 1) {
        formData.append('images', images[i]);
      }
    }
    setPostData(formData);
    patchArticle.mutate();
  };
  // const handelDelete = () => {};
  return (
    <div>
      {articleData ? (
        <div>
          <div className="flex h-[50px] items-center justify-center border-b-2">
            <IoChevronBackSharp
              cursor="pointer"
              size={24}
              onClick={() => {
                router.push(`/community/${params.id}`);
              }}
            />

            <input
              className="flex-grow text-center"
              placeholder={articleData.title}
              onChange={(e) => {
                setEditedTitle(e.target.value);
              }}
            />
          </div>

          <div className="flex h-40 flex-col justify-between border-b-2">
            <textarea
              placeholder={articleData.content}
              onChange={(e) => {
                setEditedContent(e.target.value);
              }}
            />
            <div className="flex justify-between">
              <div aria-label="수정 삭제 버튼 그룹">
                <button
                  type="button"
                  className="hover:text-primary"
                  onClick={() => {
                    HandleEditor();
                  }}
                >
                  수정
                </button>

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
            </div>
          </div>
        </div>
      ) : (
        <p>404 not found</p>
      )}
    </div>
  );
};

export default Page;
