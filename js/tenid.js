var loggedIn=false;
function login() {
  var login=localStorage.getItem('login');
  var password=localStorage.getItem('password');
  if (login!=null) {
    var loginID=getXMLHTTP();
    loginID.responseType="json";
    loginID.open('POST', 'https://tstore.space/api.php', true);
    loginID.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    loginID.send("action=h495ujh"+"&login="+login+"&password="+password);
    loginID.onreadystatechange = function() {
      if ((loginID.readyState===4) && (loginID.status===200)) {
        let userData=loginID.response;
        if (userData!=null) {
          loggedIn=true;
          var userEmail=userData.user[0].email;
          var userName=userData.user[0].name+' '+userData.user[0].lastname;
          var userPhoto='https://tstore.space/'+userData.user[0].photo;
          if ((userData.user[0].photo==0)||(userData.user[0].photo==null)) {
            userPhoto='img/user.svg';
          }
          document.getElementById('ub-no-account').style.display='none';
          document.getElementById('ub-top').style.display='flex';
          document.getElementById('hd-user').src=userPhoto;
          document.getElementById('ub-user').src=userPhoto;
          document.getElementById('ub-name').innerText=userName;
          document.getElementById('ub-email').innerText=userEmail;
          document.getElementById('ub-have-account').style.display='block';
          document.getElementById('ub-no-account').style.display='none';
        }
      }
    };
  }
}
function logout() {
  localStorage.removeItem('login');
  localStorage.removeItem('password');
  window.location.reload();
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
