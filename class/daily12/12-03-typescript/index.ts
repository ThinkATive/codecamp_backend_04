//타입추론
let aaa = "안녕하세요";
//안됨 aaa = 3;

//타입명시
let bbb: string = "반갑습니다";
//안됨 bbb = 10;

//타입명시가 필요한 상황
let ccc: number | string = 1000;
ccc = "1000원";

//숫자타입
let ddd: number = 10;
//안됨 ddd = "철수";

//불린타입
let eee: boolean = true;
//안됨 eee = "false"; // true로 작동할 위험 예방

//배열타입
let fff: number[] = [1, 2, 3, 4, 5];
let ggg: string[] = ["1원", "2원", "3원"];

let hhh: (number | string)[] = [1, 2, 3, 4, "ㅇㅅㅇ"];
hhh = [1, "2원", 3, "4원", 5];

//객체타입
interface IProfile {
  name: string;
  age: string | number;
  school: string;
  hobby?: string;
}
const profile: IProfile = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
};

profile.age = "8살";
profile.hobby = "수영";

//함수타입
const add = (money1: number, money2: number, unit: string): string => {
  return money1 + money2 + unit;
};

const result = add(1000, 2000, "원");
