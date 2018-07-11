/**
 * Created by panyz on 2018/7/2.
 */
function getMonthDate() {
    let date=new Date;
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    month =(month<10 ? "0"+month:month);
    return (year.toString()+"-"+month.toString());
}

export const getCurrentYearMonth = () => getMonthDate();