// // public , private , protected , readonly

// // 1. public
// class Aaa1 {
//   constructor(public mypower) {
//     //this.mypower = mypower; // <-- public, protected, private, readonly 등 한개만 포함되면 자동으로 셋팅
//   }
//   ggg() {
//     console.log(this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 가능
//   }
// }

// class Aaa2 extends Aaa1 {
//   ggg() {
//     console.log(this.mypower); // 자식이 접근 가능
//     this.mypower = 10; // 자식이 수정도 가능
//   }
// }
// const aaaa = new Aaa2(50);
// console.log(aaaa.mypower); // 밖에서도 접근 가능
// aaaa.mypower = 10; // 밖에서도 수정도 가능

// //
// //
// //
// //
// //
// //
// //
// //

// // 2. protected
// class Bbb1 {
//   constructor(protected mypower) {
//     //this.mypower = mypower; // <-- public, protected, private, readonly 등 한개만 포함되면 자동으로 셋팅
//   }
//   ggg() {
//     console.log(this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 가능
//   }
// }

// class Bbb2 extends Bbb1 {
//   ggg() {
//     console.log(this.mypower); // 자식이 접근 가능
//     this.mypower = 10; // 자식이 수정도 가능
//   }
// }
// const bbbb = new Bbb2(50);
// console.log(bbbb.mypower); // 밖에서도 접근 불가
// bbbb.mypower = 10; // 밖에서도 수정도 불가

// //
// //
// //
// //
// //
// //
// //
// //
// //

// // 3. private
// class Ccc1 {
//   constructor(private mypower) {
//     //this.mypower = mypower; // <-- public, protected, private, readonly 등 한개만 포함되면 자동으로 셋팅
//   }
//   ggg() {
//     console.log(this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 가능
//   }
// }

// class Ccc2 extends Ccc1 {
//   ggg() {
//     console.log(this.mypower); // 자식이 접근 불가
//     this.mypower = 10; // 자식이 수정도 불가
//   }
// }
// const cccc = new Ccc2(50);
// console.log(cccc.mypower); // 밖에서도 접근 불가
// cccc.mypower = 10; // 밖에서도 수정도 불가

// //
// //
// //
// //
// //
// //
// //
// //
// //

// // 4. readonly
// class Ddd1 {
//   constructor(readonly mypower) {
//     //this.mypower = mypower; // <-- public, protected, private, readonly 등 한개만 포함되면 자동으로 셋팅
//   }
//   ggg() {
//     console.log(this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 불가
//   }
// }

// class Ddd2 extends Ddd1 {
//   ggg() {
//     console.log(this.mypower); // 자식이 접근 가능
//     this.mypower = 10; // 자식이 수정도 불가
//   }
// }
// const dddd = new Ddd2(50);
// console.log(dddd.mypower); // 밖에서도 접근 가능
// dddd.mypower = 10; // 밖에서도 수정도 불가
