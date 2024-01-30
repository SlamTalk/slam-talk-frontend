import React from 'react';
import MateHeader from '../../components/MateHeader';

const MateDetailLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <MateHeader />
    <section>{children}</section>
  </div>
);

export default MateDetailLayout;
