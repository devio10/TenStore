const userPrefersDark=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
function checkTheme (page) {
  if (userPrefersDark) {
    document.documentElement.setAttribute('dark-theme', 'true');
    document.getElementById('header_logo').src='img/tenid_header_darktheme.svg';
  } else {
    document.getElementById('header_logo').src='img/tenid_header_whitetheme.svg';
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme=e.matches?'dark':'light';
    if (newColorScheme=='dark') {
      document.documentElement.setAttribute('dark-theme', 'true');
      if (document.getElementById('header_logo')!=null) {
        document.getElementById('header_logo').src='img/tenid_header_darktheme.svg';
      }
    } else {
      document.documentElement.setAttribute('dark-theme', 'false');
      if (document.getElementById('header_logo')!=null) {
        document.getElementById('header_logo').src='img/tenid_header_whitetheme.svg';
      }
    }
});

checkTheme('f');
checkPlatform('f');
login('reg');
var api='http://tenid.tstore.space/register.php';
function checkData(type, source) {
  if (type=='email') {
    source=document.getElementById('reg-email').value;
  } else {
    source=document.getElementById('reg-login').value;
  }
  loadbox('begin', 5000);
  var checkreq=new XMLHttpRequest();
  var checkdata='action=UDFhwe&login='+source;
  if (type=='email') {
    checkdata='action=vgGYOd&email='+source;
  }
  checkreq.responseType = "text";
  checkreq.open("POST", api, true);
  checkreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  checkreq.addEventListener("readystatechange", () => {
    if ((checkreq.readyState===4)&&(checkreq.status===200)) {
      var response=encodeURI(checkreq.responseText);
      loadbox('end');
      if (response=='errEmail') {
        popup('Эта почта занята', 'warning');
        return 'err_email';
      } else if (response=='errLogin') {
        popup('Этот ID занят', 'warning');
        return 'err_login';
      } else if (response==null) {
        popup('Ошибка на стороне сервера', 'warning');
        return 'err_unknown';
      } else if ((response=='')&&(type=='email')) {
        return 'free';
      } else if ((response=='')&&(type=='login')) {
        return 'free';
      }
    }
  });
  checkreq.send(checkdata);
}

function lazypassword() {
    var length = 15,
        charset = "!@#$%^&*_-.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
  document.getElementById('reg-password').value=retVal;
  document.getElementById('reg-repeat-password').value=retVal;
  document.getElementById('lazy_password_block').style.display='flex';
  document.getElementById('lazy_password').value=retVal;
  var copyText=document.querySelector("#lazy_password");
  copyText.select();
  document.execCommand("copy");
  popup('Пароль скопирован в буфер обмена', 'clipboard-text', 'small');
}
function isCorrect(type) {
  let data=document.getElementById('reg-'+type).value;
  if (type=='password') {

    if (data=='') {
      popup('Введите пароль', 'x', 'small');
      incorrect('fake-password', 'password');
      return false;
    } else if (data!=document.getElementById('reg-repeat-password').value) {
      popup('Пароли не совпадают', 'x', 'small');
      incorrect('repeat-password', 'password');
      return false;
    } else if (data.length < 8) {
      popup('Минимальная длина пароля: 8 символов', 'x', 'small');
      incorrect('fake-password', 'password');
      return false;
    } else {
      return true;
    }

  } else if (type=='email') {

    var re = /\S+@\S+\.\S+/;
    if (data=='') {
      popup('Введите адрес электронной почты', 'x', 'small');
      incorrect('email');
      return false;
    } else if (re.test(data)==false) {
      popup('Некорректный адрес электронной почты', 'x', 'small');
      incorrect('email');
      return false;
    } else {
      return true;
    }

  } else if (type=='name') {

    if (data=='') {
      popup('Введите имя', 'x', 'small');
      incorrect('name', 'user');
      return false;
    } else if (data.length > 64) {
      popup('Максимальная длина имени: 64 символа', 'x', 'small');
      incorrect('name', 'user');
      return false;
    } else {
      return true;
    }

  } else if (type=='lastname') {

    if (data=='') {
      popup('Введите фамилию', 'x', 'small');
      incorrect('lastname', 'user');
      return false;
    } else if (data.length > 69) {
      popup('Максимальная длина фамилии: 69 символов', 'x', 'small');
      incorrect('lastname', 'user');
      return false;
    } else {
      return true;
    }

  } else if (type=='tenid') {

    if (data=='') {
      popup('Введите ID', 'x', 'small');
      incorrect('fake-tenid', 'tenid');
      return false;
    } else if (data.length > 30) {
      popup('Максимальная длина ID: 30 символов', 'x', 'small');
      incorrect('fake-tenid', 'tenid');
      return false;
    } else if (data.length < 4) {
      popup('Минимальная длина ID: 4 символа', 'x', 'small');
      incorrect('fake-tenid', 'tenid');
      return false;
    } else {
      return true;
    }

  }
}
function nextStep () {
  if ((isCorrect('name'))&&(isCorrect('lastname'))&&(isCorrect('email'))&&(isCorrect('password'))&&(isCorrect('tenid'))) {
    document.getElementById('tid_mainframe').style.display='none';
    document.getElementById('tid_recaptcha').style.display='block';
  } else if (localStorage.getItem('debug')=='true') {
    document.getElementById('tid_mainframe').style.display='none';
    document.getElementById('tid_recaptcha').style.display='block';
  }

}

function finishReg () {
  var recaptchaResponse=grecaptcha.getResponse();
  if (recaptchaResponse.length==0) {
    popup('Подтвердите, что вы не робот', 'robot');
  } else {
    loadbox('begin', 10000);
    let action="si8739JI";
    const request=new XMLHttpRequest();
    var params=new FormData();
    params.append("action", action);
    params.append("login", document.getElementById('reg-tenid').value);
    params.append("name", document.getElementById('reg-name').value);
    params.append("lastName", document.getElementById('reg-lastname').value);
    params.append("email", document.getElementById('reg-email').value);
    params.append("password", SHA256(document.getElementById('reg-password').value));
    params.append("g-recaptcha", recaptchaResponse);
    request.open("POST", 'https://tstore.space/api.php', true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
          loadbox('end');
          window.open('account-created?code=' + encodeURI(request.responseText), '_self');
        }
    });
    request.send(params);
  }
}

function incorrect(obj, icon) {
  document.getElementById('reg-'+obj).style.animationName='shakeX';
  if (icon!=null) {
    document.getElementById(icon+'_icon').style.color='#d32f2f';
  } else {
    document.getElementById(obj+'_icon').style.color='#d32f2f';
  }
  document.getElementById('reg-'+obj).style.border='1px solid #d32f2f';
  setTimeout(function () {
    document.getElementById('reg-'+obj).style.animationName='none';
  }, 1000);
  setTimeout(function () {
    if (icon!=null) {
      document.getElementById(icon+'_icon').style.color='gray';
    } else {
      document.getElementById(obj+'_icon').style.color='gray';
    }
    document.getElementById('reg-'+obj).style.border='1px solid var(--gray-mid)';
  }, 3000);
}
function toggleHelp() {
  let help=document.getElementById('tenid_help');
  if (help.style.display=='none') {
    help.style.display='block';
  } else {
    help.style.display='none';
  }
}
