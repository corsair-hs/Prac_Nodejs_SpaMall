# PRACTICE. SPA MALL

### RESTful API

### Middle Ware
  - Router / Middle Ware 차이
    * Router는 Middle Ware 기반으로 구현된 객체이므로 동일한 방식으로 작동함
  - Express.js Middle Ware 실행되는 경우
    * app.use(M/W) : 모든 요청에 미들웨어가 실행
    * app.use('/api', M/W) : api로 시작하는 요청에서 미들웨어가 실행
    * app.post('/api', M/W) : api로 시작하는 POST(외 HTTP Method) 요청에서 미들웨어가 실행

### 회원가입 기능 추가
  - cookie, JWT (jsonwebtoken, cookie-parser) 이용