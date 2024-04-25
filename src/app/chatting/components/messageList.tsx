import { Avatar, useDisclosure } from '@nextui-org/react';

import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';
import IMessage from '@/types/chat/message';
import { useInView } from 'react-intersection-observer';

import UserProfile from '@/app/components/profile/UserProfile';
import { useParams } from 'next/navigation';
import axiosInstance from '@/app/api/axiosInstance';

const MessageList = ({ list }: { list: IMessage[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastMessageId, setLastMessageId] = useState('');
  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });
  const params = useParams();

  const nickname = error ? null : user?.nickname;

  useEffect(() => {
    // messageListData();
    setMessages(list);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
    initialInView: true,
  });
  useEffect(() => {
    const postMore = async () => {
      try {
        const res = await axiosInstance.post(
          `/api/chat/history?roomId=${params.roomId}&lastMessageId=${lastMessageId}`
        );
        res.data.results as IMessage[];
        const duplicatedMessage = [
          ...messages,
          ...res.data.results,
        ] as IMessage[];
        const unique = Array.from(
          new Map(
            duplicatedMessage.map((messageItem: IMessage) => [
              messageItem.messageId,
              messageItem,
            ])
          ).values()
        );

        setMessages(() => [...unique]);
      } catch (err) {
        console.error(err);
      }
    };
    if (inView) {
      postMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  // const postChatRoom = async (createData: any) => {
  //   const res = await axiosInstance.post(
  //     `/api/chat/create`,
  //     JSON.stringify(createData)
  //   );
  //   return res.data.results;
  // };

  // const handleCreateChatroom = (partnerId: any) => async () => {
  //   const createInfo = {
  //     creator_id: user?.id,
  //     participants: [partnerId],
  //     roomType: 'DM',
  //     basket_ball_id: '', // 시설채팅에만
  //     name: '', // 1:1은 필요없음,시설명,매칭&같이하기는 작성글 제목
  //   };
  //   const createRoom = await postChatRoom(createInfo);
  //   router.push(`/chatting/chatroom/${createRoom}`);
  // };
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
    if (messages.length > 0) {
      setLastMessageId(messages[0].messageId);
    }
  }, [messages]);

  return (
    <div className="h-[calc(100vh-109px)] min-h-[50px]	w-full overflow-y-scroll">
      <div ref={ref} />
      {messages.map((i: IMessage, index) => (
        <div>
          {new Date(i.timestamp).toLocaleDateString() !==
          new Date(messages[index - 1]?.timestamp).toLocaleDateString() ? (
            <div
              aria-label="채팅 날짜"
              className="m-6 flex h-6 items-center justify-center rounded bg-gray-300"
            >
              <p className="text-center text-white">
                {i.timestamp
                  ? new Date(i.timestamp).toLocaleDateString().split('.')[0]
                  : new Date().toLocaleDateString().split('.')[0]}
                년{' '}
                {i.timestamp
                  ? new Date(i.timestamp).toLocaleDateString().split('.')[1]
                  : new Date().toLocaleDateString().split('.')[1]}
                월
                {i.timestamp
                  ? new Date(i.timestamp).toLocaleDateString().split('.')[2]
                  : new Date().toLocaleDateString().split('.')[2]}
                일
              </p>
            </div>
          ) : null}
          {i.senderNickname?.replace(/"/g, '') === nickname
            ? i.senderNickname?.replace(/"/g, '') && (
                <div
                  key={i.messageId}
                  className="mt-5 flex h-20 w-full justify-end"
                >
                  <div aria-label="나의 닉네임과 채팅 메시지">
                    <p className="text-end">
                      {i.senderNickname?.replace(/"/g, '')}
                    </p>
                    <div className="flex items-center">
                      <p aria-label="나의 채팅 시간">
                        {i.timestamp
                          ? new Date(i.timestamp).toLocaleTimeString('ko-KR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : new Date().toLocaleTimeString('ko-KR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                      </p>
                      <div className="my-3 ms-3 w-fit max-w-sm rounded-lg bg-primary px-3 py-2 text-white">
                        {i.content.replace(/"/g, '')}
                      </div>
                    </div>
                  </div>
                  <div aria-label="userIcon">
                    <Avatar
                      className="z-10 mx-2"
                      alt="my-profile"
                      src={i?.imgUrl}
                    />
                  </div>
                </div>
              )
            : i.senderNickname?.replace(/"/g, '') !== nickname && (
                <div
                  key={i.messageId}
                  className="mt-5 flex h-20 w-full justify-start"
                >
                  <div aria-label="userIcon">
                    <UserProfile
                      isOpen={isOpen}
                      userId={+i.senderId}
                      onClose={onClose}
                    />
                    <Avatar
                      onClick={onOpen}
                      className="mx-2 cursor-pointer"
                      alt="others-profile"
                      src={i?.imgUrl}
                    />
                  </div>

                  <div className="item-center flex">
                    <div aria-label="상대방의 닉네임과 채팅 메시지">
                      <p className="text-start">
                        {i.senderNickname?.replace(/"/g, '')}
                      </p>

                      <div className="flex items-center">
                        <div className="my-1 me-3 w-fit max-w-sm rounded-lg bg-gray-200 px-3 py-2 text-black">
                          {i.content?.replace(/"/g, '')}
                        </div>
                        <p aria-label="나의 채팅 시간">
                          {i.timestamp
                            ? new Date(i.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : new Date().toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </div>
      ))}

      <div ref={messageEndRef}> </div>
    </div>
  );
};

export default MessageList;
