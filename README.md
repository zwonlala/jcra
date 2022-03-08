# jcra(jiwon-create-react-app)


## 강의 정리


### 1. NPM

<br>
<br>

### 2.Webpack _(basic)_

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

### 5.Webpack _(expert)_


<br>
<br>

### 참고문서
- 김정환 블로그 👍👍👍👍👍 
  - https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html
  - https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html
  - https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html

- 크로스 브라우징
  - https://mulder21c.github.io/2019/01/30/what-is-cross-browsing/ 👍 
  - https://okayoon.tistory.com/entry/%ED%81%AC%EB%A1%9C%EC%8A%A4-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A7%95cross-browsing