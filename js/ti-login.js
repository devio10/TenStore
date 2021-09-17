checkPlatform('f');
checkTheme();
login('log');
var api='https://tstore.space/api.php';
var curstep='id';
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  var loginLink=document.createElement('link');
  loginLink.rel='stylesheet';
  loginLink.type='text/css';
  loginLink.href='css/ti-phones.css';
  head.appendChild(loginLink);
}
/*
function nextstep(step) {
  if (step==1) {
    let userID=document.getElementById('login_tenid').value;
    if (userID!='') {
      var picreq=getXMLHTTP();
      picreq.responseType="json";
      picreq.open('POST', api, true);
      picreq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      picreq.send("action=FEhf42d&login="+userID);
      picreq.onreadystatechange = function() {
        if ((picreq.readyState===4) && (picreq.status===200)) {
          let userdata=picreq.response;
          if (userdata!=null) {
            var userpic='https://tstore.space/'+userdata.user[0].photo;
            if (userdata.user[0].photo==0) {
              userpic='images/user.svg';
            }
            document.getElementById('form2-pic').src=userpic;
            document.getElementById('form2-name').innerText=userID;
            document.getElementById('tenid-form1').style.display='none';
            document.getElementById('tenid-form2').style.display='block';
            curstep='pass';
          } else {
            incorrect('fake-tenid', 'tenid');
          }
        }
      };
    } else {
      incorrect('fake-tenid', 'tenid');
    }
  }
}
*/

function incorrect(obj, icon) {
  document.getElementById('login_'+obj).style.animationName='shakeX';
  if (icon!=null) {
    document.getElementById(icon+'_icon').style.color='#d32f2f';
  } else {
    document.getElementById(obj+'_icon').style.color='#d32f2f';
  }
  document.getElementById('login_'+obj).style.border='1px solid #d32f2f';
  setTimeout(function () {
    document.getElementById('login_'+obj).style.animationName='none';
  }, 1000);
  setTimeout(function () {
    if (icon!=null) {
      document.getElementById(icon+'_icon').style.color='gray';
    } else {
      document.getElementById(obj+'_icon').style.color='gray';
    }
    document.getElementById('login_'+obj).style.border='1px solid var(--gray-mid)';
  }, 3000);
}
function saveAccount() {
  loadbox('begin', 10000);
  curstep='saving';
  let login=document.getElementById('login_tenid').value;
  let password=SHA256(document.getElementById('login_password').value);
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
        loadbox('end');
        popup('Вход выполнен', 'check');
        if (window.history.length==1) {
          window.open('https://tstore.space/3rd/', '_self');
        } else {
          window.history.back();
        }
      } else {
        incorrect('fake-tenid', 'tenid');
        incorrect('fake-password', 'password');
        popup('Введены неверные ID или пароль', 'x', 'small');
        loadbox('end');
      }
    }
  };
}

document.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      saveAccount();
    }
});
