checkTheme('f');
checkPlatform('f');
function moreConfetti () {
  var myCanvas = document.getElementById('confetti');
  myCanvas.style.display='block';
  var myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true
  });
  myConfetti({
    particleCount: 100,
    spread: 160
  });
}
function getUrlVars(key) {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
}
let code=getUrlVars()['code'];
if (code!=null) {
  document.getElementById('reg-'+code).style.display='block';
}

if (code=='success') {
  moreConfetti();
}
