
// 1. shorthand-property
function qqq(aaa){
    console.log(aaa.name)
    console.log(aaa.age)
    console.log(aaa.school)
}

const name = "철수"
const age = 12
const school = "다람쥐초등학교"
const profile = {  // profile = { name, age, school }
    name:"철수",
    age: 12,
    school: "다람쥐초등학교"
}

qqq({ name, age, school })




// 2. destructuring
function qqq({ apple, banana }){
    // const { apple, banana } = basket

}

const basket = {
    apple: 3,
    banana: 10
}

qqq(basket)