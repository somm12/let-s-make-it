## 1. 프로젝트소개

레시피 공유 웹 사이트로, 글을 업로드하고 댓글을 달 수 있는 커뮤니티입니다.

<br>

## 2. 프로젝트 계획 이유

기초 CRUD 기능이 있는 프로젝트를 개발하고 이를 통해 redux, react-query를 공부하려고 합니다.

## 3. TECH STACK

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=ffffff"/> <img src="https://img.shields.io/badge/REACT-000000?style=for-the-badge&logo=React&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/REACT QUERY-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=ffffff"/>
<br/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Nodje.js&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=SaSS&logoColor=ffffff"/>

<br>

## 4. 주요기능

1. 게시판
   - 글쓰기 및 파일 업로드 (Naver Cloud Storage)
   - 글수정하기
   - 글삭제
   - 글 조회
2. 댓글 (react-query)
   - 댓글 쓰기
   - 댓글 수정
   - 댓글 삭제
   - 댓글 조회
3. 메인 페이지
   - 레시피 검색 기능
   - 전체 글 최신순, 인기순 정렬 기능 (무한 스크롤)
4. 북마크
   - 원하는 게시물 저장
5. 로그인 및 회원가입 (firebase)
   - 로그인
   - 로그아웃
   - 회원가입
6. 마이페이지 (user 정보 redux 사용)
   - 프로필 사진, 별명 변경

## 5. UI

<details>
<summary> 1. 메인화면</summary>
  <br/>
<div markdown="1">

<img width="800" alt="image" src="https://github.com/somm12/lets-make-it/assets/63543733/8c21a834-caa0-4dde-9624-58a9d5d28053">
</div>
</details>

<details>
<summary> 2. 글쓰기</summary>
  <br/>
<div markdown="1">

<img width="800" alt="스크린샷 2023-07-25 오후 8 34 55" src="https://github.com/somm12/lets-make-it/assets/63543733/9d754d08-9e1d-493c-8913-b0457885a156">

</div>
</details>

<details>
<summary> 3. 글수정</summary>
  <br/>
<div markdown="1">

<img width="800" alt="image" src="https://github.com/somm12/lets-make-it/assets/63543733/ab69233d-f345-4907-a64c-7402c897daa7">

</div>
</details>

<details>
<summary> 4. 글조회 및 댓글 </summary>
  <br/>
<div markdown="1">

<img width="800" alt="image" src="https://github.com/somm12/lets-make-it/assets/63543733/e49f5f6e-fbc3-48f4-9a14-8a6f4e158b81">
<img width="800" alt="image" src="https://github.com/somm12/lets-make-it/assets/63543733/f88c140a-c008-43a3-aa91-f597441bfbdf">

</div>
</details>
<details>
<summary> 5. 댓글 수정 및 삭제</summary>
  <br/>
<div markdown="1">

<img width="800" alt="image" src="https://github.com/somm12/lets-make-it/assets/63543733/b67484fe-550a-4a83-adee-270f01aaee7c">

</div>
</details>

<details>
<summary> 6. 북마크</summary>
  <br/>
<div markdown="1">

<img width="800" alt="image" src="https://github.com/somm12/lets-make-it/assets/63543733/47a4771f-8e8a-4def-9dfc-196122c94552">

</div>
</details>

<details>
<summary> 7. 마이페이지</summary>
  <br/>
<div markdown="1">

<img width="800" alt="image" src="https://github.com/somm12/lets-make-it/assets/63543733/20ed810a-7857-4ea2-b9f0-c05cd6767dbf">

</div>
</details>
<br/>

## 6.react-query

- react-query란?
  - React Application에서 서버의 상태를 불러오고, 캐싱하며 **지속적으로 동기화**하고 업데이트 하는 작업을 도와주는 라이브러리
- 등장 배경
  - react에서는 서버에서 데이터를 가져오고 업데이트하는 명확한 방법을 제공하지 않음. 개발자가 hooks(useEffect로 fetch)를 이용해서 직접 개발하거나 redux같은 라이브러리를 사용.
  - 서버 상태(서버에서 받아오는 데이터)의 특징
    - client에서 제어하거나 소유하지 않는 원격의 공간에서 관리되고 유지됨
    - fetch, update를 위한 API가 필요
    - 신경을 쓰지 않으면 오래된 상태로 방치됨
  - 서버 상태를 store에서 관리하게 되면 아래와 같은 도전과제
    - 데이터가 오래되었는지 어떻게 알 수 있나?
    - 여기 저기서 중복된 요청을 하나로 최적화할 수 있을까?
    - 메모리 관리 측면
    - 최대한 빠른 데이터 업데이트를 어떻게 할 수 있을 것인가?
- 특징
  - 옵션을 제공해서 직접 만들지 않고도 react-query를 통해서 짧은 코드로 대체 가능
    - isLoading, onSuccess, onError,,등
  - 프로젝트 구조가 기존보다 단순해져 애플리케이션을 유지 보수하기 쉽고, 새로운 기능을 쉽게 구축할 수 있다.
  - 캐싱을 효율적으로 관리
  - 여러번 같은 데이터 요청시, 한번만 처리

## 7. redux

- redux란
  - 자바스크립트 애플리케이션에서 상태를 효율적으로 관리할 수 있게 도와주는 도구
- 등장 배경
  - 앱의 규모가 커짐에 따라 MVC패턴의 양방향(모델변경시 뷰도 변경, 뷰 변경시 컨트롤러도 변경 등) 데이터 흐름의 단점을 해소하기 위해 생김.
    - 규모가 커지면 데이터의 흐름을 이해하기 어려워지고 버그찾기 어려워짐
  - 이에 대한 대안으로 Flux 단방향 데이터 흐름 패턴 개발됨
  - React + Flux 구조 + Reducer(데이터 변경 시켜줌) ⇒ Redux가 등장.
- redux의 3원칙
  - **_Single source of truth_**
    - 모든 상태는 하나의 스토어 안에 하나의 트리 구조로 저장됨. 모든 데이터의 원천은 store.
  - **_State is read-only_**
    - 상태는 읽기 전용이다.
    - 데이터의 변경은 reducer만이 한다.
  - **_Changes are made with pure functions_**
    - **_순수 함수_** 는 외부의 상태를 변경하지 않으면서 동일한 인자에 대해 항상 똑같은 값을 리턴하는 **_함수(외부 상태를 변경하지 않는 함수)_**
      - 순수 reducer에서 특징
        - 반드시 이전 상태, action을 매개변수로함
        - 이전의 값을 변경시키지 않고 새로운 데이터를 만들어 반환 (불변성)
- 장점 및 특징
  - 상태 값을 컴포넌트에 종속시키지 않고, 상태관리를 바깥에서 할 수 있게 해줌.
  - redux dev tool이 있어서 디버깅이 유리
  - state가 바뀌면 해당 state를 바라보고 있는 컴포넌트는 모두 리렌더링됨.
  - redux의 데이터 흐름은 단방향으로, `view`에서 `Dispatch`라는 함수를 통해 `action`(바뀔 데이터)이 운반되고 `reducer`에 정의된 로직에 따라 `store의 state`가 변화하고 그 `state`를 쓰는 `view`가 변함
- 단점
  - 초기에 코드작성이 복잡하다 몇 개의 파일(dispatcher, reducer,,)들을 필수로 만들어야하여 코드량이 늘어남.
