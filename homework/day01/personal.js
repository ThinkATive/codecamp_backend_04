export function getValidation(personalNumber){
    let isOk = true;
    let index;

    for(let i = 0 ; i < personalNumber.length; i++){
        if(personalNumber[i] === "-") {
            isOk = false;
            index = i;
            break;
        }
    }

    if(isOk) {
        console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
        return false;
    }
    if(index !== 6 || personalNumber.length !== 14){
        console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
        return false;
    }

    return true;
}

export function getMosaic(personalNumber){
    let temp = "";
    for(let i = 0 ; i < 8; i++){
        temp += personalNumber[i];
    }

    temp += "******";
    
    return temp;
}