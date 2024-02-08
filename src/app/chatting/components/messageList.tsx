import { Avatar } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';
import axiosInstance from '../../api/axiosInstance';

interface IMessage {
  messageId: string;
  roomId: string;
  senderId: string;
  senderNickname: string;
  content: string;
  timestamp: string;
}

const MessageList = () => {
  const params = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  const nickname = error ? null : user?.nickname;

  // const id = '';
  const messageListData = async () => {
    try {
      const res = await axiosInstance.post(
        `/api/chat/participation?roomId=${params.roomId}`
      );
      setMessages(res.data?.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    messageListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  return (
    <div className="min-w mt-5 h-[600px] w-full">
      {messages.map((i) =>
        JSON.parse(i.senderNickname) === nickname ? (
          <div key={i.messageId} className="mt-5 flex h-20 w-full justify-end">
            <div aria-label="나의 닉네임과 채팅 메시지">
              <p className="text-end">{JSON.parse(i.senderNickname)}</p>
              <div className="my-3 max-w-sm rounded-lg bg-primary p-4 text-white">
                {JSON.parse(i.content)}
              </div>
            </div>
            <div aria-label="userIcon">
              <Avatar className="mx-2" />
            </div>
          </div>
        ) : (
          <div
            key={i.messageId}
            className="mt-5 flex h-20 w-full justify-start"
          >
            <div aria-label="userIcon">
              <Avatar className="mx-2" />
            </div>
            <div aria-label="상대방의 닉네임과 채팅 메시지">
              <p className="text-start">{JSON.parse(i.senderNickname)}</p>
              <div className="my-1 max-w-sm rounded-lg bg-gray-200 p-4 text-black">
                {JSON.parse(i.content)}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MessageList;
