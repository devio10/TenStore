function setTheme(theme, isAutoDarkTheme) {
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('theme-light').innerHTML="";
  document.getElementById('theme-dark').innerHTML="";
  document.getElementById('theme-black').innerHTML="";
  document.getElementById('theme-light').style.border = 0;
  document.getElementById('theme-dark').style.border = 0;
  document.getElementById('theme-black').style.border = 0;
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  changeSetting('autoDarkTheme', 'false');
  if (isAutoDarkTheme!=true) {
    document.getElementById('s-autoDarkTheme').checked = false;
  }
  let themeId;
  let checkId='check';
  border="white";
  if (theme=='light') {
    themeId='theme-light';
    checkId='check';
    border='black';
  } else if(theme=='dark') {
    themeId='theme-dark';
    localStorage.setItem('night-theme', 'dark');
  } else {
    themeId='theme-black';
    localStorage.setItem('night-theme', 'black');
  }
  document.getElementById(themeId).style.border="2px solid rgba(63,166,104,1)";
  document.getElementById(themeId).innerHTML="<img class='"+checkId+"' src='images/check.svg'>";
  chosenAccent.style.border="2px solid "+border;
}
function autoDarkTheme() {
  if (localStorage.getItem('autoDarkTheme') == 'false') {
    if ((userPrefersDark)&&(localStorage.getItem('night-mode')=='black')){
      setTheme('black',true);
    } else if ((userPrefersDark)&&(localStorage.getItem('night-mode')=='dark')) {
      setTheme('dark',true);
    } else {
      setTheme('light',true);
    }
  }
}

function getDefault (dSetting) {
  if (dSetting == 'newFont') {
    return "false";
  } else {
    return "true";
  }
}

function setAccent(accent) {
  document.getElementById('accent-blue').innerHTML="";
  document.getElementById('accent-orange').innerHTML="";
  document.getElementById('accent-red').innerHTML="";
  document.getElementById('accent-purple').innerHTML="";
  document.getElementById('accent-green').innerHTML="";
  document.getElementById('accent-custom').innerHTML="<img class='check1' src='images/custom.svg'>";
  document.getElementById('accent-blue').style.border="";
  document.getElementById('accent-orange').style.border="";
  document.getElementById('accent-red').style.border="";
  document.getElementById('accent-purple').style.border="";
  document.getElementById('accent-green').style.border="";
  document.getElementById('accent-custom').style.border="";
  if (accent=='custom') {
    document.getElementById('accent-custom').innerHTML="<img class='check1' src='images/check.svg'>";
    document.getElementById('accent-custom').style.border="2px solid "+border;
    chosenAccent=document.getElementById('accent-custom');
    document.documentElement.style.setProperty('--accent', document.getElementById("colorPicker").value);
    document.documentElement.style.setProperty('--accent-light', document.getElementById("colorPicker").value);
    document.documentElement.style.setProperty('--accent-dark', document.getElementById("colorPicker").value);
    showAlert('Тема сохранена.', 'images/check.svg');
  } else {
    document.getElementById('accent-'+accent).innerHTML="<img class='check1' src='images/check.svg'>";
    document.getElementById('accent-'+accent).style.border="2px solid "+border;
    chosenAccent=document.getElementById('accent-'+accent);
    localStorage.setItem('accent', accent);
    document.documentElement.setAttribute('data-accent', accent);
    showAlert('Тема сохранена.', 'images/check.svg');
  }
}

function changeSetting (par, val) {
  let choice;
  if (val == null) {
      //если не задаётся конкретное значение
      if (localStorage.getItem(par) == 'true') {
        localStorage.setItem(par, 'false');
        choice = 'false';
      } else if (localStorage.getItem(par) == 'false') {
        localStorage.setItem(par, 'true');
        choice = 'true';
      } else {
        localStorage.setItem(par, 'true');
        choice = 'true';
      }
      if (par == 'newFont') {
        //если изменяется шрифт
        document.documentElement.setAttribute('data-oldFont', choice);
      } else if (par == 'effects-shadows') {
        document.documentElement.setAttribute('effects-shadows', choice);
      } else if (par == 'effects-blur') {
        document.documentElement.setAttribute('effects-blur', choice);
      } else if (par == 'effects-animations') {
        document.documentElement.setAttribute('effects-animations', choice);
      }
  } else {
    localStorage.setItem(par, val);
  }
}

