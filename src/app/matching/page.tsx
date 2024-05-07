'use client';

import React, { useRef, useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { IoSearchSharp } from 'react-icons/io5';
import { useSearchParams } from 'next/navigation';
import { FaArrowUp } from 'react-icons/fa';

import TeamMatching from './components/TeamMatching';
import MateMatching from './components/MateMatching';

const MatchingPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const tabValue = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState<string>(
    tabValue === 'team' || tabValue === 'mate' ? tabValue : 'team'
  );
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [keywordProp, setKeywordProp] = useState<string>('');

  const handleSelectionChange = (key: React.Key) => {
    setSearchKeyword('');
    setKeywordProp('');
    if (typeof key === 'string') {
      setSelectedTab(key);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchClick = () => {
    setKeywordProp(searchKeyword);
  };

  const handleScrollToTop = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div ref={scrollRef} />
      <div className="mt-2 flex justify-between px-[16px]">
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
        <div className="flex items-center rounded-md border-2">
          <input
            value={searchKeyword}
            type="search"
            placeholder="제목, 작성자, 장소 등"
            className="flex-grow rounded-md border-0 bg-background px-2 text-sm focus:outline-none focus:ring-0 sm:max-w-[80px]"
            onChange={handleInputChange}
          />
          <button
            aria-label="Search"
            type="button"
            onClick={handleSearchClick}
            className="ml-2 mr-2 flex h-full items-center justify-center rounded-md focus:outline-none"
          >
            <IoSearchSharp
              size={20}
              className="text-gray-400 hover:text-black dark:hover:text-white"
            />
          </button>
        </div>
      </div>
      {selectedTab === 'team' ? (
        <TeamMatching keywordProp={keywordProp} />
      ) : (
        <MateMatching keywordProp={keywordProp} />
      )}
      <div className="relative flex w-full justify-center">
        <button
          type="button"
          aria-label="Top button"
          className="fixed bottom-12 m-4 rounded-full border-[1px] bg-white p-2 shadow-md"
          onClick={handleScrollToTop}
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default MatchingPage;
