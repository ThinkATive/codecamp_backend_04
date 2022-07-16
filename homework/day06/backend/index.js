
import express from 'express';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import { isEmailValid, getWelcomeTemplate, sendEmail } from './email.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swagger/config.js'
import cors from 'cors';

const port = 3000
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get('/users', (req, res) => {
    const userExampleData = [
        { 
            email : "aaa@gmail.com", 
            name : "철수",
            phone : "010-1234-5678",
            personal : "220110-2222222",
            prefer : "https://daum.com" },
        { 
            email : "bbb@naver.com", 
            name : "영희",
            phone : "010-3453-1235",
            personal : "846324-7324563",
            prefer : "https://hanmail.net" },
        { 
            email : "ccc@daum.com", 
            name : "덕수",
            phone : "010-5342-9877",
            personal : "063469-0749635",
            prefer : "https://naver.com" },
        { 
            email : "ddd@hanmail.net", 
            name : "인재",
            phone : "010-1235-8543",
            personal : "120395-9885357",
            prefer : "https://google.com" },
        { 
            email : "eee@gmail.com", 
            name : "나두",
            phone : "010-1276-3457",
            personal : "096392-6096352",
            prefer : "https://naver.com" }
    ]
    res.send(userExampleData);
})

app.get('/starbucks', (req, res) => {
    const coffeeExampleData = [
        { name: '아메리카노', kcal: 5 },
        { name: '카페라떼', kcal: 23 },
        { name: '콜드부르', kcal: 76 },
        { name: '카페모카', kcal: 57 },
        { name: '돌체라떼', kcal: 25 },
        { name: '카라멜라떼', kcal: 96 },
        { name: '바닐라라떼', kcal: 12 },
        { name: '에스프레소', kcal: 63 },
        { name: '디카페인', kcal: 93 },
        { name: '오트라떼', kcal: 152 }
    ]

    res.send(coffeeExampleData);
})

app.post('/tokens/phone', (req, res) => {
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

app.post('/user/info', (req, res) => {
    const { userName, userPersonalNumber, userPhoneNumber,
        userPreferSite, userPassword, userEmail } = req.body;

    // 1. 이메일 정상인지 확인(1- 존재여부, 2- @가 있는지)
    if(!isEmailValid(userEmail)) return console.log("이메일 오류!");
    else{
        // 2. 가입환영 템플릿 만들기
        const result = getWelcomeTemplate({userName, userPhoneNumber, userPreferSite});

        // 3. 이메일에 가입환영 템플릿 전송하기
        sendEmail(userEmail, result);
        res.send("가입완료!!");
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})