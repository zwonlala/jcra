# jcra(jiwon-create-react-app)


## 강의 정리


### [1. NPM](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)


#### FE 개발에 Node.js 가 필요한 이유.

- 최신 스펙으로 개발할 수 있다
	- JS 발전 속도 > 브라우져 지원 속도.
	- 바벨, 웹팩, NPM 등은 Node.js 기반으로 만들어짐
	- TS, SASS 사용하려면 전용 트랜스파일러 필요한데, Node.js 환경 기반
- 빌드 자동화가 가능
	- 배포 전 '파일 압축', '코드 난독화(uglify?)', '폴리필 추가' 등 할 과정이 많다. -> Node.js 가 이해하는데 도움됨
	- 라이브러리 의존성 해결
	- 테스트 자동화
- 개발 환경 커스터마이징
	- CRA, vue-cli 등이 있으나 커스터마이징 하기엔 좋지 않음
	- 커스터마이징 하려면 Node.js 이해해야 함
		- 자동 주행 자동차 일본 건너간 예시

### 설치

는 알아서...


### 프로젝트 초기화

- npm init
	- npm init -y

- package.json : Node.js는 프로젝트의 모든 정보를 package.json 파일에 기록(메타 정보 너낌).  

<details>
<summary>package.json 각 항목 설명</summary>

- name: 프로젝트 이름
- version: 프로젝트 버전 정보
- description: 프로젝트 설명
- main: 노드 어플리케이션일 경우 진입점 경로. 프론트엔드 프로젝트일 경우 사용하지 않는다.
- scripts: 프로젝트 명령어를 등록할 수 있다.초기화시 test 명령어가 샘플로 등록되어. 있다
- author: 프로그램 작성자
- license: 라이센스
</details>


- 커스텀으로 등록한 명령어는 run 추가하여 실행


### 패키지 설치

1. CDN 사용
	- 단> CDN 서버 장애나면 정상 동작 못함
2. 직접 다운로드
	- 단> 라이브러리 업데이트 시 매번 다운로드 번거롭 + 버젼 하위 호환성 여부 확인 어려움
3. NPM 이용
	- 편안    

![편안](data:image/jpeg;base64,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)

npm install 


#### 유의적 버젼(Semetic Version)

주(Major), 부(Minor), 수(Patch) 세 가지 숫자를 조합하여 버젼을 관리

- 주 버젼 : 기존 버젼과 **호환되지 않게** 변경한 경우
- 부 버젼 : 기존 버젼과 **호환**되면서 **기능이 추가**된 경우
- 수 버젼 : 기존 버젼과 **호환**되면서 **버그 수정**한 경우

#### 버젼의 범위

- 특정 버젼
```
1.2.3
```

- 특정 버젼 보다 높거나 낮은 경우
```
>1.2.3
>=1.2.3
<1.2.3
<=1.2.3
```

- 틸드(~)
```
~1.2.3
```
마이너 버젼(부)이 명시되어 있으면, 패치 버젼만 변경

ex) ~1.2.3   
1.2.3 부터 1.3.0 미만까지


마이너 버젼이 없으면 마이너 버젼을 갱신

ex) ~0   
0.0.0 부터 1.0.0 미만까지


- 캐럿(^)
```
^1.2.3
```

정식 버젼에서 마이너 버젼(부)과 패치 버젼(수)을 변경

ex) ^1.2.3   
1.2.3부터 2.0.0 미만 까지

정식버젼 전인  0.x 버전은 패치 버젼만 갱신
(∵ 정식 릴리즈 전에는 패키지 버젼이 수시로 변하고, 마이너 버젼(부)이 변경되어도 하위호환성을 지키지 않은 경우 빈번)

ex) ^0.0  

0.0.0부터 0.1.0 미만 까지

<br>
<br>
<br>
<br>

### 2.Webpack _(basic)_

<br>
<br>
<br>
<br>

### [3. Babel](https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html)

'바벨'은 '바벨탑'의 '바벨'임.  
즉, 서로 언어가 달라 실패한 바벨탑 처럼,  

브라우져는 각기 다른 언어(및 버젼)을 지원하는데 이 문제(크로스 브라우징)를 해결해주는 라이브러리가 바로 **"바벨"**

<br>

> **크로스 브라우징**  
'웹 페이지 제작 시에 모든 브라우져에서 깨지지 않고 의도한 대로 올바르게(호환성) 나오게 하는 작업'.  
모든 브라우저에서 ~_똑같이 보이게_~ 🙅‍♂️    
모든 브라우저에서 _동등한 수준의 정보, 기능적 접근_ 🙆‍♂️


#### => 정리 : 
- 크로스 브라우징 문제를 해결해주는 것이 '바벨'
- ES2015 이상으로 구현된 코드를 모든 브라우져에서 동작하도록 호환성을 지켜줌
- (TS, JSX 포함)

<br>

> **트랜스파일**
코드를 '크로스 브라우징' 문제를 해결하기 위해 변환하는 것  
트랜스파일 !== 빌드  
(∵ 트랜스파일 후에도 코드를 읽을 수 있도록 추상화 수준을 유지한다)   
<br>
<br>

### [4. Lint](https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html)

![lint](https://media.vlpt.us/images/jewoo/post/5190e533-e37c-417d-ac12-7a80859c30ac/lint.jpg)

위 옷의 거슬리는 것들이 '린트(보푸라기)'임

코드로 예를 들면

- 들여쓰기 2칸? 4칸?
- 문자열 'str'? "str"?
- ...

보푸라기가 존재해도 사용에는 문제가 없고? 보기게 거슬리는 옷과 달리,
코드는 보기에 좋지 않고 끝이 아니라 
- 가독성 떨어짐
- 유지보수 하기 힘들어짐
- 생산성 저하...

와 같은 치명적인? 문제를 일으킴

그래서 
- 코드의 오류 / 버그
- 코드의 스타일(포맷?)

등을 점검하는 것을 린트 혹은 린터라고 함




<br>
<br>
<br>
<br>

### 5.Webpack _(expert)_


<br>
<br>
<br>
<br>

### 참고문서
- 김정환 블로그 👍👍👍👍👍 
  - https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html
  - https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html
  - https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html
  - https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html

- 크로스 브라우징
  - https://mulder21c.github.io/2019/01/30/what-is-cross-browsing/ 👍 
  - https://okayoon.tistory.com/entry/%ED%81%AC%EB%A1%9C%EC%8A%A4-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A7%95cross-browsing