//const express = require('express')

import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { isEmailValid, getWelcomeTemplate, sendEmail } from "./email.js";
import { Starbucks } from "./models/starbucksSchema.js";
import { Token } from "./models/tokenSchema.js";
import { User } from "./models/userSchema.js";
import { options } from "./swagger/config.js";
import { getOpenGraph } from "./scraping.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const port = 3000; // --------------------------------------- 포트 설정
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options))); // 씁하벅스 API Docs.

// ================= TOKENS / PHONE ** P O S T ** ==================== //
app.post("/tokens/phone", async (req, res) => {
  const userPhoneNumber = req.body.phone; // -------------------------- 1. 입력된 휴대폰 번호 받아오기

  Token.findOne({ phone: userPhoneNumber }, async (err, phoneData) => {
    // 2. DB에서 핸드폰 번호 유무 판단
    if (err) return res.status(422).send(err); //에러
    else if (phoneData === null) {
      // ----------------------------------- 3. DB에 중복된 번호가 없다면
      const isValid = checkValidationPhone(userPhoneNumber); // ------- 4. 핸드폰 번호 Valid 확인

      if (!isValid) return res.status(422).send("잘못된 번호입니다.");

      const newToken = getToken(6); // -------------------------------- 5. 핸드폰에 전송할 토큰 6자리 만들기

      const phone = new Token({
        // ------------------------------------ 6. 데이터를 등록하는 로직 => DB에 데이터 저장하기.
        token: newToken,
        phone: userPhoneNumber,
        isAuth: false,
      });
      await phone.save();

      sendTokenToSMS(userPhoneNumber, newToken); // ######실제로 보냄##### 7. 핸드폰 번호에 토큰 전송하기
      return res.send(`핸드폰으로 인증 문자가 전송되었습니다!`);
    } else {
      // ---------------------------------------------------------- BD에 동일한 핸드폰 번호가 있다면 토큰 업데이트
      const newToken = getToken(6);

      await Token.updateOne({ phone: userPhoneNumber }, { token: newToken });

      return res.send(`토큰이 ${newToken}으로 업데이트 됐습니다!`);
    }
  });
});

// ================= TOKENS / PHONE ** P A T C H ** ==================== //
app.patch("/tokens/phone", async (req, res) => {
  const userPhoneNumber = req.body.phone; // ----------------------------- 1. 요청값 변수에 저장
  const userToken = req.body.token;

  Token.findOne({ phone: userPhoneNumber }, async (err, phoneData) => {
    // -- 2. DB에서 핸드폰 번호 유무 판단
    if (err) return res.send(422, err); // 에러
    else if (phoneData === null || phoneData.token !== userToken) {
      // ----- 3. 핸드폰 번호가 없거나 토큰 번호가 틀림
      return res.status(422).send("false");
    } else {
      // ------------------------------------------------------------ 4. 둘 다 맞을 경우
      await Token.updateOne({ phone: userPhoneNumber }, { isAuth: true }); // - 5. isAuth를 true로 업데이트
      return res.send("true");
    }
  });
});

// ================= USER ** G E T ** ====================== //
app.get("/user", async (req, res) => {
  const getUserInfo = await User.find(); // 1. 유저DB에서 모든 데이터를 가져옴

  return res.send(getUserInfo); // -------- 2. 요청한 곳으로 보냄
});

// ================= USER ** P O S T ** ====================== //
app.post("/user", async (req, res) => {
  //////////////////////////////////////////////////////////////////////// 1. 유저 정보 가져오기
  const userName = req.body.name; // 이름
  const userEmail = req.body.email; // 이메일
  const userPersonalNumber = req.body.personal; // 주민등록번호 ( 뒷자리 모자이크 )
  const userPreferSite = req.body.prefer; // 좋아하는 사이트
  const userPassword = req.body.pwd; // 비밀번호
  const userPhoneNumber = req.body.phone; // 핸드폰 번호
  const preferSiteOGInfo = await getOpenGraph(userPreferSite); // 좋아하는 사이트 OpenGraph
  ////////////////////////////////////////////////////////////////////////
  const userPersonalNumberMosaic = userPersonalNumber
    .substr(0, 7)
    .padEnd(14, "*"); //주민번호 모자이크

  Token.findOne({ phone: userPhoneNumber }, async (err, phoneData) => {
    // --- 2. DB에서 핸드폰 번호로 Auth true 판단
    if (err) return res.status(422).send(err); //에러
    else if (phoneData === null)
      return res
        .status(422)
        .send("등록되지 않은 핸드폰 번호 입니다."); // DB에 없는 핸드폰일 때
    else if (phoneData.isAuth) {
      // ---------------------------------------- 3. Auth: true 일 때 (토큰인증 했을 때)
      if (!isEmailValid(userEmail)) return res.status(422).send("이메일 오류!"); // 4. 이메일 정상인지 확인(1. 존재여부, 2. @가 있는지)

      const userInfo = new User({
        // ------------------------------------- 5. DB에 유저 정보 등록
        og: preferSiteOGInfo,
        name: userName,
        email: userEmail,
        personal: userPersonalNumberMosaic,
        prefer: userPreferSite,
        pwd: userPassword,
        phone: userPhoneNumber,
      });
      await userInfo.save();

      const result = getWelcomeTemplate({
        userName,
        userPhoneNumber,
        userPreferSite,
      }); // 6. 가입환영 템플릿 만들기

      sendEmail(userEmail, result); // ############실제로 보냄############# 7. 이메일에 가입환영 템플릿 전송하기

      User.findOne({ phone: userPhoneNumber }, (_, userData) => {
        // ------- 8. DB에 등록된 유저 _id 보내기
        return res.send(userData._id);
      });
    } else
      return res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다."); // isAuth : false일 때
  });
});

// ================= STARBUCKS ** G E T ** ====================== //
app.get("/starbucks", async (req, res) => {
  const getStarbucksMenuInfo = await Starbucks.find(); // 1. 스타벅스 DB에서 데이터를 모두 가져옴

  return res.send(getStarbucksMenuInfo); // ------------- 2. 요청한 곳으로 보냄
});

// 몽고 DB 접속!
mongoose.connect("mongodb://my-database:27017/mydocker04");

// Backend API 서버 오픈!
app.listen(port, () => {
  console.log(`프로그램을 켜는데 성공했어요!!!`);
});
