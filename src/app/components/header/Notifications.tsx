import React from 'react';
import { Badge, Button } from '@nextui-org/react';
import { NotificationIcon } from './NotificationIcon';

const Notifications = () => (
  <Badge content="10" shape="circle" color="danger" size="sm">
    <Button
      radius="full"
      isIconOnly
      aria-label="알림"
      variant="light"
      size="sm"
    >
      <NotificationIcon size={24} className="fill-gray-500 dark:fill-current" />
    </Button>
  </Badge>
);

export default Notifications;
