if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  var loginLink=document.createElement('link');
  loginLink.rel='stylesheet';
  loginLink.type='text/css';
  loginLink.href='css/ti-phones.css';
  head.appendChild(loginLink);
}
if (localStorage.getItem('login')==null) {
  document.getElementById('tenid-loading').style.display='none';
  document.getElementById('tenid-form1').style.display='block';
}

function saveAccount() {
  document.getElementById('tenid-form1').style.display='none';
  document.getElementById('tenid-form2').style.display='flex';
  let login=document.getElementById('ti-login').value;
  let password=SHA256(document.getElementById('ti-pass').value);
  var saveAccount=getXMLHTTP();
  saveAccount.responseType="json";
  saveAccount.open('POST', 'https://tstore.space/api.php', true);
  saveAccount.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  saveAccount.send("action=h495ujh"+"&login="+login+"&password="+password);
  saveAccount.onreadystatechange = function() {
    if ((saveAccount.readyState===4) && (saveAccount.status===200)) {
      let saData=saveAccount.response;
      if (saData!=null) {
        localStorage.setItem('login', saData.user[0].login);
        localStorage.setItem('password', password);
        window.history.go(-1);
      } else {
        wrongData();
      }
    }
  };
}

function wrongData() {
  document.getElementById('tenid-form1').style.display='block';
  document.getElementById('tenid-form2').style.display='none';
  document.getElementById('wrong-data').style.visibility='visible';
  document.getElementById('ti-login').style.animationName='wrong-data-input';
  document.getElementById('ti-pass').style.animationName='wrong-data-input';
  document.getElementById('login-btn').style.animationName='wrong-data-btn';
}
