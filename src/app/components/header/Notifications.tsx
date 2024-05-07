import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getNotifications from '@/services/notifications/getNotifications';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Badge,
} from '@nextui-org/react';
import { NotificationIcon } from './NotificationIcon';

const Notifications = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  console.log(data);

  const notificationsLength = data?.length;

  return (
    <>
      <Badge
        isInvisible={notificationsLength < 1 && true}
        content={notificationsLength}
        shape="circle"
        color="danger"
        size="md"
      >
        <Button
          radius="full"
          isIconOnly
          aria-label="알림"
          variant="light"
          size="sm"
          onPress={onOpen}
        >
          <NotificationIcon
            size={24}
            className="fill-gray-600 dark:fill-current"
          />
        </Button>
      </Badge>
      <Modal
        scrollBehavior="inside"
        backdrop="transparent"
        placement="top"
        className="ml-72 mt-[61px] h-80 w-80 sm:ml-0 sm:mr-0 sm:mt-[61px] sm:w-full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-0">
                알림
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    className="bg-transpranent max-w-xs text-gray-400"
                  >
                    <p>모두 읽음</p>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-transpranent max-w-xs text-gray-400"
                  >
                    모두 삭제
                  </Button>
                </div>
                <div>{/* <p>00님이 Lv 8이 되었습니다.</p> */}</div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Notifications;
