let profile = {
    name: "철수",
    age: 12,
    school: "다람쥐초등학교"
}

let profile2 = {
    name: profile.name,
    age: profile.age,
    school: profile.school
}

let profile3 = { ...profile }


// let profile = {
//     name: "철수",
//     age: 12,
//     school: "다람쥐초등학교",
//     hobby: {
//         hobby1: "수영",
//         hobby2: "자전거"
//     }
// }

let profile5 = {
    name: profile.name,
    age: profile.age,
    school: profile.school,
    hobby: {
        hobby1: profile.hobby.hobby1,
        hobby2: profile.hobby.hobby2
    }
}

// let profile5 = {
//     name: profile.name,
//     age: profile.age,
//     school: profile.school,
//     hobby: { ...profile.hobby }
// }

// let profile5 ={
//     ...profile,
//     hobby: { ...profile.hobby }
// }

typeof(profile)
profile
typeof(JSON.stringify(profile))
JSON.stringify(profile)
typeof(JSON.parse(JSON.stringify(profile)))
JSON.parse(JSON.stringify(profile))

// JSON = JavaScript Object Notation

//객체 const
//const something = Object.freeze(something);