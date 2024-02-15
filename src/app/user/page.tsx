'use client';

import React, { useState } from 'react';
import { Avatar } from '@nextui-org/react';
import UserProfile from '../components/UserProfile';

const User = () => {
  const [isUserProfileShow, setIsUserProfileShow] = useState(false);
  return (
    <>
      <Avatar onClick={() => setIsUserProfileShow(true)} />
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <div>컨텐츠</div>
      <UserProfile
        userId={2}
        isVisible={isUserProfileShow}
        onClose={() => setIsUserProfileShow(false)}
      />
    </>
  );
};

export default User;
