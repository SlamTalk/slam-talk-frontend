import React from 'react';
import MatchingHeader from '../../components/MatchingHeader';

const TeamDetailsLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <MatchingHeader />
    <section className="pb-[56px]">{children}</section>
  </div>
);

export default TeamDetailsLayout;
