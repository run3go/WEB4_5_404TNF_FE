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

## 팀원 구성

<div align="center">

|박정수|권유정|김태연|이민지|
| :------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
|[@run3go](https://github.com/run3go)|[@best106yj](https://github.com/best106yj)|[@COMPOSEDKIM](https://github.com/COMPOSEDKIM)|[@mjlee38](https://github.com/mjlee38)|
| <img src="https://avatars.githubusercontent.com/u/68907573?v=4" width="120px;" alt="박정수"/> | <img src="https://avatars.githubusercontent.com/u/67456002?v=4" width="120px;" alt="권유정"/> | <img src="https://avatars.githubusercontent.com/u/146106094?v=4" width="120px;" alt="김태연"/> | <img src="https://avatars.githubusercontent.com/u/175625606?v=4" width="120px;" alt="이민지"/> |

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

## 역할 분담


### :fire: 박정수

- **FE 팀장**
- **퍼블리싱**
    - 프로필/마이페이지
    - 대시보드 
    - 생활 기록 
    - 일정 
- **기능 구현**
    - 프로필/마이페이지
    - 대시보드
    - 챗봇

### 🌛 권유정

- **디자인**
- **퍼블리싱**
    - 관리자
    - 404
- **기능구현**
    - 일정
    - 관리자

### 🌞 김태연

- **퍼블리싱**
    - 레이아웃(헤더/사이드바)
    - 로그인/회원가입
    - 커뮤니티
- **기능구현**
    - 로그인/회원가입
    - 소셜 로그인
    - 커뮤니티
    - 알림

### 🐶 이민지

- **디자인**
- **퍼블리싱**
  - 랜딩 페이지
- **기능구현**
  - 생활 기록

## 주요 기능


