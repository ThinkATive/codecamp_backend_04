function createTokenOfPhone(phoneNum, maxi){
    //1. 휴대폰 번호 자릿수 맞는지 확인하기
    if(phoneNum.length !== 11 && phoneNum.length !== 10){
        console.log("error! check the phone number");
        return;
    }


    //2. 핸드폰 토큰 6자리 만들기
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

    
    //3. 핸드폰 번호에 토큰 전송하기
    console.log(result + " token number send to " + phoneNum);

}

console.log(createTokenOfPhone("01012345678", 6));