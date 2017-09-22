function GetClock(){
var d=new Date();
var nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();
var nhour=d.getHours(),nmin=d.getMinutes();
if(nmin<=9) nmin="0"+nmin

document.getElementById('clockbox').innerHTML=""+ndate+"."+(nmonth+1)+"."+nyear+" "+nhour+":"+nmin+"";
}

window.onload=function(){
GetClock();
setInterval(GetClock,1000);
}
