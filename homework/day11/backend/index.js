//const express = require('express')

import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import { Starbucks } from './models/starbucksSchema.js';
import { Token } from './models/tokenSchema.js';
import { options } from './swagger/config.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { UserController } from './controllers/user.controller.js';

const port = 3000; // --------------------------------------- 포트 설정
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options))); // 씁하벅스 API Docs.


// ================= TOKENS / PHONE ** P O S T ** ==================== //
app.post('/tokens/phone', async (req, res) =>{
  const userPhoneNumber = req.body.phone; // -------------------------- 1. 입력된 휴대폰 번호 받아오기
  
  Token.findOne({phone:userPhoneNumber}, async (err, phoneData) => { // 2. DB에서 핸드폰 번호 유무 판단
    if(err) return res.status(422).send(err); //에러
    else if(phoneData === null){ // ----------------------------------- 3. DB에 중복된 번호가 없다면
      const isValid = checkValidationPhone(userPhoneNumber); // ------- 4. 핸드폰 번호 Valid 확인
      
      if(!isValid) return res.status(422).send("잘못된 번호입니다.");

      const newToken = getToken(6); // -------------------------------- 5. 핸드폰에 전송할 토큰 6자리 만들기
    
      const phone = new Token({ // ------------------------------------ 6. 데이터를 등록하는 로직 => DB에 데이터 저장하기.
        token: newToken,
        phone: userPhoneNumber,
        isAuth: false
      })
      await phone.save();
      
      sendTokenToSMS(userPhoneNumber, newToken); // ######실제로 보냄##### 7. 핸드폰 번호에 토큰 전송하기
      return res.send(`핸드폰으로 인증 문자가 전송되었습니다!`);
    }
    else { // ---------------------------------------------------------- BD에 동일한 핸드폰 번호가 있다면 토큰 업데이트
      const newToken = getToken(6);

      await Token.updateOne({phone:userPhoneNumber}, {token: newToken});

      return res.send(`토큰이 ${newToken}으로 업데이트 됐습니다!`);
    }
  })
})

// ================= TOKENS / PHONE ** P A T C H ** ==================== //
app.patch('/tokens/phone', async (req, res) => {
  const userPhoneNumber = req.body.phone; // ----------------------------- 1. 요청값 변수에 저장
  const userToken = req.body.token;

  Token.findOne({phone:userPhoneNumber}, async (err, phoneData) => { // -- 2. DB에서 핸드폰 번호 유무 판단
    if(err) return res.send(422, err); // 에러
    else if(phoneData === null || phoneData.token !== userToken){ // ----- 3. 핸드폰 번호가 없거나 토큰 번호가 틀림
      return res.status(422).send("false");
    }
    else { // ------------------------------------------------------------ 4. 둘 다 맞을 경우
      await Token.updateOne({phone:userPhoneNumber}, {isAuth: true}); // - 5. isAuth를 true로 업데이트
      return res.send("true");
    }
  })
})

// ================= USER ** G E T ** ====================== //
const userController = new UserController();
app.get('/user', userController.getUserData);

// ================= USER ** P O S T ** ====================== //
app.post('/user', userController.createUser);

// ================= STARBUCKS ** G E T ** ====================== //
app.get('/starbucks', async (req, res) => {
  const getStarbucksMenuInfo = await Starbucks.find(); // 1. 스타벅스 DB에서 데이터를 모두 가져옴

  return res.send(getStarbucksMenuInfo); // ------------- 2. 요청한 곳으로 보냄
})


// 몽고 DB 접속!
mongoose.connect("mongodb://my-database:27017/mydocker04");

// Backend API 서버 오픈!
app.listen(port, () => {
  console.log(`프로그램을 켜는데 성공했어요!!!`);
})