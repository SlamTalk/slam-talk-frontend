'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import CourtDetailsFull from '../components/CourtDetailsFull';

const CourtDetailsModal = () => {
  const pathname = usePathname();
  const courtId = String(pathname.split('/').pop());

  if (!courtId) return null;

  return <CourtDetailsFull courtId={courtId} />;
};

export default CourtDetailsModal;
