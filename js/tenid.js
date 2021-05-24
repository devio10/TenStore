var loggedIn=false;
function login() {
  let login=localStorage.getItem('login');
  let password=localStorage.getItem('password');
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
          let logoutbtn=document.getElementById('ub-logout');
          logoutbtn.innerText='Выйти из TenID';
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
