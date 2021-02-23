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
  console.log(login + ' ' + password);
  /*
  const saveAccount=new XMLHttpRequest();
  let saData=new FormData();
  saData.append('action', 'h495ujh');
  saData.append('login', login);
  saData.append('password', password);
  saveAccount.open('POST', api, true);
  saveAccount.addEventListener('readystatechange', () => {
    if ((saveAccount.readyState===4)&&(saveAccount.status===200)) {
      let user=saveAccount.response;
      console.log(user[0].login);
      console.log(user.user[0].login);
      console.log(user.login);
      console.log(user.user.login);
      localStorage.setItem('login', user[0].login);
      localStorage.setItem('password', password);
      console.log(localStorage.getItem('login')+' '+localStorage.getItem('password'));
      login=null;
      password=null;
    }
  });
  saveAccount.send(saData);
  */
  var saveAccount=getXMLHTTP();
  saveAccount.responseType =	"json";
  saveAccount.open('POST', 'https://thetenstore.ru/api.php', true);
  saveAccount.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  saveAccount.send("action=h495ujh"+"&login="+login+"&password="+password);
  saveAccount.onreadystatechange = function() {
    if ((saveAccount.readyState===4) && (saveAccount.status===200)) {
      let saData=saveAccount.response;
      if (saData!=null) {
        console.log(saData.user[0].login);
      }
    }
  };
}
