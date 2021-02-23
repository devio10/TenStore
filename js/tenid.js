function login() {
  let login=localStorage.getItem('login');
  let password=localStorage.getItem('password');
  if (login!=null) {
    var loginID=getXMLHTTP();
    loginID.responseType="json";
    loginID.open('POST', 'https://thetenstore.ru/api.php', true);
    loginID.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    loginID.send("action=h495ujh"+"&login="+login+"&password="+password);
    loginID.onreadystatechange = function() {
      if ((loginID.readyState===4) && (loginID.status===200)) {
        let userData=loginID.response;
        if (userData!=null) {
          var userEmail=userData.user[0].email;
          var userName=userData.user[0].name+' '+userData.user[0].lastname;
          var userPhoto;
          if ((userData.user[0].photo==0)||(userData.user[0].photo==null)) {
            userPhoto='img/user.svg';
          } else {
            userPhoto='https://thetenstore.ru/'+userData.user[0].photo;
          }
          document.getElementById('hd-user').src=userPhoto;
          document.getElementById('ub-user').src=userPhoto;
          document.getElementById('ub-name').innerText=userName;
          document.getElementById('ub-email').innerText=userEmail;
          let logoutbtn=document.getElementById('ub-logout');
          logoutbtn.style.color='#d32f2f';
          logoutbtn.innerText='Выйти из TenID';
          document.getElementById('ub-library').style.display='flex';
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
