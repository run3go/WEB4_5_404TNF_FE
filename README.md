# 🐶강아지 건강 기록/제안 및 소통 서비스 [ 멍멍일지 ]

- 배포 URL : https://mungnote.vercel.app/
- test ID : user3@example.com
- test PW : 123qwe!@#

## 프로젝트 소개

**멍멍일지**는 반려견 보호자들이 사랑스러운 반려견에게 **개인 맞춤형 최적의 일상 루틴**을 제공하고, **다른 보호자들과 유용한 정보와 경험을 공유**하며 궁금증을 해소할 수 있는 반려동물 관리 플랫폼입니다.

**멍멍일지**는 반려견의 개별적인 특성을 고려한 루틴 추천과 보호자 간의 활발한 소통을 통해 더욱 건강하고 행복한 반려 생활을 돕고자 합니다.

<br>

### 프로젝트 개발 기간

2025.06.26(목) ~ 07.31(목)


<br>

## 개발 스택
- Next.js v15 (App Router)
- TailwindCSS
- TanStack Query
- Zustand

## 팀원 구성

<div align="center">

|박정수|권유정|김태연|이민지|
| :------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/68907573?v=4" width="120px;" alt="박정수"/> | <img src="https://avatars.githubusercontent.com/u/67456002?v=4" width="120px;" alt="권유정"/> | <img src="https://avatars.githubusercontent.com/u/146106094?v=4" width="120px;" alt="김태연"/> | <img src="https://avatars.githubusercontent.com/u/175625606?v=4" width="120px;" alt="이민지"/> |
|[@run3go](https://github.com/run3go)|[@best106yj](https://github.com/best106yj)|[@COMPOSEDKIM](https://github.com/COMPOSEDKIM)|[@mjlee38](https://github.com/mjlee38)|

</div>

## 디렉토리 구조

```
📦src
 ┣ 📂api               # API 함수
 ┣ 📂app               # Next.js의 라우트 구조를 담당하는 디렉토리 (pages 역할)
 ┣ 📂assets            # 정적 리소스 모음
 ┃ ┣ 📂data            # JSON 등 데이터 파일
 ┃ ┣ 📂images          # 이미지 리소스
 ┃ ┗ 📂styles          # 스타일 파일
 ┣ 📂components        # UI 컴포넌트 모음
 ┃ ┣ 📂common          # 재사용 가능한 공통 UI 컴포넌트 (Button, Modal 등)
 ┃ ┣ 📂...             # 기능별 컴포넌트
 ┣ 📂lib               # 라이브러리성 코드
 ┃ ┣ 📂hooks           # 커스텀 훅
 ┃ ┗ 📂utils           # 유틸 함수 
 ┣ 📂providers         # 여러 provider를 모아 루트에 주입
 ┣ 📂stores            # 전역 상태관리
 ┗ 📂types             # 타입 정의
```
<br>

## ☑️ 브랜치 컨벤션

| 브랜치명 | 설명 | 예시1 | 예시2 |
| --- | --- | --- | --- |
| main | 최종 배포  |  |  |
| dev | 개발 과정 통합 |  |  |
| feature | 기능 구현 | feature/login | feature/dashboard |
| style | 퍼블리싱/스타일 | style/header | style/profile |

<br>

## ☑️ 커밋 컨벤션


| 😃 | 제목 | 내용 |
| --- | --- | --- |
| ✨ | Feat: | New Feature (새로운 기능 추가) |
| 🗑 | Remove: | Remove Feature (기능 삭제) |
| 🔄 | Change: | Change Logic (로직 변경) |
| 🐛 | Fix: | Bug Fix (버그 수정) |
| ♻️ | Refactor: | Refactor (리팩토링) |
| 📝 | Docs: | Documentation (문서 수정, README.md) |
| 🚀 | Perform: | Performance (성능 개선) |
| ✅ | Test: | Test (테스트 코드 추가/수정) |
| 💄 | Style: | Style (스타일링) |
| **🔧** | Chore: | Chore (잡무나 유지보수 작업) |
| 📦️ | Package: | Package(패키지 추가/수정) |

<br>

# 역할 분담

## :fire: 박정수

### FE 팀장
### 대시보드 페이지
- 반려견 정보 조회
 - 선택한 반려견의 생활 기록 데이터를 `d3.js` 라이브러리로 시각화
 - `Tanstack Query`를 통한 데이터 캐싱 및 `prefetch`로 사용자 경험 향상
- 몸무게/수면 시간 카드를 뒤집어(`framerMotion`) 상세 수치 리스트를 조회
- 산책 기록 막대 그래프에 hover할 경우, 툴팁으로 수치 조회 가능
- 데스크탑~모바일까지 완전한 반응형 UI 구현
- 오늘의 할 일 카드를 통해 todo 로직 구현

### 프로필 페이지
- **유저 프로필**
  - api를 통해 닉네임 중복 확인 후, 중복되는 닉네임이 없을 경우 수정 가능
  - 현재 비밀번호 확인 후, 새로운 비밀번호로 변경
  - 프로필 이미지 변경
- **반려견 프로필**
  - `react-hook-form`을 활용한 반려견 등록/수정/삭제
  - 반려견 등록/수정 시 `zod`를 통한 검증
- **백신**
  - 반려견의 백신 접종 일자를 등록
  - 백신 종류의 따른 입력값 제한 및 검증
  - `Tanstack Query`의 isPending을 통한 api 중복 호출 방지
- **게시글**
  - 해당 유저가 작성한 게시글 조회
  - 마이 페이지일 경우, "댓글을 작선한 글/좋아요한 글"까지 표시
  - `Tanstack Query`를 통한 무한 스크롤 구현
  - 조회수/인기/최신순 필터링
  - 게시글 로딩 시, 스켈레톤 UI 구현

### 챗봇
- `open-router API`를 활용해 다중 LLM 모델 활용
1. 사용자의 입력을 받아 자연어를 JSON 객체 형태로 Parsing
2. 파싱된 데이터를 통해 관련된 API를 호출
3. API에서 반환된 데이터를 LLM을 통해 재가공 후 사용자에게 반환

## 🌛 권유정

- **디자인**
- **퍼블리싱**
    - 관리자
    - 404
- **기능구현**
    - 일정
    - 관리자

## 🌞 김태연

- **퍼블리싱**
    - 레이아웃(헤더/사이드바)
    - 로그인/회원가입
    - 커뮤니티
- **기능구현**
    - 로그인/회원가입
    - 소셜 로그인
    - 커뮤니티
    - 알림

## 🐶 이민지

- **디자인**
- **퍼블리싱**
  - 랜딩 페이지
- **기능구현**
  - 생활 기록

## 화면 구성

| 로그인          | 대시보드         | 일정 관리       |
|-----------------|------------------|-----------------|
| ![로그인](https://github.com/user-attachments/assets/dfb96444-04be-4cc7-a441-2d1193a3374c) | ![대시보드](https://github.com/user-attachments/assets/85e736b6-a764-4df2-892e-c65ed7ec1339) | ![일정 관리](https://github.com/user-attachments/assets/d31debb5-2d57-4869-bd3a-0ade28e247a3) |
 
| 멍멍일지        | 커뮤니티         | 멍초보 가이드   |
|-----------------|------------------|-----------------|
| ![멍멍일지](https://github.com/user-attachments/assets/be61a5b8-18c4-4c54-9fd1-73fe1690a662) | ![커뮤니티](https://github.com/user-attachments/assets/84c6a8dc-fc82-4867-9f04-43df56e82221) | ![멍초보 가이드](https://github.com/user-attachments/assets/60c8be75-4c48-402e-a5fd-93699f88d62e) |

| 프로필          | 관리자 페이지    |
|-----------------|------------------|
| ![프로필](https://github.com/user-attachments/assets/509e9ede-885c-4187-8abf-d997b4daf9d5) | ![관리자 페이지](https://github.com/user-attachments/assets/1ec0852a-bbf8-42f9-a957-dcbc4217a7e6) |
