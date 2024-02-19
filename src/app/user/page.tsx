'use client';

import React, { useState } from 'react';
import { Avatar, useDisclosure } from '@nextui-org/react';
import UserProfile from '../components/UserProfile';

const User = () => {
  const [selectedUserId, SetSelectedUserId] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleShowUserProfile = () => {
    SetSelectedUserId(2);
    onOpen();
  };

  return (
    <>
      <Avatar onClick={handleShowUserProfile} />
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      {selectedUserId && (
        <UserProfile
          isOpen={isOpen}
          userId={selectedUserId}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default User;
