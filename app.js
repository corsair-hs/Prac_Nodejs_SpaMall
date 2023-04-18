const express = require('express');
const app = express();

const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const goodsRouter = require('./routes/goods');
app.use('/api', [goodsRouter]);

// const cartsRouter = require('./routes/carts');
// app.use('/api', [goodsRouter, cartsRouter]);

const connect = require('./schemas');
connect();

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});