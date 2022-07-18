import coolsms from 'coolsms-node-sdk';
import 'dotenv/config';

export function checkValidationPhone(phoneNum){
    if(phoneNum.length !== 11 && phoneNum.length !== 10){
        console.log("error! check the phone number");
        return false;
    }
    else return true;
}

export function getToken(maxi){
    if(maxi === undefined || maxi === null){
        console.log("error!! input a number!");
        return;
    } else if(maxi <= 0){
        console.log("error!! input a number higher!");
        return;
    }
    else if(maxi > 10){
        console.log("error!! input a number lower!");
        return;
    }
    
    const result = String(Math.floor(Math.random() * (10 ** maxi))).padStart(maxi, '0');
    return result;
}

export async function sendTokenToSMS(phoneNum, result){
    const SMS_KEY = process.env.SMS_KEY;
    const SMS_SECRET = process.env.SMS_SECRET;
    const SMS_SENDER = process.env.SMS_SENDER;

    const mysms = coolsms.default;
    const messageService = new mysms(SMS_KEY, SMS_SECRET);
    const response = await messageService.sendOne({
        to : phoneNum,
        from: SMS_SENDER,
        text: `[코드캠프] 안녕하세요? 요청하신 인증번호는 [${result}]입니다.`
    })
    console.log(response);
 
 
 
    // console.log(result + " token number send to " + phoneNum);
}