/*
- Routing : 클라이언트의 요청 조건(메서드, 주소 등)에 대응해 응답하는 방식
- Router : 클라이언트의 요청을 쉽게 처리할 수 있게 도와주는 Express.js 기본 기능 중 하나

- 구조
router.METHOD(PATH, HANDLER);
ㄴ router : express의 라우터를 정의학 위해 사용
ㄴ METHOD : HTTP Method를 나타냄 (ex. get, post, put, delete...)
ㄴ PATH : 실제 서버에서 API를 사용하기 위한 경로
ㄴ HANDLER : 라우트가 일치할 때 실행되는 함수
*/

const express = require('express');
const router = express.Router();

const Goods = require('../Schemas/goods');
const Cart = require('../Schemas/carts');

// localhost:3000/api  -> GET
router.get('/', (req, res) => res.send('default url for goods.js get Method'));

// localhost:3000/api/about -> GET
router.get('/about', (req, res) => res.send('goods.js about PATH'));

// goods DB JSON
const goods = [
    {
        goodsId: 4,
        name: "상품 4",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
        category: "drink",
        price: 0.1,
    },
    {
        goodsId: 3,
        name: "상품 3",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
        category: "drink",
        price: 2.2,
    },
    {
        goodsId: 2,
        name: "상품 2",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
        category: "drink",
        price: 0.11,
    },
    {
        goodsId: 1,
        name: "상품 1",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
        category: "drink",
        price: 6.2,
    },
];

// localhost:3000/api/goods -> GET
router.get('/goods', (req, res) => res.json({ goods: goods }));

// localhost:3000/api/goods/1 -> GET
router.get('/goods/:goodsId', (req, res) => {
    const { goodsId } = req.params;
    const [detail] = goods.filter((goods) => Number(goodsId) === goods.goodsId);
    res.json({ detail });
})

router.post('/goods', async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;
    const goods = await Goods.find({ goodsId });
    if (goods.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }
    const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });
    res.json({ goods: createdGoods });
})

// 장바구니 조회 API
router.get('/goods/carts', async (req, res) => {
    const carts = await Cart.find({});
    const goodsIds = carts.map((cart) => cart.goodsIds);
    
    const goods = await Goods.find({ goodsId: goodsIds });

    const results = carts.map((cart) => {
        return {
            quantity: cart.quantity,
            goods: goods.find((item) => item.goodsId === cart.goodsId)
        };
    });
    res.json({
        carts: results,
    })
})

router.post("/goods/:goodsId/carts", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (existsCarts.length) {
        return res.json({ success: false, errorMessage: "이미 장바구니에 존재하는 상품입니다." });
    }

    await Cart.create({ goodsId: Number(goodsId), quantity: quantity });

    res.json({ result: "success" });
});

router.put("/goods/:goodsId/carts", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
        res.status(400).json({ errorMessage: "수량은 1 이사잉어야 합니다." });
        return;
    }

    const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (existsCarts.length) {
        await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
    }

    res.json({ success: true });
})

router.delete("/goods/:goodsId/carts", async (req, res) => {
    const { goodsId } = req.params;

    const existsCarts = await Cart.find({ goodsId });
    if (existsCarts.length > 0) {
        await Cart.deleteOne({ goodsId });
    }

    res.json({ result: "success" });
});

module.exports = router;