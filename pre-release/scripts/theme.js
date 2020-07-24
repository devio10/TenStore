function changeTheme(theme) {
  if (theme == 1) {
    if (localStorage.getItem('theme') == 'black' || localStorage.getItem('theme') == 'dark') {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      let darkTheme = localStorage.getItem('darkTheme');
      if (darkTheme != null) {
        localStorage.setItem('theme', darkTheme);
        document.documentElement.setAttribute('data-theme', darkTheme);
      } else {
        localStorage.setItem('darkTheme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
    if (localStorage.getItem('theme') == 'dark') {
      document.getElementById('themeButton').innerHTML = 'Тёмная тема';
    } else if (localStorage.getItem('theme') == 'black') {
      document.getElementById('themeButton').innerHTML = 'Чёрная тема';
    } else {
      document.getElementById('themeButton').innerHTML = 'Светлая тема';
    }
  } else {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}

function changeAccent(accent) {
  document.documentElement.setAttribute('data-accent', accent);
  localStorage.setItem('accent', accent);
}

function hideAlert () {
  document.getElementById('alert').style.display = "none";
}

function showAlert (text, icon) {
  document.getElementById('alertText').innerHTML = text;
  document.getElementById('alertIcon').src = icon;
  document.getElementById('alert').style.display = "flex";
  setTimeout(hideAlert, 2000);
}

let border;
function theme_light() {
  document.getElementById('themeButton').innerHTML = 'Светлая тема';
  document.documentElement.setAttribute('data-theme', 'light');
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('theme-light').innerHTML = "<img class='check' src='images/check.svg'>";
  document.getElementById('theme-dark').innerHTML = "<h2 class='check2'>Т</h2>";
  document.getElementById('theme-black').innerHTML = "<h2 class='check2'>Ч</h2>";
  document.getElementById('theme-light').style.border = "2px solid rgba(63,166,104,1)";
  document.getElementById('theme-dark').style.border = 0;
  document.getElementById('theme-black').style.border = 0;
  localStorage.setItem('theme', 'light');
  border = "black";
}
function theme_dark() {
  document.getElementById('themeButton').innerHTML = 'Темная тема';
  document.documentElement.setAttribute('data-theme', 'dark');
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('theme-dark').innerHTML = "<img class='check' src='images/check.svg'>";
  document.getElementById('theme-light').innerHTML = "<h2 class='check3'>Б</h2>";
  document.getElementById('theme-black').innerHTML = "<h2 class='check2'>Ч</h2>";
  document.getElementById('theme-dark').style.border = "2px solid rgba(63,166,104,1)";
  document.getElementById('theme-light').style.border = 0;
  document.getElementById('theme-black').style.border = 0;
  localStorage.setItem('theme', 'dark');
  border = "white";
}
function theme_black() {
  document.getElementById('themeButton').innerHTML = 'Черная тема';
  document.documentElement.setAttribute('data-theme', 'black');
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('theme-black').innerHTML = "<img class='check' src='images/check.svg'>";
  document.getElementById('theme-light').innerHTML = "<h2 class='check3'>Б</h2>";
  document.getElementById('theme-dark').innerHTML = "<h2 class='check2'>Ч</h2>";
  document.getElementById('theme-black').style.border = "2px solid rgba(63,166,104,1)";
  document.getElementById('theme-light').style.border = 0;
  document.getElementById('theme-dark').style.border = 0;
  localStorage.setItem('theme', 'black');
  border = "white";
}
function theme_check() {
  theme = localStorage.getItem('theme');
  if (theme == "black") {
    document.documentElement.setAttribute('data-theme', 'black');
    document.getElementById('theme-black').innerHTML = "<img class='check' src='images/check.svg'>";
    document.getElementById('theme-light').innerHTML = "<h2 class='check3'>Б</h2>";
    document.getElementById('theme-dark').innerHTML = "<h2 class='check2'>Ч</h2>";
    document.getElementById('theme-black').style.border = "2px solid rgba(63,166,104,1)";
    document.getElementById('theme-light').style.border = 0;
    document.getElementById('theme-dark').style.border = 0;
    border = "white";
  } else if (theme == "dark") {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('theme-dark').innerHTML = "<img class='check' src='images/check.svg'>";
    document.getElementById('theme-light').innerHTML = "<h2 class='check3'>Б</h2>";
    document.getElementById('theme-black').innerHTML = "<h2 class='check2'>Ч</h2>";
    document.getElementById('theme-dark').style.border = "2px solid rgba(63,166,104,1)";
    document.getElementById('theme-light').style.border = 0;
    document.getElementById('theme-black').style.border = 0;
    border = "white";
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById('theme-light').innerHTML = "<img class='check' src='images/check.svg'>";
    document.getElementById('theme-dark').innerHTML = "<h2 class='check2'>Т</h2>";
    document.getElementById('theme-black').innerHTML = "<h2 class='check2'>Ч</h2>";
    document.getElementById('theme-light').style.border = "2px solid rgba(63,166,104,1)";
    document.getElementById('theme-dark').style.border = 0;
    document.getElementById('theme-black').style.border = 0;
    border = "black";
  }
}
function accent_blue () {
  let accent = 'blue';
  document.documentElement.setAttribute('data-accent', accent);
  localStorage.setItem('accent', accent);
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('accent-reallyBlue').innerHTML = "<img class='check1' src='images/check.svg'>";
  document.getElementById('accent-reallyBlue').style.border = "2px solid " + border;
  document.getElementById('accent-verySilver').innerHTML = "<h2 class='check3'>С</h2>";
  document.getElementById('accent-ohSoOrange').innerHTML = "<h2 class='check3'>О</h2>";
  document.getElementById('accent-red').innerHTML = "<h2 class='check3'>К</h2>";
  document.getElementById('accent-purple').innerHTML = "<h2 class='check3'>Ф</h2>";
  document.getElementById('accent-green').innerHTML = "<h2 class='check3'>З</h2>";
  document.getElementById('accent-verySilver').style.border = 0;
  document.getElementById('accent-ohSoOrange').style.border = 0;
  document.getElementById('accent-red').style.border = 0;
  document.getElementById('accent-purple').style.border = 0;
  document.getElementById('accent-green').style.border = 0;
}
function accent_purple () {
  let accent = 'purple';
  document.documentElement.setAttribute('data-accent', accent);
  localStorage.setItem('accent', accent);
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('accent-purple').innerHTML = "<img class='check1' src='images/check.svg'>";
  document.getElementById('accent-purple').style.border = "2px solid " + border;
  document.getElementById('accent-verySilver').innerHTML = "<h2 class='check3'>С</h2>";
  document.getElementById('accent-ohSoOrange').innerHTML = "<h2 class='check3'>О</h2>";
  document.getElementById('accent-red').innerHTML = "<h2 class='check3'>К</h2>";
  document.getElementById('accent-reallyBlue').innerHTML = "<h2 class='check3'>Г</h2>";
  document.getElementById('accent-green').innerHTML = "<h2 class='check3'>З</h2>";
  document.getElementById('accent-verySilver').style.border = 0;
  document.getElementById('accent-ohSoOrange').style.border = 0;
  document.getElementById('accent-red').style.border = 0;
  document.getElementById('accent-reallyBlue').style.border = 0;
  document.getElementById('accent-green').style.border = 0;
}
function accent_red () {
  let accent = 'red';
  document.documentElement.setAttribute('data-accent', accent);
  localStorage.setItem('accent', accent);
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('accent-red').innerHTML = "<img class='check1' src='images/check.svg'>";
  document.getElementById('accent-red').style.border = "2px solid " + border;
  document.getElementById('accent-verySilver').innerHTML = "<h2 class='check3'>С</h2>";
  document.getElementById('accent-ohSoOrange').innerHTML = "<h2 class='check3'>О</h2>";
  document.getElementById('accent-reallyBlue').innerHTML = "<h2 class='check3'>Г</h2>";
  document.getElementById('accent-purple').innerHTML = "<h2 class='check3'>Ф</h2>";
  document.getElementById('accent-green').innerHTML = "<h2 class='check3'>З</h2>";
  document.getElementById('accent-verySilver').style.border = 0;
  document.getElementById('accent-ohSoOrange').style.border = 0;
  document.getElementById('accent-reallyBlue').style.border = 0;
  document.getElementById('accent-purple').style.border = 0;
  document.getElementById('accent-green').style.border = 0;
}
function accent_orange () {
  let accent = 'ohSoOrange';
  document.documentElement.setAttribute('data-accent', accent);
  localStorage.setItem('accent', accent);
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('accent-ohSoOrange').innerHTML = "<img class='check1' src='images/check.svg'>";
  document.getElementById('accent-ohSoOrange').style.border = "2px solid " + border;
  document.getElementById('accent-verySilver').innerHTML = "<h2 class='check3'>С</h2>";
  document.getElementById('accent-reallyBlue').innerHTML = "<h2 class='check3'>Г</h2>";
  document.getElementById('accent-red').innerHTML = "<h2 class='check3'>К</h2>";
  document.getElementById('accent-purple').innerHTML = "<h2 class='check3'>Ф</h2>";
  document.getElementById('accent-green').innerHTML = "<h2 class='check3'>З</h2>";
  document.getElementById('accent-verySilver').style.border = 0;
  document.getElementById('accent-reallyBlue').style.border = 0;
  document.getElementById('accent-red').style.border = 0;
  document.getElementById('accent-purple').style.border = 0;
  document.getElementById('accent-green').style.border = 0;
}
function accent_green () {
  let accent = 'green';
  document.documentElement.setAttribute('data-accent', accent);
  localStorage.setItem('accent', accent);
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('accent-green').innerHTML = "<img class='check1' src='images/check.svg'>";
  document.getElementById('accent-green').style.border = "2px solid " + border;
  document.getElementById('accent-verySilver').innerHTML = "<h2 class='check3'>С</h2>";
  document.getElementById('accent-ohSoOrange').innerHTML = "<h2 class='check3'>О</h2>";
  document.getElementById('accent-red').innerHTML = "<h2 class='check3'>К</h2>";
  document.getElementById('accent-purple').innerHTML = "<h2 class='check3'>Ф</h2>";
  document.getElementById('accent-reallyBlue').innerHTML = "<h2 class='check3'>Г</h2>";
  document.getElementById('accent-verySilver').style.border = 0;
  document.getElementById('accent-ohSoOrange').style.border = 0;
  document.getElementById('accent-red').style.border = 0;
  document.getElementById('accent-purple').style.border = 0;
  document.getElementById('accent-reallyBlue').style.border = 0;
}
function accent_silver () {
  let accent = 'gray';
  document.documentElement.setAttribute('data-accent', accent);
  localStorage.setItem('accent', accent);
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('accent-verySilver').innerHTML = "<img class='check1' src='images/check.svg'>";
  document.getElementById('accent-verySilver').style.border = "2px solid " + border;
  document.getElementById('accent-reallyBlue').innerHTML = "<h2 class='check3'>Г</h2>";
  document.getElementById('accent-ohSoOrange').innerHTML = "<h2 class='check3'>О</h2>";
  document.getElementById('accent-red').innerHTML = "<h2 class='check3'>К</h2>";
  document.getElementById('accent-purple').innerHTML = "<h2 class='check3'>Ф</h2>";
  document.getElementById('accent-green').innerHTML = "<h2 class='check3'>З</h2>";
  document.getElementById('accent-reallyBlue').style.border = 0;
  document.getElementById('accent-ohSoOrange').style.border = 0;
  document.getElementById('accent-red').style.border = 0;
  document.getElementById('accent-purple').style.border = 0;
  document.getElementById('accent-green').style.border = 0;
}


const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}
const currentAccent = localStorage.getItem('accent') ? localStorage.getItem('accent') : null;
if (currentAccent) {
    document.documentElement.setAttribute('data-accent', currentAccent);
}
