
import {getToday} from "./utils.js";

export function isEmailValid(str){
    if(str === '') return false;
    if(!str.includes('@')) return false;
    
    return true;
}

export function getWelcomeTemplate({ name, age, school }){
    const mytemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}</div>
                <div>학교: ${school}</div>
                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `
    return mytemplate;
}

export function sendEmail(email, result){
    console.log(`${email}님께 발송..
    ${result}`);
}