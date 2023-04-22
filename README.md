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

