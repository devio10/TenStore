function setTheme(theme) {
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('theme-light').innerHTML="<h2 class='check'>Б</h2>";
  document.getElementById('theme-dark').innerHTML="<h2 class='check2'>Т</h2>";
  document.getElementById('theme-black').innerHTML="<h2 class='check2'>Ч</h2>";
  document.getElementById('theme-light').style.border = 0;
  document.getElementById('theme-dark').style.border = 0;
  document.getElementById('theme-black').style.border = 0;
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  let themeId;
  let checkId='check';
  if (theme=='light') {
    themeId='theme-light';
    checkId='check';
  } else if(theme=='dark') {
    themeId='theme-dark';
    localStorage.setItem('night-theme', 'dark');
  } else {
    themeId='theme-black';
    localStorage.setItem('night-theme', 'black');
  }
  document.getElementById(themeId).style.border="2px solid rgba(63,166,104,1)";
  document.getElementById(themeId).innerHTML="<img class='"+checkId+"' src='images/check.svg'>";
}

function getDefault (dSetting) {
  if (dSetting == 'newFont') {
    return "false";
  } else {
    return "true";
  }
}

function changeSetting (par, val) {
  let choice;
  console.log(localStorage.getItem(par));
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
    console.log('val != null');
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
  if (localStorage.getItem('appBg') == 'true') {
    document.getElementById('s-appBg').checked = true;
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
