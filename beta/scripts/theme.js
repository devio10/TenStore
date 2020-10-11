if (localStorage.getItem('newFont')=='true') {
  document.documentElement.setAttribute('data-oldFont','true');
}
if (localStorage.getItem('effects-shadows')=='false') {
  document.documentElement.setAttribute('effects-shadows','false');
}
if (localStorage.getItem('effects-blur')=='false') {
  document.documentElement.setAttribute('effects-blur','false');
}
if (localStorage.getItem('effects-animations')=='false') {
  document.documentElement.setAttribute('effects-animations','false');
}
let chosenAccent;
let newTheme;
let themeName;
let piece1="<img src='images/";
let piece2=".svg' class='boxButton-icon'>";
function changeTheme(theme) {
  localStorage.setItem('autoDarkTheme', 'false');
  if (theme==1) {
    themeName='Чёрная тема';
    if ((localStorage.getItem('theme')=='black')||(localStorage.getItem('theme')=='dark')) {
      localStorage.setItem('theme','light');
      document.documentElement.setAttribute('data-theme', 'light');
      newTheme='light';
      themeName='Светлая тема';
    } else {
      newTheme=localStorage.getItem('night-theme');
      if ((newTheme==null)||(newTheme=='dark')) {
        newTheme='dark';
        themeName='Тёмная тема';
      }
      localStorage.setItem('theme',newTheme);
      document.documentElement.setAttribute('data-theme',newTheme);
    }
    document.getElementById('themeButton').innerHTML=piece1+newTheme+piece2+themeName;
  }
}

function hideAlert () {
  document.getElementById('alert').style.display = "none";
  document.getElementById('alert-button-cancel').style.display = "none";
  document.getElementById('alert-button-confirm').style.display = "none";
}

function showAlert (text, icon, action) {
  document.getElementById('alertText').innerHTML = text;
  document.getElementById('alertIcon').src = icon;
  document.getElementById('alert').style.display = "flex";
  setTimeout(hideAlert, 2000);
  if (action == "logout") {
    document.getElementById('alert-button-confirm').style.display = "block";
    document.getElementById('alert-button-cancel').style.display = "block";
    document.getElementById('alert-button-cancel').onclick = "hideAlert()";
    document.getElementById('alert-button-confirm').onclick = "logoff()";
  }
}
function ub_themeBtn() {
  let localTheme = localStorage.getItem('theme');

  if (localTheme == 'dark') {
    document.getElementById('themeButton').innerHTML = "<img src='images/dark.svg' class='boxButton-icon'>Тёмная тема";
  } else if (localTheme == 'black') {
    document.getElementById('themeButton').innerHTML = "<img src='images/black.svg' class='boxButton-icon'>Чёрная тема";
  } else if (userPrefersDark){
    if (localStorage.getItem('night-theme')=='dark') {
      document.getElementById('themeButton').innerHTML = "<img src='images/dark.svg' class='boxButton-icon'>Тёмная тема";
    } else {
      document.getElementById('themeButton').innerHTML = "<img src='images/black.svg' class='boxButton-icon'>Чёрная тема";
    }
  } else {
    document.getElementById('themeButton').innerHTML = "<img src='images/light.svg' class='boxButton-icon'>Светлая тема";
  }

}

const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
if ((userPrefersDark)&&(localStorage.getItem('autoDarkTheme')=='true')){
    document.documentElement.setAttribute('data-theme', localStorage.getItem('night-theme'));
} else if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}


const currentAccent = localStorage.getItem('accent') ? localStorage.getItem('accent') : null;
if (localStorage.getItem('accent')=='custom') {
  document.documentElement.style.setProperty('--accent', localStorage.getItem('custom-accent'));
  document.documentElement.style.setProperty('--accent-light', localStorage.getItem('custom-accent'));
  document.documentElement.style.setProperty('--accent-dark', localStorage.getItem('custom-accent'));
} else if (currentAccent) {
    document.documentElement.setAttribute('data-accent', currentAccent);
}
