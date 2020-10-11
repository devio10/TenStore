function randomPass() {
    var length = 15,
        charset = "!@#$%^&*abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    warningBox('show', 'Ваш пароль: ' + retVal);
    document.getElementById('CA-repeatPassword').value = retVal;
    document.getElementById('CA-password').value = retVal;
}
function userBox () {
  let box = document.getElementById('userBox');
  if (box.style.display == "block") {
    box.style.display = "none";
  } else {
    box.style.display = "block";
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

var userId;
var userId;
var userLogin;
var userName;
var userLastName;
var userEmail;
var userPic;
function login (page) {
  var password = localStorage.getItem('password');
  var login = localStorage.getItem('login');
  let action = 'h495ujh';
  var request = getXMLHTTP();
  request.responseType =	"json";
  request.open('POST', 'https://thetenstore.ru/api.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send("action=" + action + "&login=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password));
  request.onreadystatechange = function() {
    if ((request.readyState == 4) && (request.status == 200)) {
        let obj = request.response;
        let userPhoto;
        if (obj.user[0].photo == null) {
          userPhoto = 'images/user.svg';
        } else {
          userPhoto = "https://thetenstore.ru/" + obj.user[0].photo;
        }
        if (page == 'settings') {
          if (localStorage.getItem('nameDisplay') == 'false') {
            document.getElementById('settings-welcomeText').innerHTML = "Здравствуйте, " + obj.user[0].login + ".";
          } else {
            document.getElementById('settings-welcomeText').innerHTML = "Здравствуйте, " + obj.user[0].name + ".";
          }
          document.getElementById('settings-link1').style.display = "block";
          document.getElementById('settings-link2').style.display = "block";
          document.getElementById('settings-link3').style.display = "none";
        } else if (page == 'edit-account') {
          document.getElementById('CA-userPic').src = userPhoto;
          document.getElementById('EA-name').value = obj.user[0].name;
          document.getElementById('EA-lastName').value = obj.user[0].lastname;
          document.getElementById('EA-login').value = obj.user[0].login;
          userId = obj.user[0].id;
          userLogin = obj.user[0].login;
          userName = obj.user[0].name;
          userLastName = obj.user[0].lastname;
          userPic = obj.user[0].photo;
          userEmail = obj.user[0].email;
        } else if (page=='user') {
          document.getElementById('logged-in').style.display='block';
          document.getElementById('not-logged-in').style.display='none';
          let userPage=document.getElementById('user-background');
          if (localStorage.getItem('nameDisplay')=='true') {
            document.getElementById('user-name').innerHTML=obj.user[0].login;
          } else {
            document.getElementById('user-name').innerHTML=obj.user[0].name+" "+obj.user[0].lastname;
          }
          if (obj.user[0].userType=='dev') {
            document.getElementById('user-appsBlock').style.display='block';
            document.getElementById('kingIcon').src='images/developer.svg';
            document.getElementById('user-developer-info').innerHTML='Разработчик';
          } else if (obj.user[0].userType=='admin') {
            document.getElementById('user-developer-info').style.display='block';
            document.getElementById('user-appsBlock').style.display='block';
            document.getElementById('kingIcon').src='images/moderator.svg';
            document.getElementById('user-developer-info').innerHTML='Модератор';
          } else {
            document.getElementById('kingIcon').style.display='none';
          }
          document.getElementById('CA-userPic').src=userPhoto;
          document.getElementById('user-short-bio').innerHTML=obj.user[0].shortBio;
          document.getElementById('user-bio').innerHTML=obj.user[0].bio;
          if (localStorage.getItem('app-background')!='false') {
            if (obj.user[0].bg!=0) {
              userPage.style.background="linear-gradient(0deg, var(--rgba) 0%, rgba(0,0,0,0) 59%), url(https://thetenstore.ru/"+obj.user[0].bg+")";
            } else {
              let random = Math.floor(Math.random() * 10) + 1;
              userPage.style.background="linear-gradient(0deg, var(--rgba) 0%, rgba(0,0,0,0) 59%), url(https://thetenstore.ru/images/headers/"+random+".jpg)";
            }
            userPage.style.backgroundPosition = 'center';
            userPage.style.backgroundRepeat = 'no-repeat';
            userPage.style.backgroundSize = 'cover';
          }
        }

        document.getElementById('name').style.display='block';
        if (localStorage.getItem('nameDisplay') == 'true') {
          document.getElementById('name').innerHTML = obj.user[0].login;
        } else {
          document.getElementById('name').innerHTML = obj.user[0].name + " " + obj.user[0].lastname;
        }
        document.getElementById('picDiv').style.display="block";
        document.getElementById('lastButton').innerHTML="<img src='images/logout.svg' class='boxButton-icon'>Выйти";
        document.getElementById('lastButton').style.borderTop='0';
        document.getElementById('boxbtn-library').style.display='flex';
        document.getElementById('boxBtn-account').style.display='flex';
        document.getElementById('themeButton').style.borderBottom='0';
        document.getElementById('themeButton').style.marginTop='0';
        document.getElementById('themeButton').style.borderBottomLeftRadius='0';
        document.getElementById('themeButton').style.borderBottomRightRadius='0';
        document.getElementById('userBox').style.background='linear-gradient(0deg, var(--rgba) 65%, rgba(0,0,0,0) 100%), url(https://thetenstore.ru/'+obj.user[0].bg+')';
        document.getElementById('userBox').style.backgroundRepeat='no-repeat';
        document.getElementById('userBox').style.backgroundPosition='center';
        document.getElementById('userBox').style.backgroundSize='cover';
        document.getElementById('userPic').src=userPhoto;
        document.getElementById('boxPic').src=userPhoto;
        document.getElementById('userbox-email').style.display='block';
        if (localStorage.getItem('userbox-dontShowEmail')!='true') {
          document.getElementById('userbox-email').innerHTML=obj.user[0].email;
        }
    } else if (localStorage.getItem('alwaysLoggedIn')=='true') {
      let userPhoto='images/alwaysLoggedIn.svg';
      if (page == 'settings') {
        if (localStorage.getItem('nameDisplay') == 'false') {
          document.getElementById('settings-welcomeText').innerHTML = "Включёна функция alwaysLoggedIn. Ваше имя здесь.";
        } else {
          document.getElementById('settings-welcomeText').innerHTML = "Включёна функция alwaysLoggedIn. Ваш логин здесь.";
        }
        document.getElementById('settings-link1').style.display = "block";
        document.getElementById('settings-link2').style.display = "block";
        document.getElementById('settings-link3').style.display = "none";
      } else if (page == 'edit-account') {
        document.getElementById('CA-userPic').src = userPhoto;
        document.getElementById('EA-name').value = 'name';
        document.getElementById('EA-lastName').value = 'lastName';
        document.getElementById('EA-login').value = 'login';
        userId='id';
        userLogin='login';
        userName='name';
        userLastName='lastName';
        userPic=userPhoto;
        userEmail='alwaysLoggedIn@thetenstore.ru';
      } else if (page=='user') {
        document.getElementById('logged-in').style.display='block';
        document.getElementById('not-logged-in').style.display='none';
        let userPage=document.getElementById('user-background');
        if (localStorage.getItem('nameDisplay')=='true') {
          document.getElementById('user-name').innerHTML='login';
        } else {
          document.getElementById('user-name').innerHTML'alwaysLoggedIn';
        }
        if (localStorage.getItem('ali-userType')=='dev') {
          document.getElementById('user-appsBlock').style.display='block';
          document.getElementById('kingIcon').src='images/developer.svg';
          document.getElementById('user-developer-info').innerHTML='Разработчик';
        } else if (localStorage.getItem('ali-userType')=='admin') {
          document.getElementById('user-developer-info').style.display='block';
          document.getElementById('user-appsBlock').style.display='block';
          document.getElementById('kingIcon').src='images/moderator.svg';
          document.getElementById('user-developer-info').innerHTML='Модератор';
        } else {
          document.getElementById('kingIcon').style.display='none';
        }
        document.getElementById('CA-userPic').src=userPhoto;
        document.getElementById('user-short-bio').innerHTML='Параметр alwaysLoggedIn включён. (shortBio)';
        document.getElementById('user-bio').innerHTML='Параметр alwaysLoggedIn включён. (bio)';
        if (localStorage.getItem('app-background')!='false') {
          let random = Math.floor(Math.random() * 10) + 1;
          userPage.style.background="linear-gradient(0deg, var(--rgba) 0%, rgba(0,0,0,0) 59%), url(https://thetenstore.ru/images/headers/"+random+".jpg)";
          userPage.style.backgroundPosition = 'center';
          userPage.style.backgroundRepeat = 'no-repeat';
          userPage.style.backgroundSize = 'cover';
        }
      }
      document.getElementById('name').style.display='block';
      if (localStorage.getItem('nameDisplay')=='true') {
        document.getElementById('name').innerHTML='login';
      } else {
        document.getElementById('name').innerHTML = 'alwaysLoggedIn';
      }
      document.getElementById('picDiv').style.display="block";
      document.getElementById('lastButton').innerHTML="<img src='images/logout.svg' class='boxButton-icon'>Выйти";
      document.getElementById('lastButton').style.borderTop='0';
      document.getElementById('boxbtn-library').style.display='flex';
      document.getElementById('boxBtn-account').style.display='flex';
      document.getElementById('themeButton').style.borderBottom='0';
      document.getElementById('themeButton').style.marginTop='0';
      document.getElementById('themeButton').style.borderBottomLeftRadius='0';
      document.getElementById('themeButton').style.borderBottomRightRadius='0';
      document.getElementById('userBox').style.background='linear-gradient(0deg, var(--rgba) 65%, rgba(0,0,0,0) 100%), url(https://thetenstore.ru/images/headers/1.jpg)';
      document.getElementById('userBox').style.backgroundRepeat='no-repeat';
      document.getElementById('userBox').style.backgroundPosition='center';
      document.getElementById('userBox').style.backgroundSize='cover';
      document.getElementById('userbox-email').style.display='block';
      document.getElementById('userPic').src=userPhoto;
      document.getElementById('boxPic').src=userPhoto;
      if (localStorage.getItem('userbox-dontShowEmail')!='true') {
        document.getElementById('userbox-email').innerHTML='alwaysLoggedIn@thetenstore.ru';
      }
    }
  };
}
function logoff() {
  if (localStorage.getItem('login') != null) {
    localStorage.setItem('password', null);
    localStorage.setItem('login', null);
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
  let code = getUrlVars()["code"];
  if (code == '0') {
    let c0 = document.getElementById('CoA-code0');
    c0.style.display = "block";
  } else if (code == '1') {
    let c1 = document.getElementById('CoA-code1');
    c1.style.display = "block";
  }
}
function warningBox (action, text) {
  if (action == 'hide') {
    document.getElementById('CA-warningBox').style.display = 'none';
  } else {
    document.getElementById('CA-warningBox').innerHTML = "<h5 style='color: black; padding: 10px'>" + text + '</h5>';
    document.getElementById('CA-warningBox').style.display = 'block';
  }
}
