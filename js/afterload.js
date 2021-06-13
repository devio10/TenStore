const api='https://tstore.space/api.php';
var head=document.getElementsByTagName('HEAD')[0];
var body=document.getElementsByTagName('body')[0];
checkTheme();
checkPlatform();
login();
checkUrlVars();
checkPars();

if ((localStorage.getItem('platform')==null)&&(localStorage.getItem('manual-platform')!='true')) {
  var script=document.createElement('script');
  script.src='js/detect-os.js';
  head.appendChild(script);
}
document.getElementById('s-platform').innerText=localStorage.getItem('platform');
if ((localStorage.getItem('platform')=='Windows')||(localStorage.getItem('platform')=='Linux')) {
  document.getElementById('device-icon').src='img/icons/device-desktop.svg';
} else {
  document.getElementById('device-icon').src='img/icons/device-mobile.svg';
}

window.onpopstate=function(event) {
  checkUrlVars();
};

if (localStorage.getItem('debug')!='true') {
  document.getElementById('beta-introduction').style.display='none';
}
if (localStorage.getItem('temp-beta-introduction')=='hidden') {
  document.getElementById('beta-introduction').style.display='none';
}
