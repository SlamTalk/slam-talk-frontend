import React from 'react';
import MatchingHeader from '../components/MatchingHeader';

const TeamNewPostLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <MatchingHeader />
    <div>{children}</div>
  </div>
);

export default TeamNewPostLayout;
