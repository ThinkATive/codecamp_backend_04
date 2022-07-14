function checkValidationPhone(phoneNum){
    if(phoneNum.length !== 11 && phoneNum.length !== 10){
        console.log("error! check the phone number");
        return false;
    }
    else return true;
}

function getToken(maxi){
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

function sendTokenToSMS(phoneNum, result){
    console.log(result + " token number send to " + phoneNum);
}


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