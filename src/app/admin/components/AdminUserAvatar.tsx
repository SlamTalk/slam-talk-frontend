'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar } from '@nextui-org/react';
import { getOtherUserData } from '@/services/user/getOtherUserData';
import UserProfile from '@/app/components/UserProfile';

interface AdminUserAvatarProps {
  userId: number;
}

const AdminUserAvatar: React.FC<AdminUserAvatarProps> = ({ userId }) => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ['getUserData', userId],
    queryFn: () => getOtherUserData({ userId }),
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsProfileOpen(true);
  };

  if (isLoading || !userData) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAvatarClick();
    }
  };

  return (
    <>
      <div
        role="button"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="cursor-pointer"
        onClick={handleAvatarClick}
      >
        <Avatar size="sm" src={userData.imageUrl} />
        <span>{userData.nickname}</span>
      </div>
      {isProfileOpen && (
        <UserProfile
          userId={userId}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </>
  );
};

export default AdminUserAvatar;
