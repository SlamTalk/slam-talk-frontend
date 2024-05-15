import React from 'react';
import { Spinner } from '@nextui-org/react';

const SmallLoading = () => (
  <div className="flex h-full w-full items-center justify-center">
    <Spinner size="sm" color="primary" />
  </div>
);

export default SmallLoading;
