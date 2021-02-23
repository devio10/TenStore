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
  const saveAccount=new XMLHttpRequest();
  let saData=new FormData();
  saData.append('action', 'h495ujh');
  saData.append('login', login);
  saData.append('password', password);
  saveAccount.open('POST', api, true);
  saveAccount.addEventListener('readystatechange', () => {
    if ((saveAccount.readyState===4)&&(saveAccount.status===200)) {
      let user=saveAccount.response;
      localStorage.setItem('login', user.user[0].login);
      localStorage.setItem('password', password);
      console.log('успешно вошли в аккаунт!!');
      login=null;
      password=null;
    }
  });
  saveAccount.send(saData);
}
