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
  Avatar,
} from '@nextui-org/react';
import { InAppNotification } from '@/types/notifications/InAppNotification';
import axiosInstance from '@/app/api/axiosInstance';
import { IoIosChatbubbles, IoIosClose } from 'react-icons/io';
import NotificationsUserAvatar from './NotificationsUserAvatar';

import NotificationIcon from './NotificationIcon';

const Notifications = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: notifications, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  const notificationsLength =
    notifications?.filter((notification) => !notification.read).length || 0;

  const handleReadAll = async () => {
    const response = await axiosInstance.patch('/api/notifications');
    if (response.status === 200) {
      refetch();
    }
  };

  const handleDeleteAll = async () => {
    const response = await axiosInstance.delete('/api/notifications');
    if (response.status === 200) {
      refetch();
    }
  };

  const handleDeleteNotification = async (notificationsId: number) => {
    const response = await axiosInstance.delete(
      `/api/notifications/${notificationsId}`
    );
    if (response.status === 200) {
      refetch();
    }
  };

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const handleGoToURIAndRead = async (uri: string, notificationId: number) => {
    try {
      const response = await axiosInstance.patch(
        `/api/notifications/${notificationId}`
      );
      if (response.status === 200) {
        window.location.href = uri;
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        className="ml-[210px] mt-[61px] h-3/4 w-[400px] sm:ml-0 sm:mr-0 sm:mt-[61px] sm:w-full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-0">
                알림
              </ModalHeader>
              <ModalBody className="overflow-x-hidden">
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    className="bg-transpranent max-w-xs text-gray-400"
                    onClick={handleReadAll}
                  >
                    <p>모두 읽음</p>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-transpranent max-w-xs text-gray-400"
                    onClick={handleDeleteAll}
                  >
                    모두 삭제
                  </Button>
                </div>
                {notifications &&
                  notifications.map((notification: InAppNotification) => (
                    <div className="mt-2 flex cursor-pointer justify-between">
                      <div className="flex">
                        <div
                          className={`mt-4 h-[5px] w-[5px] rounded-full ${!notification.read ? 'bg-danger' : ''}`}
                        />
                        <div className="ml-2 mr-4">
                          {notification.notificationType === 'CHAT' && (
                            <Avatar
                              showFallback
                              fallback={<IoIosChatbubbles size={26} />}
                            />
                          )}
                          {notification.userId !== null && (
                            <NotificationsUserAvatar
                              userId={notification.userId}
                            />
                          )}
                        </div>
                        <div
                          className="flex"
                          key={notification.notificationId}
                          role="link"
                          tabIndex={0}
                          onKeyDown={() =>
                            handleGoToURIAndRead(
                              notification.uri,
                              notification.notificationId
                            )
                          }
                          onClick={() =>
                            handleGoToURIAndRead(
                              notification.uri,
                              notification.notificationId
                            )
                          }
                        >
                          <div className="truncate">
                            <div className="text-ellipsis text-wrap break-all">
                              <p>{notification.message}</p>
                            </div>
                            <p className="mt-2 text-xs text-gray-400">
                              {formatCreatedAt(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          radius="full"
                          isIconOnly
                          size="sm"
                          variant="light"
                          aria-label="삭제"
                          onClick={() =>
                            handleDeleteNotification(
                              notification.notificationId
                            )
                          }
                        >
                          <IoIosClose size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Notifications;
