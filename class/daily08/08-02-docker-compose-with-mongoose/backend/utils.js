export function getToday(){
    const getDay = new Date();
    const yyyy = getDay.getFullYear();
    const mm = getDay.getMonth() + 1;
    const dd = getDay.getDate();
    const today = `${yyyy}-${mm}-${dd}`;

    return today;
}