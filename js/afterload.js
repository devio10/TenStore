const api='https://thetenstore.ru/api.php';
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

window.onpopstate=function(event) {
  checkUrlVars();
};
