var name;
var lastName;
var login;

function EA (stage) {
  if (stage == 'stage1') {
    var name = document.getElementById('EA-name').value;
    var lastname = document.getElementById('EA-lastName').value;
    var login = document.getElementById('EA-login').value;
    if (name.length > 30) {
      alert('Имя слишком длинное. Максимальная длина: 30 символов');
    } else if (name == 0) {
      alert('Введите имя');
    } else if (lastname.length > 30) {
      alert('Фамилия слишком длинная. Максимальная длина: 30 символов')
    } else if (login.length < 6) {
      alert('Логин слишком короткий. Минимальная длина: 6 символов')
    } else {
      document.getElementById('EA-1step').style.display = "none";
      document.getElementById('EA-2step').style.display = "block";
    }
  } else if (stage == 'stage2') {
    var response = grecaptcha.getResponse();
    if(response.length == 0) {
      alert('show', 'Бип-бип, боп-боп? Подтвердите, что вы не робот.');
    } else {
      if (name != userName) {

      }
      let action = "QWE2e3FA";
      const request = new XMLHttpRequest();
      const url = "https://thetenstore.ru/api.php";
      var params = new FormData();
      params.append("id", userId);
      params.append("loginupd", newLogin);
      params.append("login", userLogin);
      params.append("name", newName);
      params.append("lastName", newLastName);
      params.append("photo", newPhoto);
      request.open("POST", url, true);
      request.addEventListener("readystatechange", () => {
          if (request.readyState === 4 && request.status === 200) {
              warningBox('hide');
            }
      });
      request.send(params);
    }
  }
}
