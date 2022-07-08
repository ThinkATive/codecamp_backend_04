let arr = [1, "hello?", {"key" : "value"}, 4]

//back
arr.push("back");
//front
arr.unshift("front");

//back
arr.pop();
//front
arr.shift();

//return index
arr.indexOf(1);
//return bool
arr.includes(1);