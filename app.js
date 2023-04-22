const express = require('express');
const app = express();
const port = 3000;

const goodsRouter = require("./routes/goods.js");
const cartsRouter = require("./routes/carts.js");
const usersRouter = require("./routes/users.js");
const authRouter = require("./routes/auth.js");

const connect = require("./schemas");
connect();


app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("assets"));

app.use("/api", [goodsRouter, cartsRouter, usersRouter, authRouter]);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});


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