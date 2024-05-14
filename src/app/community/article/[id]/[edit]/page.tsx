'use client';

import { useParams, useRouter } from 'next/navigation';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useMutation, useQuery } from '@tanstack/react-query';
import { patchCommunityArticle } from '@/services/community/patchCommunityArticle';
import React, { useState, useCallback, useRef } from 'react';
import { getCommunityArticle } from '@/services/community/getCommunityArticle';
import Image from 'next/image';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

const Page = () => {
  const [editedTitle, setEditedTitle] = useState('');
  const [imageErrorMsg, setImageErrorMsg] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  });

  const onClickImageUpload = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, [imageInput]);

  const handleImageUpload = () => {
    if (imageInput.current && imageInput.current.files) {
      const selectedImages = Array.from(imageInput.current.files);

      const fileSizeLimit = 1 * 1024 * 1024; // 1MB
      const oversizedFiles = selectedImages.filter(
        (file) => file.size > fileSizeLimit
      );
      if (oversizedFiles.length > 0) {
        setImageErrorMsg(`파일 크기는 ${1}MB를 초과할 수 없습니다.`);
        onOpen();
        return;
      }

      const invalidFiles = selectedImages.filter((file) => {
        const fileType = file.type.split('/')[1];
        return !['png', 'jpg', 'jpeg'].includes(fileType);
      });
      if (invalidFiles.length > 0) {
        setImageErrorMsg(
          '허용되지 않은 파일 형식입니다. PNG, JPG, JPEG 형식의 파일만 업로드 가능합니다.'
        );
        onOpen();
        return;
      }

      setImages(selectedImages);
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
      <title>슬램톡 | 커뮤니티 수정하기</title>
      {articleData ? (
        <div>
          <div className="flex h-[50px] items-center justify-center border-b-2">
            <IoChevronBackSharp
              cursor="pointer"
              size={24}
              onClick={() => {
                router.push(`/community/article/${params.id}`);
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
              className="h-48 border-b border-solid border-gray-200 text-xl"
              placeholder={articleData.content}
              onChange={(e) => {
                setEditedContent(e.target.value);
              }}
            />
            <div className="flex justify-between">
              <div aria-label="수정 삭제 버튼 그룹">
                <button
                  type="button"
                  className="me-4 hover:text-primary"
                  onClick={() => {
                    HandleEditor();
                  }}
                >
                  수정 완료
                </button>

                <input
                  type="file"
                  multiple
                  hidden
                  ref={imageInput}
                  onChange={handleImageUpload}
                  accept="image/png, image/jpg, image/jpeg"
                />
                <button
                  type="button"
                  className="hover:text-primary"
                  onClick={onClickImageUpload}
                >
                  이미지 업로드
                </button>
              </div>
            </div>
          </div>
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
      ) : (
        <p>404 not found</p>
      )}

      <Modal isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          <ModalHeader>이미지 참조 오류</ModalHeader>
          <ModalBody>{imageErrorMsg}</ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Page;
