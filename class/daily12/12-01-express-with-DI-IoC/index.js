import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js"
import { BoardController } from "./mvc/controllers/board.controller.js";
import { TokenController } from "./mvc/controllers/token.controller.js";
import { CashService } from "./mvc/controllers/services/cash.js";
import { ProductService } from "./mvc/controllers/services/product.js";
import { PointService } from "./mvc/controllers/services/point.js";

const app = express();

// 서비스 의존성들
const cashService = new CashService();
const productService = new ProductService(); // new 한번으로 모든 곳에서 재사용 가능 (싱글톤패턴)
const pointService = new PointService(); //쿠폰 구매 방식이 포인트결제로 변경됨

//상품 API
const productController = new ProductController(cashService, productService);
app.post('/products/buy', productController.buyProduct) // 상품 구매하기 API
app.post('/products/refund', productController.refundProduct) // 상품 환불하기 API

// 쿠폰(상품권) API
const couponController = new CouponController(cashService); //pointService;
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