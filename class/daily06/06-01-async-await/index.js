import axios from 'axios';

//자바스크립트 내부의 기본은 동기적이지만 외부적 작업은 비동기.

// 1. 비동기 방식

function fetchPost(){
    const result = axios.get("http://koreanjson.com/posts/1");
    console.log("비동기방식: ", result); // Promise { <pending> }
}

fetchPost();


// 2. 동기 방식
async function fetchPost2(){
    const result = await axios.get("http://koreanjson.com/posts/1");
    console.log("동기방식: ", result.data); // 정상적인 데이터
}

fetchPost2();