'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import CourtDetailsFull from '../components/CourtDetailsFull';

const CourtDetailsModal = () => {
  const pathname = usePathname();
  const courtId = String(pathname.split('/').pop());

  if (!courtId) return null;

  return (
    <>
      <title>슬램톡 | 농구장 지도</title>
      <CourtDetailsFull courtId={courtId} />
    </>
  );
};

export default CourtDetailsModal;
