//const express = require('express')

import express from 'express';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/boards', (req, res) => {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기.
  const result = [
    { number : 1,
      writer : "철수",
      title : "제목",
      contents : "내용" },
    
    { number : 2,
      writer : "짱구",
      title : "제목 짱구",
      contents : "내용 짱구" },
    
    { number : 3,
      writer : "훈이",
      title : "제목 훈이",
      contents : "내용 훈이" }
    
  ];
  // 2. 꺼내온 결과 응답 주기.
  res.send(result);
})

app.post('/boards', (req, res) => {
  console.log(req.body.writer);
  console.log(req.body.title);
  console.log(req.body.contents);
  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기.
  
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

//서버프로그램(포트번호 [0 ~ 65535])
app.listen(port, () => {
  console.log(`프로그램을 켜는데 성공했어요!!!`);
})