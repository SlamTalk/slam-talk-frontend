import React from 'react';
import MatchingHeader from '../../components/MatchingHeader';

const MateDetailsLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <MatchingHeader />
    <section>{children}</section>
  </div>
);

export default MateDetailsLayout;
