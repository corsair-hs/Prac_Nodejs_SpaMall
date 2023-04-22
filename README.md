# PRACTICE. SPA MALL

### RESTful API

### Middle Ware
   - Router / Middle Ware 차이
      * Router는 Middle Ware 기반으로 구현된 객체이므로 동일한 방식으로 작동함
   - Express.js Middle Ware 실행되는 경우
      * app.use(M/W) : 모든 요청에 미들웨어가 실행
      * app.use('/api', M/W) : api로 시작하는 요청에서 미들웨어가 실행
      * app.post('/api', M/W) : api로 시작하는 POST(외 HTTP Method) 요청에서 미들웨어가 실행

### 회원가입 기능 구현
   1. 로직 정리
      - email, nickname, password, confirmPassword를 전달받음
      - password, confirmPassword 동일한지 검증
      - email, nickname DB 중복 검증
      - email, nickname, password DB에 저장 (비밀번호는 향후 crypto lib 통해 단방향 암호화 할 것)
      - member join in success!

### 로그인 기능 구현
   1. 로직 정리
      - email, password 전달 받음
      - email 에 해당하는 사용자가 DB에 존재하는지 검증
      - 사용자가 존재하지 않거나, 사용자와 입력받은 password가 일치하는지 검증
      - JWT 생성 후 cookie 및 body로 클라이언트에게 전달
      - 로그인 성공
   2. JWT 토큰 구성 에시
      ``` javascript
      const token = jwt.sign({ userId: user.userId }, "customized-secret-key");
      ```
   3. 응답 값 예시
      ``` javascript
      res.cookie("Authorization", "Bearer " + "JWT로 만들어진 토큰을 반환하게 해보세요!");
      res.status(200).json({ token: "JWT로 만들어진 토큰을 반환하게 해보세요!" });
      ```
   4. 추가 정보
      - 로그인 기능을 왜 auth.js 로 명명했나?   
         Authenticate를 줄인 단어이며,   
         프론트엔드에서도 로그인 기능을 auth로 구현했기에 통일하기 위함
      - 로그인을 왜 POST 요청으로 처리했나?   
         GET 요청은 데이터가 URL에 노출이 되기 때문에 보안 취약   
         REST API 관점에서 보았을 때,   
         인증 정보를 "생성"해서 받아온다고 보면 POST 요청이 적합
