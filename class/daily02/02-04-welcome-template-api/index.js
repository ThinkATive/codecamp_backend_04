
import {isEmailValid, getWelcomeTemplate, sendEmail} from './email.js';

function createUser({name, age, school, email}){
    // 1. 이메일 정상인지 확인(1- 존재여부, 2- @가 있는지)
    if(!isEmailValid(email)) return console.log("이메일 오류!");
    else{
        // 2. 가입환영 템플릿 만들기
        const result = getWelcomeTemplate({name, age, school});
    
        // 3. 이메일에 가입환영 템플릿 전송하기
        sendEmail(email, result);
    }
}

const name = "철수";
const age = 8;
const school = "다람쥐초등학교";
const email = "asdfa@sdf.com"
createUser({name, age, school, email});