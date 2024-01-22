'use client';

import React, { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import TeamMatching from './components/TeamMatching';
import MateMatching from './components/MateMatching';

const MatchingLayout = () => {
  const [selectedTab, setSelectedTab] = useState<string>('team');

  const handleSelectionChange = (key: React.Key) => {
    if (typeof key === 'string') {
      setSelectedTab(key);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <Tabs
          variant="underlined"
          aria-label="Tabs variants"
          selectedKey={selectedTab}
          onSelectionChange={handleSelectionChange}
        >
          <Tab key="team" title="상대팀 찾기" />
          <Tab key="mate" title="메이트 찾기" />
        </Tabs>
      </div>
      {selectedTab === 'team' ? <TeamMatching /> : <MateMatching />}
    </div>
  );
};

export default MatchingLayout;
