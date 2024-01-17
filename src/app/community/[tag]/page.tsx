import Link from 'next/link';
import React from 'react';
// TODO: 게시글 페이지, 게시판, 작성 페이지 , 댓글
const Community = () => (
  <div>
    <input placeholder="검색어를 입력해주세요" />
    <Link href="/community/all">전체</Link>
    <Link href="/community/free">자유</Link>
    <Link href="/community/question">질문</Link>
    <Link href="/community/usedtrade">중고 거래</Link>
    <Link href="/community/rentaltransfer">대관 양도</Link>
    <button type="button">+글 작성하기</button>
  </div>
);

export default Community;
