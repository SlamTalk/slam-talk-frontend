import React from 'react';
import MateHeader from '../components/MateHeader';

const MateNewPostLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <MateHeader />
    <div>{children}</div>
  </div>
);

export default MateNewPostLayout;
