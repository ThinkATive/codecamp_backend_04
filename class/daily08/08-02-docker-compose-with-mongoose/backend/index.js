//const express = require('express')

import express from 'express';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import { isEmailValid, getWelcomeTemplate, sendEmail } from './email.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import cors from 'cors';
import mongoose from 'mongoose';
import { Board } from './models/board.model.js';

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get('/boards', async (req, res) => {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기.
  // const result = [
  //   { number : 1, writer : "철수", title : "제목", contents : "내용" },
  //   { number : 2, writer : "짱구", title : "제목 짱구", contents : "내용 짱구" },
  //   { number : 3, writer : "훈이", title : "제목 훈이", contents : "내용 훈이" }
  // ];

  const result = await Board.find()


  // 2. 꺼내온 결과 응답 주기.
  res.send(result);
})

app.post('/boards', async (req, res) => {
  console.log(req.body.writer);
  console.log(req.body.title);
  console.log(req.body.contents);

  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기.
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents
  })

  await board.save();

  // 2. 저장 결과 응답 주기.
  res.send("게시물 등록에 성공하였습니다!!");
})

app.post('/tokens/phone', (req, res) =>{
  //1. 휴대폰 번호 자릿수 맞는지 확인하기
  const phone = req.body.phoneNum;
  const isValid = checkValidationPhone(phone);

  if(!isValid) {
      return;
  }

  //2. 핸드폰 토큰 6자리 만들기
  const token = getToken(6);

  //3. 핸드폰 번호에 토큰 전송하기
  sendTokenToSMS(phone, token);
  res.send("인증완료!!!");
})

app.post("/users", (req, res) => {
  const { email, name, age, school } = req.body.myuser;

  // 1. 이메일 정상인지 확인(1- 존재여부, 2- @가 있는지)
  if(!isEmailValid(email)) return console.log("이메일 오류!");
  else{
      // 2. 가입환영 템플릿 만들기
      const result = getWelcomeTemplate({name, age, school});
  
      // 3. 이메일에 가입환영 템플릿 전송하기
      sendEmail(email, result);
      res.send("가입완료!!");
  }
})

// 몽고 DB 접속!
mongoose.connect("mongodb://my-database:27017/mydocker04");


// Backend API 서버 오픈!
app.listen(port, () => {
  console.log(`프로그램을 켜는데 성공했어요!!!`);
})
//서버프로그램(포트번호 [0 ~ 65535])
