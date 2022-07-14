
const dateInfo = new Date();
const yyyy = dateInfo.getFullYear();
const mm = String(dateInfo.getMonth() + 1).padStart(2, '0');
const dd = String(dateInfo.getDate()).padStart(2, '0');

const hour = String(dateInfo.getHours()).padStart(2, '0');
const min = String(dateInfo.getMinutes()).padStart(2, '0');
const sec = String(dateInfo.getSeconds()).padStart(2, '0');

const todayInfo = `오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${hour}:${min}:${sec}입니다.`;

console.log(todayInfo);