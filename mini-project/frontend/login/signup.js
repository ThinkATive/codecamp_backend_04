
// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex';
  
  // 1. 입력한 휴대폰 번호 가져오기
  const myPhone = document.getElementById("PhoneNumber01").value +
                  document.getElementById("PhoneNumber02").value +
                  document.getElementById("PhoneNumber03").value;
  
  // 2. 해당 휴대폰 번호로 인증번호 API 요청하기
  axios.post("http://localhost:3000/tokens/phone", { phone : myPhone }).then((res) => {
      console.log(res);
  })
  console.log('인증 번호 전송')
}

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const myPhone = document.getElementById("PhoneNumber01").value +
                  document.getElementById("PhoneNumber02").value +
                  document.getElementById("PhoneNumber03").value;
  const myToken = document.getElementById("TokenInput").value;
  
  axios.patch("http://localhost:3000/tokens/phone", {phone: myPhone, token: myToken}).then((res) => {
    console.log(res.data);
  })
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const userName = document.getElementById("SignupName").value;
  const userEmail = document.getElementById("SignupEmail").value;
  const userPersonalNumber = document.getElementById("SignupPersonal1").value + '-' +
                             document.getElementById("SignupPersonal2").value;
  const userPreferSite = document.getElementById("SignupPrefer").value;
  const userPassword = document.getElementById("SignupPwd").value;
  const userPhoneNumber = document.getElementById("PhoneNumber01").value +
                          document.getElementById("PhoneNumber02").value +
                          document.getElementById("PhoneNumber03").value;;

  axios.post("http://localhost:3000/user", {
    name: userName,
    email: userEmail,
    personal: userPersonalNumber,
    prefer: userPreferSite,
    pwd: userPassword,
    phone: userPhoneNumber
  }).then((res) => {
    console.log(res.data);
  })
}
