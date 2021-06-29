var api='https://tstore.space/api.php';
var curstep='id';
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
  document.getElementById('tenid-form2').style.display='none';
}

function nextstep(step) {
  if (step==1) {
    let userID=document.getElementById('ti-login').value;
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
            shake('ti-login');
          }
        }
      };
    } else {
      shake('ti-login');
    }
  }
}

function shake(obj) {
  document.getElementById(obj).style.animationName='shakeX';
  setTimeout(function () {
    document.getElementById(obj).style.animationName='none';
  }, 1000);
}
function saveAccount() {
  curstep='saving';
  document.getElementById('tenid-form2').style.display='none';
  document.getElementById('tenid-form3').style.display='flex';
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
        console.log(window.history.length);
        if (window.history.length==1) {
          window.open('https://tstore.space/3rd/', '_self');
        } else {
          window.history.back();
        }


      } else {
        wrongData();
      }
    }
  };
}
function editData() {
  document.getElementById('tenid-form2').style.display='none';
  document.getElementById('tenid-form1').style.display='block';
}


function wrongData() {
  document.getElementById('tenid-form3').style.display='none';
  document.getElementById('tenid-form2').style.display='block';
  shake('ti-pass');
}
checkTheme()

document.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      if (curstep=='id') {
        nextstep(1);
      } else if (curstep=='pass') {
        saveAccount();
      }
    }
});
