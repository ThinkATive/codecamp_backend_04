
function checkResidentNumber(info){
    if(!info.includes('-')) return false;
    if(info.length !== 14) return false;
    if(info.indexOf('-') !== 6) return false;
    return true;
}

export function checkInfoValidation({email, residentNumber, phoneNumber}){
    
    // 이메일 체크
    let emailValid = true;
    if(email === undefined || !email.includes('@')){
        console.log("이메일이 정확하지 않습니다.");
        emailValid = false;
    }
    
    // 주민번호 체크
    let residentNumberValid = true;
    if(!checkResidentNumber(residentNumber)){
        console.log("주민등록번호가 정확하지 않습니다.");
        residentNumberValid = false;
    }

    // 핸드폰 번호 체크
    let phoneNumberValid = true;
    if(phoneNumber.length !== 12 && phoneNumber.length !== 13){
        console.log("핸드폰 번호가 정확하지 않습니다.");
        phoneNumberValid = false;
    }

    return emailValid && residentNumberValid && phoneNumberValid;
}

export function mosaicNumber(number, startNum){
    let temp = number.split('');
    temp.fill('*', startNum);
    return temp.join('');
}



export function getWelcomeTemplate({name, email, favSite}, mosaicResidentNumber, mosaicPhoneNumber){
    const mytemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이메일: ${email}</div>
                <div>주민번호: ${mosaicResidentNumber}</div>
                <div>휴대폰 번호: ${mosaicPhoneNumber}</div>
                <div>내가 좋아하는 사이트: ${favSite}}</div>
            </body>
        </html>
    `
    return mytemplate;
}

export function sendWelcomeEmail(result){
    console.log(result);
}