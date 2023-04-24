// const express = require('express');
// const app = express();
// const PORT = 3000;

// const connect = require('./schemas');
// const goodsRouter = require('./routes/goods');
// const cartsRouter = require('./routes/carts');

// connect();

// app.use(express.json());  // post, put 전달된 body 데이터를 req.body로 사용할 수 있도록 만든 body-parser

// app.use((req, res, next) => {   // 밑에 있는 Router 미들웨어 위에 있어야 함
//   console.log('Request URL: ', req.originalUrl, ' - ', new Date());
//   next();
// });

// app.use((req, res, next) => {   // 밑에 있는 Router 미들웨어 위에 있어야 함
//   console.log('첫번째 미들웨어');
//   next();
// });

// app.use((req, res, next) => {   // 밑에 있는 Router 미들웨어 위에 있어야 함
//   console.log('두번째 미들웨어');
//   next();
// });

// app.use((req, res, next) => {   // 밑에 있는 Router 미들웨어 위에 있어야 함
//   console.log('세번째 미들웨어');
//   next();
// });

// // app.use('/api', [goodsRouter, cartsRouter]);  // API가 사용되기 위한 라우터 등록
// app.use('/api', [goodsRouter]);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(PORT, '포트로 서버가 열렸어요!');
// });