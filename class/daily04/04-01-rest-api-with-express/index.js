//const express = require('express')

import express from 'express';


const app = express();
const port = 3000;

app.get('/aaa', (req, res) => {
  res.send('Hello World! 반가워요!');
})

// app.post('/qqq', (req, res) => {

// })

//서버프로그램(포트번호 [0 ~ 65535])ㅅ
app.listen(port, () => {
  console.log(`프로그램을 켜는데 성공했어요!!!`);
})