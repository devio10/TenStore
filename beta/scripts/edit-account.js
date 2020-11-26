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

var isPicChanged = false;
let done = false;
let didReadText = false;

var isBgChanged = false;
let bgDone = false;
let bgDidReadText = false;
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

/* function readAsByteArrayByURL(file) {
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
*/

var picFile;
var bgFile;
async function readURL(input) {
  if (input.files && input.files[0]) {
    const picture = await readAsDataByURL(input.files[0]);
    $('#CA-userPic').attr('src', picture);
    picFile = input.files[0];
    console.log(input.files[0]);
  }
}
$("#EA-fileInput").change(function(){
  readURL(this);
  isPicChanged = true;
  document.getElementById('all-save').className='accentButton';
});

async function BgReadURL(input) {
  if (input.files && input.files[0]) {
    const picture = await readAsDataByURL(input.files[0]);
    $('#EA-userBg').attr('src', picture);
    picFile = input.files[0];
    console.log(input.files[0]);
  }
}
$("#bg-fileInput").change(function(){
  BgReadURL(this);
  isBgChanged = true;
  document.getElementById('bg-save').className='accentButton';
  document.getElementById('all-save').className='accentButton';
});

function resetFields () {
  document.getElementById('bio-save').className='';
  document.getElementById('main-save').className='';
  document.getElementById('all-save').className='';
}

$("#name-field").change(function() {
  document.getElementById('main-save').className='accentButton';
  document.getElementById('all-save').className='accentButton';
});
$("#lastName-field").change(function() {
  document.getElementById('main-save').className='accentButton';
  document.getElementById('all-save').className='accentButton';
});
$("#bio-field").change(function() {
  document.getElementById('bio-save').className='accentButton';
  document.getElementById('all-save').className='accentButton';
});
$("#shortBio-field").change(function() {
  document.getElementById('bio-save').className='accentButton';
  document.getElementById('all-save').className='accentButton';
});
