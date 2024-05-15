'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar } from '@nextui-org/react';
import { getOtherUserData } from '@/services/user/getOtherUserData';
import UserProfile from '@/app/components/profile/UserProfile';
import SmallLoading from '@/app/components/loading/SmallLoading';

interface UserAvatarProps {
  userId: number;
}

const AdminUserAvatar: React.FC<UserAvatarProps> = ({ userId }) => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ['getUserData', userId],
    queryFn: () => getOtherUserData({ userId }),
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsProfileOpen(true);
  };

  if (isLoading) {
    return <SmallLoading />;
  }

  if (!userData) {
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleAvatarClick();
    }
  };

  return (
    <>
      <div
        aria-label="Avatar"
        role="button"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="flex cursor-pointer flex-col items-center text-center"
        onClick={handleAvatarClick}
      >
        <Avatar showFallback size="sm" src={userData.imageUrl || ''} />
        <span className="mt-1 text-ellipsis text-xs">{userData.nickname}</span>
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