function checkSwitches() {
  /* платформа */
  if (localStorage.getItem('platform') == 'android') {
    document.getElementById('r2').checked = true;
  } else {
    document.getElementById('r1').checked = true;
  }

  /* эффекты */
  if (localStorage.getItem('effects-blur') == 'false') {
    document.getElementById('s-blur').checked = false;
  }
  if (localStorage.getItem('effects-shadows') == 'false') {
    document.getElementById('s-shadows').checked = false;
  }
  if (localStorage.getItem('effects-animations') == 'false') {
    document.getElementById('s-animations').checked = false;
  }

  /* потребление трафика */
  if (localStorage.getItem('app-background') == 'false') {
    document.getElementById('s-app-background').checked = false;
  }

  /* блок пользователя */
  if (localStorage.getItem('nameDisplay') == 'true') {
    document.getElementById('s-nameDisplay').checked = true;
  }

  /* шрифт */
  if (localStorage.getItem('newFont') == 'true') {
    document.getElementById('s-newFont').checked = true;
  }

  /* экспериментальные функции */
  if (localStorage.getItem('appsListSort') == 'true') {
    document.getElementById('s-appsListSort').checked = true;
  }
  if (localStorage.getItem('analytics') == 'true') {
    document.getElementById('s-analytics').checked = true;
  }
  if (localStorage.getItem('autoDarkTheme') == 'true') {
    document.getElementById('s-autoDarkTheme').checked = true;
  }

  /* канал */
  if (localStorage.getItem('channel') == 'pre') {
    document.getElementById('pre').checked = true;
  } else if (localStorage.getItem('channel') == 'beta') {
    document.getElementById('beta').checked = true;
  } else {
    document.getElementById('release').checked = true;
  }

  /* уведомления */
  if (localStorage.getItem('alUpdates') == 'true') {
    document.getElementById('s-alUpdates').checked = true;
  }
  if (localStorage.getItem('alUpdates2') == 'true') {
    document.getElementById('s-alUpdates2').checked = true;
  }
  if (localStorage.getItem('mailSpam') == 'true') {
    document.getElementById('s-mailSpam').checked = true;
  }
}
function onchangef() {
  document.getElementById("colorPicker").onchange = function() {
    document.documentElement.style.setProperty('--accent', document.getElementById("colorPicker").value);
    document.documentElement.style.setProperty('--accent-light', document.getElementById("colorPicker").value);
    document.documentElement.style.setProperty('--accent-dark', document.getElementById("colorPicker").value);
    document.getElementById('accent-custom').style.background = document.getElementById("colorPicker").value;
    localStorage.setItem('accent', 'custom');
    localStorage.setItem('custom-accent', document.getElementById("colorPicker").value);
  }
}

function currentThemeCheck () {
  /*тема*/
  if ((localStorage.getItem('autoDarkTheme')=='true')&&(userPrefersDark)) {
    theme=localStorage.getItem('night-theme');
  } else {
    theme=localStorage.getItem('theme');
    if (theme==null) {
      theme='light';
    }
  }
  console.log(theme);
  document.getElementById('theme-'+theme).innerHTML = "<img class='check' src='images/check.svg'>";
  document.getElementById('theme-'+theme).style.border = "2px solid rgba(63,166,104,1)";
  border="white";
  if (theme=='light') {
    border='black';
  }

  let accent='blue';
  /*акцент*/
  console.log(localStorage.getItem('accent'));
  if (localStorage.getItem('accent')!=null) {
    accent=localStorage.getItem('accent');
  }

  document.getElementById("colorPicker").value=localStorage.getItem('custom-accent');
  document.getElementById('accent-custom').style.background=localStorage.getItem('custom-accent');
  if (accent=='custom') {
    document.getElementById('accent-custom').innerHTML="<img class='check1' src='images/check.svg'>";
    document.getElementById('accent-custom').style.border="2px solid "+border;
    chosenAccent=document.getElementById('accent-custom');
  } else {
    document.getElementById('accent-'+accent).innerHTML="<img class='check1' src='images/check.svg'>";
    document.getElementById('accent-'+accent).style.border="2px solid "+border;
    chosenAccent=document.getElementById('accent-'+accent);
  }
}
