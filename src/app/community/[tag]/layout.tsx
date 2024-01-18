import Link from 'next/link';
import React from 'react';
import '@/styles/globals.css';
import Page from './page';

const Layout = () => (
  <div className="border-solid">
    <input placeholder="검색어를 입력해주세요" />
    <Link href="/community/all">전체</Link>/
    <Link href="/community/free">자유</Link>/
    <Link href="/community/usedtrade">중고 거래</Link>/
    <Link href="/community/question">질문</Link>/
    <Link href="/community/rentaltransfer">대관 양도</Link>/
    <button type="button">
      <Link href="/community/write">+글 작성하기</Link>
    </button>
    <Page />
  </div>
);

export default Layout;
