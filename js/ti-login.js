if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  var loginLink=document.createElement('link');
  loginLink.rel='stylesheet';
  loginLink.type='text/css';
  loginLink.href='css/ti-phones.css';
  head.appendChild(loginLink);
}
