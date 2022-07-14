import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
// const { checkValidationPhone, getToken, sendTokenToSMS } = require("./phone.js")

function createTokenOfPhone(phoneNum, maxi){
    //1. 휴대폰 번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(phoneNum);

    if(!isValid) {
        return;
    }

    //2. 핸드폰 토큰 6자리 만들기
    const token = getToken(maxi);

    //3. 핸드폰 번호에 토큰 전송하기
    sendTokenToSMS(phoneNum, token);
    
}

console.log(createTokenOfPhone("01012345678", 6));