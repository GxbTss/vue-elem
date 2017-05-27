export const Timer = (timer) => {
    let oDate = new Date();
    oDate.setTime(timer);
    let y = oDate.getFullYear();;
    let mm = oDate.getMonth() + 1;
    let d = oDate.getDate();
    let h = oDate.getHours();
    let m = oDate.getMinutes();
    let s = oDate.getSeconds();
    return y + "-" + mm + "-" + d + " " + h + ":" + m + ":" + s;
}