
var userId;
var userId;
var userLogin;
var userName;
var userLastName;
var userEmail;
var userPic;
var userPhoto;
var tenidVersion=localStorage.getItem('tenid-version');

function login2(lLogin, lEmail, lPhoto, lName, lLastname, lBg, lId, lType, lBio, lShortBio, page) {

  /*блок пользователя: основные данные*/
  if (lPhoto==null) {
    userPhoto='images/user.svg';
  } else {
    userPhoto="https://thetenstore.ru/"+lPhoto;
  }
  document.getElementById('userPic').src=userPhoto;
  document.getElementById('boxPic').src=userPhoto;
  let objEmail=document.getElementById('userbox-email');
  objEmail.style.display='block';
  objEmail.innerText=lEmail;
  let objName=document.getElementById('name');
  objName.style.display='block';
  if (localStorage.getItem('nameDisplay')=='true') {
    objName.innerText=lLogin;
  } else {
    objName.innerText=lName+' '+lLastname;
  }

  let objLastBtn=document.getElementById('lastButton');
  let objThemeBtn=document.getElementById('themeButton');
  objLastBtn.innerHTML="<i class='ph-sign-out boxButton-icon'></i>Выйти";
  objLastBtn.style.borderTop='0';
  objThemeBtn.style.borderBottom='0';
  objThemeBtn.style.marginTop='0';
  objThemeBtn.style.borderRadius='0';
  document.getElementById('picDiv').style.display='block';
  document.getElementById('boxbtn-library').style.display='flex';
  document.getElementById('boxBtn-account').style.display='flex';

  let userBox=document.getElementById('userBox');
  let userBoxGradient='linear-gradient(0deg, var(--rgba) var(--grad-percent), rgba(0,0,0,0) 100%)';
  if (lBg!=0) {
    userBox.style.background=userBoxGradient+', url(https://thetenstore.ru/'+lBg+')';
  } else {
    let random2=Math.floor(Math.random() * 10) + 1;
    userBox.style.background=userBoxGradient+', url(https://thetenstore.ru/images/headers/'+random2+'.jpg)';
  }
  userBox.style.backgroundPosition='center';
  userBox.style.backgroundRepeat='no-repeat';
  userBox.style.backgroundSize='cover';

  if (page=='settings') {

    let objLibName=document.getElementById('ub2-name');
    if (localStorage.getItem('nameDisplay')=='true') {
      objLibName.innerText=lLogin;
    } else {
      objLibName.innerText=lName+' '+lLastname;
    }

    let card2=document.getElementById('card2');
    let card1=document.getElementById('card1');
    card1.style.display='none';
    card2.style.display='block';

    let userCardGradient='linear-gradient(0deg, var(--rgba) 49%, rgba(0,0,0,0) 100%)';
    if (localStorage.getItem('app-background')!='false') {
      if (lBg!=0) {
        card2.style.background=userCardGradient+', url(https://thetenstore.ru/'+lBg+')';
      } else {
        let random=Math.floor(Math.random() * 10) + 1;
        card2.style.background=userCardGradient+', url(https://thetenstore.ru/images/headers/'+random+'.jpg)';
      }
      card2.style.backgroundPosition='center';
      card2.style.backgroundRepeat='no-repeat';
      card2.style.backgroundSize='cover';
    }
    let objSetName=document.getElementById('settings-name');
    if (localStorage.getItem('nameDisplay')=='true') {
      objSetName.innerText=lLogin;
    } else {
      objSetName.innerText=lName+' '+lLastname;
    }
    document.getElementById('sc-userPic').src=userPhoto;
    document.getElementById('settings-email').innerText=lEmail;

  } else if (page=='lib') {

    let objLibName=document.getElementById('lib-name');
    if (localStorage.getItem('nameDisplay')=='true') {
      objLibName.innerText=lLogin;
    } else {
      objLibName.innerText=lName+' '+lLastname;
    }

  } else if (page=='edit-account') {

    document.getElementById('CA-userPic').src=userPhoto;
    document.getElementById('EA-name').value=lName;
    document.getElementById('EA-lastName').value=lLastname;
    document.getElementById('EA-login').value=lLogin;

    userId=lId;
    userLogin=lLogin;
    userName=lName;
    userLastName=lLastname;
    userPic=lPhoto;
    userEmail=lEmail;

  } else if (page=='user') {

    document.getElementById('logged-in').style.display='block';
    document.getElementById('not-logged-in').style.display='none';

    let objUserName=document.getElementById('user-name');
    if (localStorage.getItem('nameDisplay')=='true') {
      objUserName.innerText=lLogin;
    } else {
      objUserName.innerText=lName+' '+lLastname;
    }

    let objUserAB=document.getElementById('user-appsBlock');
    let objKingIcon=document.getElementById('kingIcon');
    let objDevInf=document.getElementById('user-developer-info');
    if (lType=='dev') {
      objUserAB.style.display='block';
      objKingIcon.src='images/developer.svg';
      objDevInf.innerText='Разработчик';
    } else if (lType=='admin') {
      objDevInf.style.display='block';
      objUserAB.style.display='block';
      objKingIcon.src='images/moderator.svg';
      objDevInf.innerText='Модератор';
    } else {
      objKingIcon.style.display='none';
    }
    document.getElementById('CA-userPic').src=userPhoto;
    document.getElementById('user-short-bio').innerText=lShortBio;
    document.getElementById('user-bio').innerText=lBio;

    let userPage=document.getElementById('user-background');
    if (localStorage.getItem('app-background')!='false') {
      if (lBg!=0) {
        userPage.style.background="linear-gradient(0deg, var(--rgba) 0%, rgba(0,0,0,0) 89%), url(https://thetenstore.ru/"+lBg+")";
      } else {
        let random = Math.floor(Math.random() * 10) + 1;
        userPage.style.background="linear-gradient(0deg, var(--rgba) 0%, rgba(0,0,0,0) 89%), url(https://thetenstore.ru/images/headers/"+random+".jpg)";
      }
      userPage.style.backgroundPosition='center';
      userPage.style.backgroundRepeat='no-repeat';
      userPage.style.backgroundSize='cover';
    }

    const requestDev=new XMLHttpRequest();
    const paramsDev="action=KdSqSAOC&select=dev"+"&value="+devName;
    requestDev.responseType='json';
    requestDev.open("POST", url, true);
    requestDev.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    requestDev.addEventListener("readystatechange", () => {
      if (requestDev.readyState===4 && requestDev.status===200) {
        let maobj=requestDev.response;
        for(let i=0; i<maobj.apps.length; i++) {
          showAppCard('aCard-block', maobj.apps[i].icon, maobj.apps[i].icon_pad, maobj.apps[i].icon_bg, maobj.apps[i].id, maobj.apps[i].name, '');
        }
      }
    });
    requestDev.send(paramsDev);

  } else if (page=='app') {
    document.getElementById('my-review').style.display='block';
    document.getElementById('review-userpic').src=userPhoto;
    document.getElementById('review-username').innerHTML=lName+" "+lLastname;
  }
}

