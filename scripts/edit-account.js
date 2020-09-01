var newName;
var newLastName;
var newLogin;
var isNewPhoto = false;

function EditAccount () {
  var newName = document.getElementById('EA-name').value;
  var newLastName = document.getElementById('EA-lastName').value;
  var newLogin = document.getElementById('EA-login').value;
  if (newName.length > 30) {
    alert('Имя слишком длинное. Максимальная длина: 30 символов');
  } else if (newName == 0) {
    alert('Введите имя');
  } else if (newLastName.length > 30) {
    alert('Фамилия слишком длинная. Максимальная длина: 30 символов')
  } else if (newLogin.length < 6) {
    alert('Логин слишком короткий. Минимальная длина: 6 символов')
  } else {
    let action = "QWE2e3FA";
    const request = new XMLHttpRequest();
    const url = "https://thetenstore.ru/api.php";
    var params = new FormData();

    params.append("action", action);
    params.append("login", newLogin);
    params.append("name", newName);
    params.append("lastName", newLastName);
    params.append("isNewPhoto", isNewPhoto);
    params.append("photo", picFile);
    console.log(picFile);
    console.log(newLogin);
    console.log(newName);
    console.log(newLastName);
    console.log(isNewPhoto);
    request.open("POST", url, true);
    request.send(params);
  }
}
