import { Avatar } from '@nextui-org/react';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/services/user/getUserData';
import IMessage from '@/types/chat/message';

const MessageList = ({ list }: { list: IMessage[] }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { error, data: user } = useQuery({
    queryKey: ['loginData'],
    queryFn: getUserData,
  });

  const nickname = error ? null : user?.nickname;

  useEffect(() => {
    // messageListData();
    setMessages(list);
    console.log({ list });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <div className="min-w mt-5 h-[730px] w-full overflow-y-scroll	">
      {messages.map((i) =>
        i.senderNickname.replace(/"/g, '') === nickname ? (
          <div key={i.messageId} className="mt-14 flex h-20 w-full justify-end">
            <div aria-label="나의 닉네임과 채팅 메시지">
              <p className="text-end">{i.senderNickname.replace(/"/g, '')}</p>
              <div className="my-3 max-w-sm rounded-lg bg-primary px-3 py-2 text-white">
                {i.content.replace(/"/g, '')}
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
              <p className="text-start">{i.senderNickname.replace(/"/g, '')}</p>

              <div className="my-1 max-w-sm rounded-lg bg-gray-200 px-3 py-2 text-black">
                {i.content.replace(/"/g, '')}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MessageList;
