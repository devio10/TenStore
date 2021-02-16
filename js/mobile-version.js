function checkPlatform () {
  if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))||(localStorage.getItem('mobileVersion')=='true')){
    var head=document.getElementsByTagName('HEAD')[0];
    var link=document.createElement('link');
    link.rel='stylesheet';
    link.type='text/css';
    link.href='css/phones.css';
    head.appendChild(link);
  }
}
