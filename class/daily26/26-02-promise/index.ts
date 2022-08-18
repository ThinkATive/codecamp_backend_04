// new Promise(() => {})
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//
//
// 1. Promise 예제
// const aaa = new Promise((resolve, reject) => {
//   // 시간이 걸리는 작업(API 보내기 등)

//   if (성공) {
//     const result = "철수";
//     resolve(result);
//   } else if (실패) {
//     reject("에러가 발생함");
//   }
// });

//
//
// 2. 내가 axios 개발자라면?
const myAxios = {
  get: (url) =>
    new Promise((resolve, reject) => {
      // 백엔드에 API 요청
    }),

  post: (url) =>
    new Promise((resolve, reject) => {
      // 백엔드에 API 요청
    }),
};

// await myAxios.get("url");
// myAxios.get("url").then();

//
//
// 3. Promise 실습
const fetchData = async () => {
  const response = await new Promise((resolve, reject) => {
    // 오래 걸리는 작업
    setTimeout(() => {
      // 2초가 걸려서 백엔드에서 데이터 받아옴
      const result = "철수";
      resolve(result);
    }, 2000);
  });
  console.log("완료된 값은" + response + " 입니다.");
};

fetchData();
