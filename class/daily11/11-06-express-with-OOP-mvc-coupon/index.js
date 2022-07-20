import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js"
import { BoardController } from "./mvc/controllers/board.controller.js";
import { TokenController } from "./mvc/controllers/token.controller.js";

const app = express();

//상품 API
const productController = new ProductController();
app.post('/products/buy', productController.buyProduct) // 상품 구매하기 API
app.post('/products/refund', productController.refundProduct) // 상품 환불하기 API

// 쿠폰(상품권) API
const couponController = new CouponController();
app.post("/coupons/buy", couponController.buyCoupon) // 쿠폰(상품권) 구매하기


//게시판 API
const boardController = new BoardController();
app.post("/boards", boardController.createBoard)
app.get("/boards", boardController.fetchBoard)


//토큰 API
const tokenController = new TokenController();
app.post("/token", tokenController.postToken)
app.get("/token", tokenController.getToken);

app.listen(3000);