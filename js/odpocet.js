function showtime() {
    today = new Date();
    Prodej = new Date("february, 15, 2017, 15:00")
    msPerDay = 24 * 60 * 60 * 1000 ;
    timeLeft = ( today.getTime()-Prodej.getTime());
    e_daysLeft = timeLeft / msPerDay;
    daysLeft = Math.floor(e_daysLeft);
    e_daysLeft = timeLeft / msPerDay;
    daysLeft = Math.floor(e_daysLeft);
    e_hrsLeft = (e_daysLeft - daysLeft)*24;
    hrsLeft = Math.floor(e_hrsLeft);
    minsLeft = Math.floor((e_hrsLeft - hrsLeft)*60);
    hrsLeft = hrsLeft;
    e_minsLeft = (e_hrsLeft - hrsLeft)*60;
    secLeft = Math.floor(e_hrsLeft);
    secLeft = Math.floor((e_minsLeft - minsLeft)*60);
    secLeft = secLeft;
    Temp3=daysLeft+'d '+hrsLeft+'h '+minsLeft+'m '+secLeft+' s';
    //document.odpocet.zbyva.value=Temp3;
    document.getElementById("odpocet").innerHTML=Temp3;
    timerID = setTimeout("showtime()",1000);
    timerRunning = true;
}
var timerID = null;
var timerRunning = false;

function stopclock () {
    if(timerRunning)
        clearTimeout(timerID);
    timerRunning = false;
}

function stopClock() {
    stopclock();
    return;
}
function startclock () {
    stopclock();
    showtime();
}