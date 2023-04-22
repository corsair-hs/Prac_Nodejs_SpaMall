const express = require('express');
const router = express.Router();
const userSchema = require('../schemas/user.js');
const jwt = require('jsonwebtoken');

// 로그인 API
router.post('/auth', async(req, res) => {
   // 바디에서 이메일, 패스워드 불러옴
   const { email, password } = req.body;

   // User Tbl 에서 email값으로 유저 있는지 찾기 (먼저, 상단에 ../schemas/user.js 불러오는 코드 작성)
   const user = await userSchema.findOne({ email });

   // 1. 이메일에 일치하는 유저가 존재하지 않거나
   // 2. 유저를 찾았지만, 유저의 비밀번호와 입력한 비밀번호가 다를 때
   if (!user || user.password !== password) {
      res.status(400).json({ errorMessage: "로그인에 실패하였습니다." });
      return;  // 다음코드로 진행되지 않도록 막을거다.
   };

   // JWT 생성 (먼저, 상단에 jsonwebtoken 라이브러리 불러오는 코드 작성)
   // jwt.sign 통해 생성하며
   // 좌측에는 실제로 담을 데이터
   // 우측에는 어떤 비밀키를 이용해서 jwt를 만들건지 데이터
   const token = jwt.sign({ userId: user.userId }, "customized-secret-key");

   // cookie를 통해 Authorizatin을 전달을 할 건데
   // Bearer 형태로 token 값을 전달할 거다.
   // Bearer는 어떤 타입으로 전달을 하는건지 지정하는 것, 왜 사용하는건지 찾아볼 것
   res.cookie("Authorization", `Bearer ${token}`);

   // status(200) 전달
   res.status(200).json({ token });
});


module.exports = router;


/*

localhost:3000/api/auth

{
  "email": "raxniper@naver.com",
  "password": "qwer1234"
}

POST 요청 해보면

Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQzZGNjYmFjNjdjMWU4NTE3ZjQxZjYiLCJpYXQiOjE2ODIxNzUxOTd9.0uC-vuquE0MHRgKUyu6yXUdE73FXPr5l16MB5AJgDeI"
}

Cookies
Name : authorization
Value : Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQzZGNjYmFjNjdjMWU4NTE3ZjQxZjYiLCJpYXQiOjE2ODIxNzUxOTd9.0uC-vuquE0MHRgKUyu6yXUdE73FXPr5l16MB5AJgDeI
-> Value에 Bearer 형태의 값이 들어와있음

*/