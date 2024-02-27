<h1 align="middle">Slam Talk (슬램톡)</h1>

<p align="middle">
<img src="https://github.com/SlamTalk/slam-talk-frontend/assets/103404125/a6bd1eca-7d78-402c-99a1-66005ecc1727" width="200"/>
</p>

<p align="middle">농구를 할 장소와 함께 할 친구를 찾을 수 있는 플랫폼</p>

<p align="middle"><a href="https://slam-talk.vercel.app">사이트 바로가기 ⛹️‍♀️⛹️‍♂️</a></p>

## 프로젝트 개요

> 개발 기간: 24/01/11 ~ 24/2/22(프로젝트 발표, 구름 수료) 이후 유지보수 중<br>
>
> [동기와 비동기 팀 노션](https://www.notion.so/7460cade2e63406481e110249fc6f991) | [프론트 노션](https://www.notion.so/7460cade2e63406481e110249fc6f991?p=a0f8672e41df49ce86c681506b707aeb&pm=s) | [백엔드 노션]() <br> [Swagger](http://43.200.131.233:8080/swagger-ui/index.html) | [API 문서](https://www.notion.so/7460cade2e63406481e110249fc6f991?p=f3bf16cf100e45f69a3e0bb075a342b0&pm=s) | [ERD](https://www.erdcloud.com/d/GyK7pkbTanPFqno4F)
>
> [기획서 & 기능 명세서](https://www.notion.so/ec211098ba794bff83e6a41a74a3d58c)

## 동기와 비동기 프론트엔드 팀원 소개

> [백엔드 팀원 소개 바로가기](https://github.com/SlamTalk/slam-talk-backend)

<table width="500" align="center">
<tbody>
<tr>
<th>Pictures</th>
<td width="100" align="center">
<a href="https://github.com/Jiiker">
<img src="https://avatars.githubusercontent.com/u/100774811?v=4" width="60" height="60">
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/hi-rachel">
<img src="https://avatars.githubusercontent.com/u/103404125?v=4" width="60" height="60">
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/SwimmingRiver">
<img src="https://avatars.githubusercontent.com/u/92986844?v=4" width="60" height="60">
</a>
</td>
</tr>
<tr>
<th>Name</th>
<td width="100" align="center">임동기</td>
<td width="100" align="center">문총미</td>
<td width="100" align="center">강수영</td>

</tr>
<tr>
<th>Role</th>
<td width="300" align="left">
<div align='center'></div>
<ul>
프로젝트 팀장
<li>메인페이지</li>
<li>농구메이트 찾기</li>
<li>상대팀 매칭</li>
<li>관리자 페이지</li>
</ul>

</td>
<td width="300" align="left">
<ul>
프론트엔드 팀장
<li>농구장 지도, 제보 기능</li>
<li>회원가입/로그인 관련</li>
<li>유저 관리(마이페이지 관련 - 내 매칭/메이트 목록, 테마 변경, 프로필)</li>
<li>개발 초기 환경구축(Next.js, GitHub Actions, husky)</li>
</ul>
</td>

<td width="300" align="left">
<ul>
<li>채팅 기능 구현</li>
<li>나의 채팅 목록</li>
<li>채팅 룸 타입별 채팅 페이지</li>
<li>게시판 crud 구현</li>
<li>게시글 페이지</li>
<li>게시판 검색, 태그 필터링 구현</li>
</ul>
</td>
</tr>
<tr>
<th>GitHub</th>
<td width="100" align="center">

<a href="https://github.com/Jiiker">
<img src="http://img.shields.io/badge/Jiiker-green?style=social&logo=github"/>
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/hi-rachel">
<img src="http://img.shields.io/badge/hi-rachel-green?style=social&logo=github"/>
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/SwimmingRive">
<img src="http://img.shields.io/badge/SwimmingRive-green?style=social&logo=github"/>
</a>
</td>
</tr>
</tbody>
</table>

<br>

## 프로젝트 소개

> 프론트엔드 3명, 백엔드 4명으로 구성되어 작업한 프로젝트입니다. <br>
>
> 주변에 있는 농구장을 검색할 수 있고, 해당 농구장을 이용하는 사람들과 채팅을 통해 소통할 수 있으며 농구 메이트 찾기, 팀 매칭, 대관 양도, 중고 거래 등의 기능을 이용할 수 있는 플랫폼입니다. <br>

### 주요 기능

- 집 근처 농구장 표시, 검색 기능 : 유저의 현재 위치를 중심으로 주변의 농구장을 표시하는 기능(자세한 농구장 특화 정보 제공), 검색으로 농구장 찾기 / 지역 이동 가능.
- 농구장 제보 기능 : 유저가 직접 알려지지 않은 농구장을 제보하는 기능.
- 농구장별 채팅 기능 : 해당 농구장을 이용하는 사람끼리 채팅할 수 있는 기능.
- 농구 메이트 찾기 기능 : 원하는 시간과 원하는 지역 및 실력에 맞는 팀원을 구할 수 있는 기능.
- 상대팀 매칭 기능 : 원하는 지역과 원하는 시간 및 인원수에 맞춰 상대 팀을 매칭 해주는 기능.
- 게시판 : 회원 모집, 대관 양도, 중고 거래 등을 할 수 있는 게시판.

### 프로젝트 아키텍처 <br>

<img alt="슬램톡 프로젝트 아키텍처" src="https://github.com/SlamTalk/slam-talk-frontend/assets/103404125/f74b5631-bc78-4037-ba00-ebaf2dda3af4" width="90%"/>

> 농구 앱 특성상 모바일 유저가 많을 것으로 예상되어 반응형 웹앱으로 구현했습니다.

### 기술 스택

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) <br>
![Zustand](https://img.shields.io/badge/-Zustand-222222?style=for-the-badge&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) <br/>
![TailwindCSS](https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/-Git-F05032?style=for-the-badge&logo=git&logoColor=ffffff)

[기술 스택 선정 이유](https://www.notion.so/ab7a4fcc0b0f4682ad274bfa98a9a7b5)

## 주요 기능

### 메인 페이지

### 회원가입

<img alt="회원가입" src="https://github.com/SlamTalk/slam-talk-frontend/assets/103404125/9192f835-7ffd-4f25-aeab-e43faec4f997" width="400px">

- 자체 회원가입

  회원가입시 유저가 번거롭지 않게 최대한 간단하게 구성하였고, 가짜 계정 방지와 비밀번호 재설정에서 문제가 없기 위해 이메일 인증(SMTP 이용)을 도입했습니다. <br>

  백엔드에서 보내는 닉네임/이메일 중복 에러 메세지를 모달을 통해 표시하고, 프론트단에서 닉네임/이메일/비밀번호 검증을 진행, 에러 메세지를 Next UI를 이용해 표시했습니다.

- funnel 패턴을 이용한 유저 정보 수집

  회원가입시 자동으로 로그인이 완료되고 '/user-info' 페이지로 이동해 농구 포지션, 농구 실력 2가지 유저 정보를 수집합니다. funnel 패턴을 이용해 2가지 단계를 모두 완료시 api 요청을 보내 유저 정보 수집을 완료합니다. 빠른 이용을 원해 유저 정보 수집 페이지에서 벗어나도 추후 프로필에서 해당 정보 설정이 가능하기 때문에 문제되지 않습니다.

- 소셜 회원가입

  편하고 빠른 앱 이용을 위해 카카오, 네이버, 구글 3가지 소셜 로그인을 도입했습니다. <br>
  소셜로 첫 로그인시 백엔드에서 DB 조회로 판별해 처음 가입하는 유저인 경우에는 '?firstLogin='true'' params을 넘겨줍니다. '/social-login' 페이지에서 이를 통해 회원가입을 판단하고, 회원가입시 유저 정보 수집 페이지로 이동시키고 로그인시 메인 페이지로 이동시킵니다.

### 로그인, 유저 관리

<img alt="로그인-유저-관리" src="https://github.com/SlamTalk/slam-talk-frontend/assets/103404125/16eeecd8-1ac2-4537-bfce-8f8786abfd34" width="400px">

- 로그인 구현

  보안을 위해(XSS 공격 방어) accessToken은 메모리에 저장하고, refreshToken은 HTTP Only 쿠키에 저장해 관리하고 있습니다.
  CSRF 취약점 보안을 위해 secure 속성을 사용해 HTTPS를 통해서만 쿠키가 전송될 수 있게 제한했습니다.

- 로그인 접근 제한

  로그인시 로그인 상태 정보(isLoggedIn)를 localStorage에 저장해 프론트단에서 isLoggedIn값과 api 응답 데이터 존재로 로그인 여부를 판별합니다. 이를 이용해 프론트단에서 로그인 여부에 따른 페이지 접근 제한을 걸어줬습니다. 현재 서비스에서는 조회는 비로그인시에도 가능하지만 생성, 삭제, 수정시 로그인이 필요하며 채팅 서비스는 로그인시 가능합니다.

- 유저 관리

  > 마이페이지에서 출석하기, 화면 모드(다크/라이트) 설정, 프로필 보기/수정하기, 문의하기, 로그아웃, 탈퇴가 가능합니다.

  활동 내역: 출석하기, 활동 내역 바탕으로 유저마다 점수, level을 부여하는 방식으로 유저 참여율을 높이고자 했습니다. 이후 게이미피케이션(Gamification) 요소를 더 발전시킬 예정입니다.

  화면 모드 설정: 다크/라이트 테마 정보를 localStorage에 저장해 재접속시 설정한 화면 테마로 접속하도록 구현했습니다.

  프로필 수정: 사진, 닉네임, 자기소개, 포지션, 농구 실력 수정이 가능하며 react-hook-form을 이용해 유효성 검사를 하고 에러 메세지 표시를 했습니다. 사진 데이터 전송을 위해 FormData를 이용했습니다.

  상대방 프로필 표시: 상대방 유저 아바타를 누르면 어떤 페이지에서든 상대방 프로필이 표시될 수 있기 때문에 Next UI Modal을 이용해 구현했습니다. 아바타 클릭시 해당 유저의 id를 props로 넘겨주고 이를 받아 해당 유저의 id로 유저 정보를 조회합니다. 상대방 프로필 정보는 마이 프로필에서 민감 정보인 이메일, 가입 경로를 제외한 정보와 동일합니다.

### 농구장 지도

https://github.com/SlamTalk/slam-talk-frontend/assets/103404125/d7c19686-9c29-43c9-bc58-2aeff9999256.mp4

> 처음에 [kakao maps web api](https://apis.map.kakao.com/web/)를 이용했지만 점점 기능이 많아지면서 react 환경에 적합하고 코드가 좀 더 간편, 문서화가 잘되어 있는 [react-kakao-maps-sdk](https://github.com/JaeSeoKim/react-kakao-maps-sdk)로 리팩토링 완료하였습니다.

- 농구장 마커 표시

  커스텀 오버레이를 이용해 농구공을 이용한 custom marker를 적용했고 상단에 농구장명을 표시해줬습니다. <br>

  처음 지도 접속시 빠른 데이터 표시를 위해 모든 농구장에 대한 간단 정보(위치 정보, 농구장명)만 불러와 마커를 표시해주고, 농구장 마커 클릭시 해당 농구장 id로 농구장 상세 정보 보기 api 요청을 보내 상세 정보를 표시합니다.

- 농구장 자세히 보기

  농구장 마커를 클릭시 해당 농구장에 대한 자세한 정보가 표시됩니다. <br>
  길찾기를 누르면 카카오맵으로 연결되며 해당 농구장으로 도착이 설정되어서 바로 길찾기가 가능합니다. <br>
  크게 보기를 누르면 해당 농구장에 대한 url이 생겨 해당 농구장 정보를 공유할 수 있습니다. <br>

- 유저 현재 위치 기반

  지도 접속시 현재 유저 위치 정보가 있다면 그 위치로 처음 위치를 설정합니다. 유저가 위치 정보 수집을 거부하면 서울로 기본 설정됩니다. <br>
  '농구장 제보' 위에 location Icon 버튼을 클릭하면 현재 위치로 이동합니다. <br>
  앱의 다른 부분에서도 추후 위치 기반을 도입할 예정으로 Geolocation API를 이용한 유저 위치 정보를 전역 상태 정보로 저장하고, 위치 정보 수집 역할을 하는 함수를 유틸 함수로 분리했습니다. <br>

- 검색

  검색을 하면 현재 DB에 있는 농구장 정보 안에서 먼저 검색을 하고 검색 결과가 있다면 이에 따라 이동합니다. DB 안에 없는 정보를 검색한다면 kakao maps api를 이용해 검색이 되고 그 검색 결과에 따라 이동합니다.

- 지도 조작

  마우스, 모바일(터치)를 통해 지도 이동이 가능하고, 마우스 Wheel Event, +/- Control로 확대, 축소가 가능합니다.

- 지도 클러스트

  지도 축소로 너무 많은 농구장 마커가 보이면 일정 map level에서 마커 클러스트를 적용합니다.

### 농구장 제보하기

https://github.com/SlamTalk/slam-talk-frontend/assets/103404125/bf7565d2-4abf-4b77-8939-64bfce7608e1.mp4

> 지도에 표시되지 않는 농구장을 유저가 직접 제보할 수 있는 기능입니다. 제보하기 버튼을 누르면 지도 클릭시 마커 생성 이벤트가 발생하고 해당 마커를 클릭하면 위도, 경도, 주소 정보가 자동으로 채워져 해당 위치에 제보가 가능합니다. <br>

- 제보 UI

  제보시 주소, 농구장명만 필수값이고 나머지 정보들은 자유롭게 채울 수 있습니다. 해당 데이터에 맞는 Input, Radio, Select, Textarea 요소들을 이용해 제보 컴포넌트를 구성하였고, react-hook-form을 이용해 유효성 검사 진행, 에러 메세지 표시를 했습니다.

  > ✏️ react-hook-form 사용 이유 <br>

        - 많은 useState를 사용하는 것보다 간단하게 코드 표현 가능
        - 실시간 유효성 검사 및 동기화 가능
        - 리렌더링 최소화
        - 농구장 제보 컴포넌트, 프로필 수정에서는 필수값이 많지 않아 인풋 전체가 danger color로 표시되는 Next UI 에러 메세지보다 react-hook-form 에러 메세지를 이용해 표시했습니다.
        (에러 메세지는 항상 고정된 div 높이 안에 표시해 에러 메세지 존재 여부에 따라 UI가 변동되지 않도록 고정했습니다.)

- 제보 완료 후 제보 상태 관리

  제보 완료 후 해당 위치에 제보 검토 중인 마커가 표시되고 클릭시 자신이 제보한 정보를 확인할 수 있습니다. <br>

  관리자 검토 후 해당 농구장이 수락된다면 해당 유저는 30점의 점수를 받고, 제보 검토 중 마커는 실제 농구장 마커로 표시됩니다.

### 농구 메이트 찾기

### 팀 매칭 찾기

### 커뮤니티

### 채팅

인증된 유저 끼리 실시간으로 채팅을 이용할 수 있습니다.

채팅방 타입은 1:1 채팅방 / 농구장 채팅방 / 같이하기 채팅방 / 팀 매칭 채팅방 이렇게 4가지 종류가 있으며,

각 타입에 따라 채팅방 이름이 결정됩니다.

채팅방 첫 입장시 입장안내 메시지,퇴장시에는 퇴장안내 메시지를 채팅방에 보여줍니다.

유저가 좌측 상단에있는 나가기 버튼을 누르면 다른 페이지로 이동을 합니다.(완전한 퇴장 x)

→ 유저가 채팅방에서 마지막으로 본 메시지를 기록하고, 재입장시에는 그 이후의 메시지만 보여줍니다.

또한 채팅방에서 과거 메세지를 조회하고 싶다면 more 버튼을 눌러서 과거 메세지 내역을 조회할 수 있습니다.

<div style="display: flex; gap: 10px;">
<div>
    <img alt="1:1-채팅" src="https://github.com/SlamTalk/slam-talk-frontend/assets/103404125/2c8fa872-70b4-48c8-bc64-90853044f195" width="400px" height="520px">
    <p>농구장 시설 단체 채팅</p>
<p>1:1 채팅방은 채팅방을 생성할 유저 프로필 카드에서 또는 팀 매칭<br/> 완료후 팀 대표자 간 채팅방 생성이 가능합니다.</p>
</div>
  <div>
    <img alt="시설-채팅" src="https://github.com/SlamTalk/slam-talk-frontend/assets/103404125/85c88777-2e27-407d-86aa-63c8f3cb08bf" width="400px" height="520px">
    <p>1:1 채팅</p>
  <p>단체 채팅방은 농구장 지도, 메이트 매칭에서 생성 가능합니다.</p>
    </div>
</div>

<br>
채팅 리스트에서는 유저가 참여한 채팅방 목록을 조회할 수 있습니다.

채팅방 최신 메세지, 채팅방 제목, 채팅방 타입(DM/BM/MM/TM) 을 함께 확인할 수 있습니다.

<img alt="채팅-리스트" src="https://github.com/SlamTalk/slam-talk-frontend/assets/103404125/936b88a5-67a5-4646-9745-97425f3cdbfe" width="400px">

채팅 방 타입에 따라서 정해진 이름과 dm일 경우는 유저의 프로필이 채팅룸의 이미지가 됩니다.

타입별로 구분하여 명시해줍니다.

### 관리자 페이지

## Problem Solving

> 문제 발생과 해결 방법

## 협업 방식

[프론트엔드 팀 규칙](https://www.notion.so/d2944bc3c6064dd58a8a0d59a2a5ba7a) <br>

> 문서: Notion 활용 <br>
> 소통: Slack, KakaoTalk 활용

[깃 컨벤션](https://www.notion.so/300caffe87af4fb09eaea24d3cfc31c7) <br>

## 기타

- 구름 풀스택 2회차 최종 프로젝트 인기상 수상 - [발표(24/02/22) PPT](https://github.com/SlamTalk/slam-talk-frontend/files/14399752/slam_talk.pdf)
- [피그마 와이어프레임](https://www.figma.com/file/AAC8YMtbWw32jkT0XNRS9q/%EB%86%8D%EA%B5%AC-%EC%95%B1?type=design&node-id=0%3A1&mode=design&t=fOLsFQ3RiSAo5Rml-1)
