'use client';

import React from 'react';
import { Spinner } from '@nextui-org/react';

const Loading = () => (
  <div className="align-center flex h-screen justify-center">
    <Spinner size="lg" color="primary" />
  </div>
);

export default Loading;
