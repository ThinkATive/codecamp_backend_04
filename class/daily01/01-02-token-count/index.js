function getToken(maxi){
    if(maxi === undefined || maxi === null){
        console.log("error!! input a number!");
        return;
    } else if(maxi <= 0){
        console.log("error!! input a number higher!");
        return;
    }
    else if(maxi > 10){
        console.log("error!! input a number lower!");
        return;
    }


    const result = String(Math.floor(Math.random() * (10 ** maxi))).padStart(maxi, '0');
    return result;
}

console.log(getToken(1));