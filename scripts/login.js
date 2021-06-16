var userLogin;
function LALogin () {
  let action='h495ujh';
  var login=document.getElementById("login").value;
  var password=SHA256(document.getElementById("password").value);
  var request=getXMLHTTP();
  request.responseType =	"json";
  request.open('POST', 'https://tstore.space/api.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send("action="+action+"&login="+encodeURIComponent(login)+"&password="+encodeURIComponent(password));
  request.onreadystatechange = function() {
    if ((request.readyState===4) && (request.status===200)) {
      console.log(request.readyState+' '+request.status);
      let obj=request.response;
      if (obj!=null) {
        warningBox('hide');
        userLogin=obj.user[0].login;
        console.log(userLogin+' '+obj.user[0].login);
        if (obj.user[0].photo!=0) {
          document.getElementById("LA-userPic").src = "https://tstore.space/" + obj.user[0].photo;
        }
        document.getElementById("LA-name").innerHTML=obj.user[0].name+" "+obj.user[0].lastname;
        document.getElementById('LA-1step').style.display='none';
        document.getElementById('LA-2step').style.display='block';
      }
    } else {
      warningBox('show', 'Неправильные данные для входа.');
    }
  };
}
function LASave () {
  var password=SHA256(document.getElementById("password").value);
  localStorage.setItem('login', userLogin);
  localStorage.setItem('password', password);
  localStorage.setItem('tenid-version', 1100);
  goBack();
}
function notMe () {
  let y = document.getElementById('LA-2step');
  let x = document.getElementById('LA-1step');
  y.style.display = "none";
  x.style.display = "block";
}
function LAcheckLogin () {
  var password = localStorage.getItem('password');
  var login = localStorage.getItem('login');
  let action = 'h495ujh';
  var request = getXMLHTTP();
  request.responseType =	"json";
  request.open('POST', 'api.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send("action=" + action + "&login=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password));
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if(request.status == 200) {
        let obj = request.response;
        if (obj.user[0].login != null) {
          window.open('index', '_self');
        }
      }
    }
  };
}
