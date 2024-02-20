import { Avatar } from '@nextui-org/react';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';
import IMessage from '@/types/chat/message';
import axiosInstance from '@/app/api/axiosInstance';
import { useRouter } from 'next/navigation';

const MessageList = ({ list }: { list: IMessage[] }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  const nickname = error ? null : user?.nickname;
  const router = useRouter();
  useEffect(() => {
    // messageListData();
    setMessages(list);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const postChatRoom = async (createData: any) => {
    const res = await axiosInstance.post(
      `/api/chat/create`,
      JSON.stringify(createData)
    );
    return res.data.results;
  };

  const handleCreateChatroom = (partnerId: any) => async () => {
    const createInfo = {
      creator_id: user?.id,
      participants: [partnerId],
      roomType: 'DM',
      basket_ball_id: '', // 시설채팅에만
      name: '', // 1:1은 필요없음,시설명,매칭&같이하기는 작성글 제목
    };
    const createRoom = await postChatRoom(createInfo);
    router.push(`/chatting/chatroom/${createRoom}`);
  };
  return (
    <div
      key={messages[0].roomId}
      className="min-w mt-16 h-[730px] w-full overflow-y-scroll	"
    >
      {messages.map((i: IMessage) =>
        i.senderNickname?.replace(/"/g, '') === nickname
          ? i.senderNickname?.replace(/"/g, '') && (
              <div
                key={i.messageId}
                className="mt-5 flex h-20 w-full justify-end"
              >
                <div aria-label="나의 닉네임과 채팅 메시지">
                  <p className="text-end">
                    {i.senderNickname?.replace(/"/g, '')}
                  </p>
                  <div className="my-3 max-w-sm rounded-lg bg-primary px-3 py-2 text-white">
                    {i.content.replace(/"/g, '')}
                  </div>
                </div>
                <div aria-label="userIcon">
                  <Avatar
                    className="z-10 mx-2"
                    alt="my-profile"
                    src={user?.imageUrl}
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
                  <Avatar
                    onClick={handleCreateChatroom(user?.id)}
                    className="mx-2"
                    alt="others-profile"
                    src={user?.imageUrl}
                  />
                </div>
                <div aria-label="상대방의 닉네임과 채팅 메시지">
                  <p className="text-start">
                    {i.senderNickname?.replace(/"/g, '')}
                  </p>

                  <div className="my-1 max-w-sm rounded-lg bg-gray-200 px-3 py-2 text-black">
                    {i.content?.replace(/"/g, '')}
                  </div>
                </div>
              </div>
            )
      )}
    </div>
  );
};

export default MessageList;
