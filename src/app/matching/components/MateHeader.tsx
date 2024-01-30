import React from 'react';

const MateHeader = () => (
  <div className="fixed top-0 flex h-[61px] w-full max-w-[600px] items-center border-b-1 bg-background">
    <div className="flex w-1/3 justify-start pl-4">
      <div>{'<'}</div>
    </div>
    <div className="flex w-1/3 justify-center">
      <div>메이트 찾기</div>
    </div>
    <div className="w-1/3">
      {' '}
      {/* 이 부분은 비어있지만 균형을 위해 필요합니다 */}
    </div>
  </div>
);
export default MateHeader;
