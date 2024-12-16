<a href="" target="_blank">
<img src="" alt="배너" width="100%"/>
</a>

<br/>
<br/>

# 0. Getting Started (시작하기)

```bash
$ npm i
$ npm run dev
```

[서비스 링크](https:\)

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)

- 프로젝트 이름: Pokemon ERP System
- 프로젝트 설명: 병원 직원들을 대상으로하는 업무 일정공유 및 ERP System

  <img src="https://github.com/user-attachments/assets/1351c931-2726-49fe-82c3-d3abb4db1548" width="400">

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)

|                                          김금란                                           |                                           이승건                                           |                                           차재식                                            |
| :---------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/31915107?v=4" alt="김금란" width="150"> | <img src="https://avatars.githubusercontent.com/u/175666538?v=4" alt="이승건" width="150"> | <img  src="https://avatars.githubusercontent.com/u/127061507?v=4" alt="차재식" width="150"> |
|                                            FE                                             |                                             FE                                             |                                             FE                                              |
|                          [GitHub](https://github.com/goldegg127)                          |                            [GitHub](https://github.com/vgotu99)                            |                          [GitHub](https://github.com/Chajaesik01)                           |
|                                        알 수 없음                                         |                                            ENTJ                                            |                                            ISFJ                                             |
|                                       모자를 좋아함                                       |                                      고양이를 좋아함                                       |                                        운동을 좋아함                                        |

<br/>

# 3. Key Features (주요 기능)

- **회원가입**:

  - 회원가입 시 DB에 유저정보가 등록됩니다.

- **로그인**:

  - 사용자 인증 정보를 통해 로그인합니다.
  - 로그인 이후 필요한 유저 정보를 전역 상태로 관리합니다.

- **나의 업무**:

  - 캘린더 UI를 통해 다른 팀, 팀원의 업무 일정을 확인할 수 있습니다.
  - 나의 업무 등록과 수정 삭제가 가능합니다.
  - 특정 사용자의 업무 일정만 확인할 수 있습니다
  - 클릭 시 하루치의 세부 업무를 확인할 수 있습니다.

- **나의 급여**:

  - 급여리스트에서 급여 내역을 확인할 수 있습니다.
  - 클릭 시 급여에 대한 세부 내역을 확인할 수 있습니다.

- **급여 정정 신청**:
  - 급여 내역이 정확하지 않은 경우 정정 신청할 수 있습니다.
  - 클릭 시 정정 신청에 대한 세부 내역을 확인할 수 있습니다.

<br/>
<br/>

# 4. Tasks & Responsibilities (작업 및 역할 분담)

|        |                                                                                            |                                                                                                                                                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 김금란 | <img src="https://avatars.githubusercontent.com/u/31915107?v=4" alt="김금란" width="100">  | <ul><li>Lint 관련 설정</li><li>redux toolkit, SWR 라이브러리 셋업</li><li>재사용 가능한 커스텀 훅 생성</li><li>로딩, 인풋, 레이아웃 관련 컴포넌트 생성</li><li>파이어베이스로 로그인 및 회원가입 기능 구현과 인증 인가</li></ul> |
| 이승건 | <img src="https://avatars.githubusercontent.com/u/175666538?v=4" alt="이승건" width="100"> | <ul><li>업무 페이지 구현</li><li>Button, FileUploading 컴포넌트 구현</li><li>Firebase DB 유틸함수 구현</li><li>DB 구조 설계 및 interface 타입 정의</li> </ul>                                                                    |
| 차재식 | <img src="https://avatars.githubusercontent.com/u/127061507?v=4" alt="차재식" width="100"> | <ul><li>프로젝트 세팅</li><li>사이드바 구현 </li><li>페이지네이션 구현</li><li>급여 리스트 페이지 및 세부 모달</li><li>급여 정정 리스트 페이지 및 세부 모달                                                                      |

<br/>
<br/>

# 5. Technology Stack (기술 스택)

## 5.1 Language

|            |                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML5      | <img src="https://github.com/user-attachments/assets/2e122e74-a28b-4ce7-aff6-382959216d31" alt="HTML5" width="100">                                                                                                       |
| CSS3       | <img src="https://github.com/user-attachments/assets/c531b03d-55a3-40bf-9195-9ff8c4688f13" alt="CSS3" width="100">                                                                                                        |
| Typescript | <img src="https://i.namu.wiki/i/CF2aJg6hILAJ5_m-wWJS_-vLD8HqL3E57Kp7pL6zMO7s3EH7LO4JX8GXAupzDwL_HY-Pzf7pDsXiafNTpcdEqriLNDRR2KuhuO3zYn1fhboWCA0YJVGOvhyR6sFyM-TVg0ZpSbFQn9QA9WnL0h_Bqg.svg" alt="Typescript" width="100"> |

<br/>

## 5.2 Frotend

|                  |                                                                                                                                                 |        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| React            | <img src="https://github.com/user-attachments/assets/e3b49dbb-981b-4804-acf9-012c854a2fd2" alt="React" width="100">                             | 18.3.1 |
| React-Redux      | <img src="https://react-redux.js.org/img/redux_white.svg" alt="Redux" width="100">                                                              | 9.1.2  |
| StyledComponents | <img src="https://github.com/user-attachments/assets/c9b26078-5d79-40cc-b120-69d9b3882786" alt="StyledComponents" width="100">                  | 6.1.13 |
| SWR              | <img src="https://velog.velcdn.com/images/hyeseong0914/post/1c09f18f-54dc-4986-85e1-71f37731860a/image.png" alt="StyledComponents" width="100"> | 2.2.5  |

<br/>

## 5.3 Backend

|          |                                                                                                                        |        |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | ------ |
| Firebase | <img src="https://github.com/user-attachments/assets/1694e458-9bb0-4a0b-8fe6-8efc6e675fa1" alt="Firebase" width="100"> | 11.0.2 |

<br/>

## 5.4 CI/CD

|        |                                                                                                                       |     |
| ------ | --------------------------------------------------------------------------------------------------------------------- | --- |
| Vercel | <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkAuKrVgOa4BJxUnH4gdJ5TV0m2IFEMjLJ2g&s" width="100"> | R37 |

<br/>

## 5.5 Cooperation

|        |                                                                                                                      |
| ------ | -------------------------------------------------------------------------------------------------------------------- |
| Git    | <img src="https://github.com/user-attachments/assets/483abc38-ed4d-487c-b43a-3963b33430e6" alt="git" width="100">    |
| Notion | <img src="https://github.com/user-attachments/assets/34141eb9-deca-416a-a83f-ff9543cc2f9a" alt="Notion" width="100"> |
| Slack  | <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" alt="Notion" width="100">         |
| Zoom   | <img src="https://logos-world.net/wp-content/uploads/2021/03/Zoom-Logo.png" alt="Notion" width="100">                |

<br/>

# 6. Project Structure (프로젝트 구조)

```plaintext
project/
├── public
│   ├── PokemonLogo.png      # 로고 및 정적 파일
│
├── src/
│   ├── assets/              # 이미지 아이콘 폰트 등 리소스
│   ├── components/          # 재사용 가능한 UI 컴포넌트
|   |── constant/            # 프로젝트에서 사용하는 상수값 모음 (예: URL, 키값 등)
|   |── firebase/            # firebase 관련 함수
│   ├── hooks/               # 커스텀 훅 모음
│   ├── pages/               # 각 페이지컴포넌트와 해당 페이지에서만 사용하는 컴포넌트
|   |── routes/              # 경로 설정 화면 라우팅과 URL 직접 접근 차단
|   |── services/            # 외부 API 호출 함수 및 관련 로직
|   |   └── swrFetcher.ts    # SWR fetcher 함수
|   |── slices/              # Redux action 및 reducer
|   |── state/               # 상태 관리를 위한 로직 (Redux 및 기타 상태 관리 관련 코드)
|   |   └── store.ts         # Redux store 초기화 및 전역 상태 관리 설정
|   ├── styles/              # reset.css 및 디자인 토큰 정의
|   ├── types/               # 프로젝트에서 사용하는 type 정의
|   |   └── interface.ts     # fetch된 데이터 구조의 타입 정의
|   ├── utils/               # 다양한 곳에서 사용하는 유틸 함수 정의
│   ├── App.tsx              # 메인 애플리케이션 컴포넌트
│   ├── main.tsx             # 엔트리 포인트 파일
│   ├── firebaseConfig.ts    # firebase 인스턴스 초기화 파일
├── .commitlintrc.json       # 커밋 메시지 스타일을 정의하는 규칙 파일
├── .prettierrc              # 코드 포매팅 규칙 파일
├── eslint.config.js         # ESLint 설정 파일
├── index.html               # 애플리케이션의 HTML 템플릿
├── package-lock.json        # 정확한 종속성 버전이 기록된 파일로, 일관된 빌드를 보장
├── package.json             # 프로젝트 종속성 및 스크립트 정의
├── .gitignore               # Git 무시 파일 목록
├── README.md                # 프로젝트 개요 및 사용법
├── tsconfig.json            # TypeScript 설정 파일
└── vite.config.ts           # Vite 설정 파일
```

<br/>
<br/>

# 7. Development Workflow (개발 워크플로우)

## 브랜치 전략 (Branch Strategy)

우리의 브랜치 전략은 Git Flow를 기반으로 하며, 다음과 같은 브랜치를 사용합니다.

- Main Branch

  - 배포 가능한 상태의 코드를 유지합니다.

- develop Branch

  - 페이지 및 기능 개발 상태의 코드를 유지합니다.

- {prefix/function-issueNumber} Branch
  - 이슈를 추가하여 생성된 issueNumber를 추가합니다.

<br/>
<br/>

# 8. Coding Convention

## 코드 포맷팅

### ESLint, PrettierLint

<br/>

## 명명 규칙

- 상수 : 영문 대문자(SNAKE_CASE)

```tsx
const NAME_ROLE;
```

- 클래스 네임 : kebab-case

```HTML
<div className = "name-role">
```

- 변수 & 함수 : camelCase

```tsx
// state
const [isLoading, setIsLoading] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [currentUser, setCurrentUser] = useState(null);

// 이벤트 핸들러: 'handler'로 시작
const handlerClick = () => {};
const handlerChange = () => {};

// 반환 값이 boolean인 경우: 'is'로 시작
const isLoading = false;
```

- 컴포넌트 명 : PascalCase

  - 컴포넌트 명과 디렉토리 명(`directory/index.tsx`) 동일
  - 파일 하나당 컴포넌트 하나(단일 책임 원칙)

<br/>

## 스타일드 컴포넌트 명 : S.PascalCase

### 함수 아래에 작성

```tsx
// 위 부분 생략
return (
  <S.MypageBodyWrap>
    <S.MypageBody>
      <PageBody userInfoArr={userInfo.info} userQueArr={userInfo.question} />
    </S.MypageBody>
  </S.MypageBodyWrap>
);

const S = {
  MypageBodyWrap: styled.div`
    background: #efefef;
  `,
  MypageBody: styled.div`
    width: 1000px;
    margin: 0 auto;
    padding: 70px 0;
  `,
};
```

<br/>

## 함수

```tsx
함수는 함수 표현식을 사용하며, 화살표 함수를 사용한다.
// Good
const fnName = () => {};

// Bad
function fnName() {};
```

<br/>

## 폴더 네이밍

카멜 케이스를 기본으로 하며, 컴포넌트 폴더일 경우에만 파스칼 케이스로 사용한다.

```tsx
// 카멜 케이스
camelCase;

// 파스칼 케이스
PascalCase;
```

<br/>

## 파일 네이밍

컴포넌트일 경우만 `.tsx` 확장자를 사용한다 (그 외에는 `.ts`)
<br/>
customHook을 사용하는 경우 : `use + 함수명`

<br/>
<br/>

# 9. 커밋 컨벤션

## 기본 구조

```bash
prefix : subject (#issueNumber)
```

<br/>

## issue 규칙

- ISSUE 하나당 - branch 하나, PR 하나
  - 이슈 제목
    - `[prefix] 구체적인 내용`
  - PR 제목
    - `이슈 제목과 동일`
  - 브랜치 컨벤션
    - `prefix/function-issueNumber`
  - 커밋 메시지 컨벤션
    - `prefix: subject (#issueNumber)`
  - 사용하는 prefix
    - `feature` : 새로운 기능 추가
      - 커밋 메세지는 `feat` 사용
    - `fix` : 버그 수정
    - `hotfix` : 긴급한 버그 수정
    - `docs` : 문서 수정
    - `style` : 코드 스타일 변경 (코드 로직에 영향을 주지 않는 변경)
    - `refactor` : 코드 리팩토링
    - `perf` : (Performance) 성능 개선
    - `design` : UI 디자인 변경 또는 css 관련 작업
    - `test` : 테스트 작업 관련
    - `settings` : 프로젝트 설정 관련 변경
    - `build` : 빌드 시스템이나 외부 종속성에 대한 변경
    - `ci` : CI 설정 파일 및 스크립트 변경
    - `chore` : 기타 작업 (ex. .gitignore 수정)
    - `comment` : 주석 추가 또는 수정
    - `rename` : 파일 또는 폴더명 변경
    - `remove` : 파일 삭제
    - `revert` : 이전 커밋 되돌리기

<br/>

# 10. 데이터베이스 구조

  <img src = "https://github.com/user-attachments/assets/ff3bcb8a-0c0d-42a6-b038-fa1fcec983c4" width="400">

# 11. 데모 영상

## 로그인

## 일정

## 급여
