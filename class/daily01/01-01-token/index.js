console.log("hello world!!");

function getToken(maxi){
    const result = String(Math.floor(Math.random() * (10 ** maxi))).padStart(maxi, '0');
    return result;
}

console.log(getToken(10));