import React from 'react';
import MatchingHeader from '../components/MatchingHeader';

const MateNewPostLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <MatchingHeader />
    <div>{children}</div>
  </div>
);

export default MateNewPostLayout;
