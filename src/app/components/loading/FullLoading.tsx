import React from 'react';
import { Spinner } from '@nextui-org/react';

const FullLoading = () => (
  <div className="flex h-[calc(100vh-109px)]  w-full items-center justify-center">
    <Spinner size="lg" color="primary" />
  </div>
);

export default FullLoading;
