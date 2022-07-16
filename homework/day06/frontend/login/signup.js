// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  // 1. 입력한 휴대폰 번호 가져오기
  const myPhone = document.getElementById("PhoneNumber01").value +
                  document.getElementById("PhoneNumber02").value +
                  document.getElementById("PhoneNumber03").value;

  // 2. 해당 휴대폰 번호로 인증번호 API 요청하기
  axios.post("http://localhost:3000/tokens/phone", {
      phoneNum : myPhone
  }).then((res) => {
      console.log(res);
  })
  console.log('인증 번호 전송')
}

// 회원 가입 API 요청
const submitSignup = async () => {
  // 1. 입력한 정보 가져오기
  const myName = document.getElementById("SignupName").value;
  const myPersonalNumber = document.getElementById("SignupPersonal").value;
  const myPhone = document.getElementById("PhoneNumber01").value +
                  document.getElementById("PhoneNumber02").value +
                  document.getElementById("PhoneNumber03").value;
  const myPreferSite = document.getElementById("SignupPrefer").value;
  const myPassword = document.getElementById("SignupPwd").value;
  const myEmail = document.getElementById("SignupEmail").value;

  // 2. 회원가입 API 요청하기
  axios.post("http://localhost:3000/user/info", {
    userName : myName,
    userPersonalNumber : myPersonalNumber,
    userPhoneNumber : myPhone,
    userPreferSite : myPreferSite,
    userPassword : myPassword,
    userEmail : myEmail
  }).then((res) => {
    console.log(res);
  })
  console.log('회원 가입 이메일 전송')
}