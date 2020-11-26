var mUserPic;
var isPicChanged = false;
let done = false;
let didReadText = false;
function readAsDataByURL(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

function readAsByteArrayByURL(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onloadend = (e) => {
      if (e.target.readyState == FileReader.DONE) {
        let bytesArray = [];
        let array = new Uint8Array(e.target.result);
        for (byte of array) {
          bytesArray.push(byte);
        }
        resolve(bytesArray);
      }
    };
    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}

var picFile;
async function readURL(input) {
  if (input.files && input.files[0]) {
    const picture = await readAsDataByURL(input.files[0]);
    $('#CA-userPic').attr('src', picture);
    picFile = input.files[0];
    console.log(input.files[0]);
  }
}

$("#CA-fileInput").change(function(){
  readURL(this);
  isPicChanged = true;
});
var name;
var lastName;
var login;
var pass;
var email;
function CAFirst () {
  onBlock = 'CA-2step';
  name = document.getElementById('CA-name').value;
  lastName = document.getElementById('CA-lastName').value;
  login = document.getElementById('CA-login').value;
  if ((name == 0) || (lastName == 0) || (login == 0)) {
    warningBox('show', 'Заполните все поля.');
  } else if (login.length < 4) {
    warningBox('show', 'Никнейм слишком короткий. Минимальная длина: 4 символа.');
  } else if (login.length > 30) {
    warningBox('show', 'Никнейм слишком длинный. Максимальная длина: 30 символов.');
  } else if (name.length > 30) {
    warningBox('show', 'Имя слишком длинное. Максимальная длина: 30 символов.');
  } else if (lastName.length > 30) {
    warningBox('show', 'Фамилия слишком длинная. Максимальная длина: 30 символов.');
  } else {
    onBlock = 'CA-2step';
    let prev = document.getElementById('CA-1step');
    let next = document.getElementById('CA-2step');
    prev.style.display = "none";
    next.style.display = "block";
    warningBox('hide');
  }
}
function CASecond () {
  onBlock = 'CA-3step';
  pass = SHA256(document.getElementById('CA-password').value);
  let passRep = SHA256(document.getElementById('CA-repeatPassword').value);
  if ((pass == 0) || (passRep == 0)) {
    warningBox('show', "Заполните все поля.");
  } else if (passRep != pass) {
    warningBox('show', 'Проверьте правильность введённых паролей.');
  } else if (document.getElementById('CA-password').value.length < 8) {
    warningBox('show', 'Пароль слишком короткий. Минимальная длина: 8 символов.');
  } else {
    onBlock = 'CA-3step';
    let prev = document.getElementById('CA-2step');
    let next = document.getElementById('CA-3step');
    prev.style.display = "none";
    next.style.display = "block";
    warningBox('hide');
  }
}
function CAThird () {
  onBlock = 'CA-4step';
  let prev = document.getElementById('CA-3step');
  let next = document.getElementById('CA-4step');
  prev.style.display = "none";
  next.style.display = "block";
  warningBox('hide');
}
function CAFourth () {
  email = document.getElementById('CA-email').value;
  if (email == 0) {
    warningBox('show', 'Введите адрес электронной почты.');
  } else if (validateEmail(email) == false) {
    warningBox('show', 'Неправильный адрес электронной почты.');
  } else {
    onBlock = 'CA-5step';
    let prev = document.getElementById('CA-4step');
    let next = document.getElementById('CA-5step');
    prev.style.display = "none";
    next.style.display = "block";
    warningBox('hide');
  }
}
function CAFifth () {
  var response = grecaptcha.getResponse();
  if(response.length == 0) {
    warningBox('show', 'Бип-бип, боп-боп? Подтвердите, что вы не робот.');
  } else {
    let prev = document.getElementById('CA-5step');
    let next = document.getElementById('CA-6step');
    prev.style.display = "none";
    next.style.display = "block";
    let action = "si8739JI";
    const request = new XMLHttpRequest();
    const url = "https://thetenstore.ru/api.php";
    var params = new FormData();
    params.append("action", action);
    params.append("photo", picFile);
    params.append("login", login);
    params.append("name", name);
    params.append("lastName", lastName);
    params.append("email", email);
    params.append("password", pass);
    params.append("g-recaptcha", response);
    request.open("POST", url, true);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            warningBox('hide');
            localStorage.setItem('login', login);
            localStorage.setItem('password', pass);
            console.log('yee');
            window.open('account-created?code=' + encodeURI(request.responseText), '_self');
          }
    });
    request.send(params);
  }
}
function CACheckLogin () {
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
          document.getElementById('CA-1step').style.display = 'none';
          document.getElementById('CA-alreadyLoggedIn').style.display = 'block';
        }
      }
    }
  };
}
function copy() {
  var copyText = document.querySelector("#copy-pass");
  copyText.select();
  document.execCommand("copy");
}
