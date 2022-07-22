export class TokenController{
    getToken = (req, res) => {
        const result = [
            { phone : "010123123"},
            { phone : "010123123"},
            { phone : "010123123"},
            { phone : "010123123"}
        ]
        
        res.send(result);
    }

    postToken = (req, res) => {
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
    }
}