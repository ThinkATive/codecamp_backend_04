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

export function sendTokenToSMS(phoneNum, result){
    console.log(result + " token number send to " + phoneNum);
}