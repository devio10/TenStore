const newyear='2020-12-31';
function getTimeRemaining(endtime){
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}
function initializeClock(endtime) {
  const clock = document.getElementById('remaining');
  const timeinterval = setInterval(() => {
    const t = getTimeRemaining(endtime);
    document.getElementById('remaining').innerHTML=t.days+' дней '+t.hours+' часов '+t.minutes+' минут '+t.seconds+' секунд';
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  },1000);
}
initializeClock(newyear);
