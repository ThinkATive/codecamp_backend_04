//const express = require('express')

import express from 'express';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import cors from 'cors';
import mongoose from 'mongoose';
import { Phone } from './models/token.model.js';

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get('/tokens/phone', async (req, res) => {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기.

  const result = await Phone.find()

  // 2. 꺼내온 결과 응답 주기.
  res.send(result);
})

app.post('/tokens/phone', async (req, res) =>{
  // 1. 입력된 휴대폰 번호 받아오기
  const getPhone = req.body.phone;
  
  // 2. DataBase에서 핸드폰 번호 유무 판단
  Phone.findOne({phone:getPhone}, async (err, phoneData) => {
    if(err) res.send(err);
    else if(phoneData === null){
      // 3. 핸드폰 번호가 없다면 번호 확인
      const isValid = checkValidationPhone(getPhone);
    
      if(!isValid) {
          return res.send("잘못된 번호");
      }

      // 4. 핸드폰 토큰 6자리 만들기
      const token = getToken(6);
    
      // 5. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기.
      const phone = new Phone({
        token: token,
        phone: getPhone,
        isAuth: false
      })
      await phone.save();
      
      // 6. 핸드폰 번호에 토큰 전송하기
      sendTokenToSMS(getPhone, token);
      const sendPhone = `${getPhone.substr(0,3)}-${getPhone.substr(3,4)}-${getPhone.substr(7,4)}`;
      res.send(`${sendPhone}으로 인증 문자가 전송되었습니다.`);
    }
    else {
      // 핸드폰 번호가 있다면 토큰 업데이트
      const token = getToken(6);

      await Phone.updateOne({phone:getPhone}, {token: token});

      res.send(`${token} token updated`);
    }
  })
})

app.patch('/tokens/phone', async (req, res) => {
  const getPhone = req.body.phone;
  const getToken = req.body.token;

  Phone.findOne({phone:getPhone}, async (err, phoneData) => {
    if(err) res.send(err);
    else if(phoneData === null){
      res.send("false");
    }
    else {
      if(phoneData.token !== getToken) {
        res.send("false");
      }
      else{
        await Phone.updateOne({phone:getPhone}, {isAuth: true});
        res.send("true");
      }
    }
  })
})

// 몽고 DB 접속!
mongoose.connect("mongodb://my-database:27017/mydocker04");


// Backend API 서버 오픈!
app.listen(port, () => {
  console.log(`프로그램을 켜는데 성공했어요!!!`);
})
//서버프로그램(포트번호 [0 ~ 65535])