function login (pagee) {
  var password=localStorage.getItem('password');
  var login=localStorage.getItem('login');
  let action='h495ujh';
  var request=getXMLHTTP();
  request.responseType="json";
  request.open('POST', 'https://thetenstore.ru/api.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send("action="+action+"&login="+encodeURIComponent(login)+"&password="+encodeURIComponent(password));
  request.onreadystatechange = function() {
    let obj=request.response;
    if ((request.readyState==4)&&(request.status==200)&&(tenidVersion>110)&&(obj!=null)) {
      login2(obj.user[0].login, obj.user[0].email, obj.user[0].photo, obj.user[0].name, obj.user[0].lastname, obj.user[0].bg, obj.user[0].id, obj.user[0].userType, obj.user[0].bio, obj.user[0].shortBio, pagee);
    } else if (localStorage.getItem('alwaysLoggedIn')=='true') {
      login2('xXx-sexy-bitch-xXx', 'callmebitch@rambler.suck', 'images/bitch.jpg', '✨✨сексуальная', 'сучька 💅💅', 'images/bitchbg.jpg', '666', 'sucker', 'гламурная сука, сосу за сотку', 'мой номерок +79955321195', pagee);
    } else if ((tenidVersion==null)||((tenidVersion<1100)&&(localStorage.getItem('login'))!=null)) {
      userPhoto='images/tenid-error.svg';
      document.getElementById('name').style.display='block';
      document.getElementById('userbox-email').style.display='block';
      document.getElementById('name').innerHTML='Не удалось войти';
      document.getElementById('userbox-email').innerHTML='Метод входа в TenID изменился, <br>поэтому вам необходимо заново войти в аккаунт. <a href=`https://t.me/pressteam/444`>Подробнее</a>';
      document.getElementById('userPic').src=userPhoto;
      document.getElementById('boxPic').src=userPhoto;
      document.getElementById('themeButton').style.borderBottom='0';
      document.getElementById('themeButton').style.marginTop='0';
      document.getElementById('themeButton').style.borderRadius='0';
      document.getElementById('userbox-email').style.marginBottom='10px';
      document.getElementById('userbox-email').style.marginTop='5px';
      document.getElementById('name').style.marginTop='20px';
      document.getElementById('userbox-email').style.color='grey';
    }
  };
}
function logoff() {
  if (localStorage.getItem('login')!=null) {
    localStorage.removeItem('password');
    localStorage.removeItem('login');
    location.reload();
  }
}
function validateEmail (email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function back(block) {
  document.getElementById('CA-1step').style.display = 'none';
  document.getElementById('CA-2step').style.display = 'none';
  document.getElementById('CA-3step').style.display = 'none';
  document.getElementById('CA-4step').style.display = 'none';
  document.getElementById('CA-5step').style.display = 'none';
  document.getElementById(block).style.display = 'block';
}
function getUrlVars(key) {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
}
function confirmedPage () {
  let code=getUrlVars()['code'];
  if (code=='0') {
    document.getElementById('code0').style.display='block';
  } else if (code=='1') {
    document.getElementById('code1').style.display='block';
  }
}
function warningBox (action, text) {
  if (action == 'hide') {
    document.getElementById('CA-warningBox').style.display='none';
  } else {
    document.getElementById('warningBox-text').innerHTML=text;
    document.getElementById('CA-warningBox').style.display='block';
  }
}
function randomPass() {
    var length = 15,
        charset = "!@#$%^&*abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    document.getElementById('copy-block').style.display='flex';
    document.getElementById('copy-pass').value=retVal;
    document.getElementById('CA-repeatPassword').value=retVal;
    document.getElementById('CA-password').value=retVal;
}
function userBox () {
  let box=document.getElementById('userBox');
  let darkBg=document.getElementById('userBox-dark-bg');
  if (box.style.display=="block") {

    setTimeout(function () {
      box.style.display="none";
      darkBg.style.display="none";

      box.style.transform='scale(1)';
      box.style.opacity='1';
      darkBg.style.opacity='1';
    }, 200);

    box.style.transform='scale(.8)';
    box.style.opacity='0';
    darkBg.style.opacity='.1';
  } else {
    box.style.display="block";
    darkBg.style.display="block";
  }
}
function SHA256(s){
 var chrsz = 8;
 var hexcase = 0;

 function safe_add (x, y) {
 var lsw = (x & 0xFFFF) + (y & 0xFFFF);
 var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
 return (msw << 16) | (lsw & 0xFFFF);
 }

 function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
 function R (X, n) { return ( X >>> n ); }
 function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
 function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
 function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
 function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
 function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
 function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

 function core_sha256 (m, l) {
 var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
 var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
 var W = new Array(64);
 var a, b, c, d, e, f, g, h, i, j;
 var T1, T2;

 m[l >> 5] |= 0x80 << (24 - l % 32);
 m[((l + 64 >> 9) << 4) + 15] = l;

 for ( var i = 0; i<m.length; i+=16 ) {
 a = HASH[0];
 b = HASH[1];
 c = HASH[2];
 d = HASH[3];
 e = HASH[4];
 f = HASH[5];
 g = HASH[6];
 h = HASH[7];

 for ( var j = 0; j<64; j++) {
 if (j < 16) W[j] = m[j + i];
 else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

 T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
 T2 = safe_add(Sigma0256(a), Maj(a, b, c));

 h = g;
 g = f;
 f = e;
 e = safe_add(d, T1);
 d = c;
 c = b;
 b = a;
 a = safe_add(T1, T2);
 }

 HASH[0] = safe_add(a, HASH[0]);
 HASH[1] = safe_add(b, HASH[1]);
 HASH[2] = safe_add(c, HASH[2]);
 HASH[3] = safe_add(d, HASH[3]);
 HASH[4] = safe_add(e, HASH[4]);
 HASH[5] = safe_add(f, HASH[5]);
 HASH[6] = safe_add(g, HASH[6]);
 HASH[7] = safe_add(h, HASH[7]);
 }
 return HASH;
 }

 function str2binb (str) {
 var bin = Array();
 var mask = (1 << chrsz) - 1;
 for(var i = 0; i < str.length * chrsz; i += chrsz) {
 bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
 }
 return bin;
 }

 function Utf8Encode(string) {
 string = string.replace(/\r\n/g,'\n');
 var utftext = '';

 for (var n = 0; n < string.length; n++) {

 var c = string.charCodeAt(n);

 if (c < 128) {
 utftext += String.fromCharCode(c);
 }
 else if((c > 127) && (c < 2048)) {
 utftext += String.fromCharCode((c >> 6) | 192);
 utftext += String.fromCharCode((c & 63) | 128);
 }
 else {
 utftext += String.fromCharCode((c >> 12) | 224);
 utftext += String.fromCharCode(((c >> 6) & 63) | 128);
 utftext += String.fromCharCode((c & 63) | 128);
 }

 }

 return utftext;
 }

 function binb2hex (binarray) {
 var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
 var str = '';
 for(var i = 0; i < binarray.length * 4; i++) {
 str += hex_tab.charAt((binarray[i>>2] >> ((3 - i % 4)*8+4)) & 0xF) +
 hex_tab.charAt((binarray[i>>2] >> ((3 - i % 4)*8 )) & 0xF);
 }
 return str;
 }

 s = Utf8Encode(s);
 return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}
function getXMLHTTP() {
  var x = false;
  try {
    x = new XMLHttpRequest();
  }catch(e) {
    try {
      x = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(ex) {
      try {
        req = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch(e1) {
        x = false;
      }
    }
  }
  return x;
}
function goBack() {
  window.history.go(-1);
}
