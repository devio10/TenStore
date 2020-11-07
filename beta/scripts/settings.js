function setTheme(theme, isAutoDarkTheme) {
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('theme-light').innerHTML="";
  document.getElementById('theme-dark').innerHTML="";
  document.getElementById('theme-black').innerHTML="";
  document.getElementById('theme-light').style.outline = 0;
  document.getElementById('theme-dark').style.outline = 0;
  document.getElementById('theme-black').style.outline = 0;
  document.getElementById('theme-auto').style.outline = 0;
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  changeSetting('autoDarkTheme', 'false');
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
  if (isAutoDarkTheme==true) {
    themeId='theme-auto';
  }
  if (isAutoDarkTheme!=true) {
    document.getElementById(themeId).innerHTML="<img class='"+checkId+"' src='images/check.svg'>";
  }
  document.getElementById(themeId).style.outline="2px solid var(--accent)";
  chosenAccent.style.outline="2px solid "+border;
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

function setAccentOld(accent) {
  document.getElementById('accent-blue').innerHTML="";
  document.getElementById('accent-orange').innerHTML="";
  document.getElementById('accent-red').innerHTML="";
  document.getElementById('accent-purple').innerHTML="";
  document.getElementById('accent-green').innerHTML="";
  document.getElementById('accent-custom').innerHTML="<img class='check1' src='images/custom.svg'>";
  document.getElementById('accent-blue').style.outline='0px solid ';
  document.getElementById('accent-orange').style.outline='none';
  document.getElementById('accent-red').style.outline='none';
  document.getElementById('accent-purple').style.outline='none';
  document.getElementById('accent-green').style.outline='none';
  document.getElementById('accent-custom').style.outline='none';
  if (accent=='custom') {
    document.getElementById('accent-custom').innerHTML="<img class='check1' src='images/check.svg'>";
    document.getElementById('accent-custom').style.outline="2px solid "+border;
    chosenAccent=document.getElementById('accent-custom');
    document.documentElement.style.setProperty('--accent', document.getElementById("colorPicker").value);
    document.documentElement.style.setProperty('--accent-light', document.getElementById("colorPicker").value);
    document.documentElement.style.setProperty('--accent-dark', document.getElementById("colorPicker").value);
    showAlert('Тема сохранена.', 'images/check.svg');
  } else {
    document.getElementById('accent-'+accent).innerHTML="<img class='check1' src='images/check.svg'>";
    document.getElementById('accent-'+accent).style.outline="2px solid "+border;
    chosenAccent=document.getElementById('accent-'+accent);
    localStorage.setItem('accent', accent);
    document.documentElement.setAttribute('data-accent', accent);
    showAlert('Тема сохранена.', 'images/check.svg');
  }
}
function setAccent(accentId, accent, accentLight, accentDark) {
  removeHighlights('accent');
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accent-light', accentLight);
  document.documentElement.style.setProperty('--accent-dark', accentDark);

  document.getElementById('accent-'+accentId).innerHTML="<i class='ph-check check1'></i>";
  document.getElementById('accent-'+accentId).style.outline="2px solid "+border;
  chosenAccent=document.getElementById('accent-'+accentId);

  localStorage.setItem('accent', accent);
  localStorage.setItem('accent-light', accentLight);
  localStorage.setItem('accent-dark', accentDark);
  localStorage.setItem('accent-id', accentId);

  showAlert('Тема сохранена.', 'images/check.svg');
}

function changeSetting (par, val) {
  let choice;
  if (val==null) {
      //если не задаётся конкретное значение
      if (localStorage.getItem(par)=='true') {
        localStorage.setItem(par, 'false');
        choice='false';
      } else if (localStorage.getItem(par)=='false') {
        localStorage.setItem(par, 'true');
        choice='true';
      } else {
        localStorage.setItem(par, 'true');
        choice='true';
      }
      if (par=='newFont') {
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
  if (localStorage.getItem('nameDisplay')=='true') {
    document.getElementById('s-nameDisplay').checked=true;
  }
  if (localStorage.getItem('userbox-dontShowEmail')=='true') {
    document.getElementById('s-dontShowEmail').checked=true;
  }

  /* шрифт */
  if (localStorage.getItem('newFont') == 'true') {
    document.getElementById('s-newFont').checked = true;
  }

  /* экспериментальные функции */
  if (localStorage.getItem('appsListSort')=='true') {
    document.getElementById('s-appsListSort').checked=true;
  }
  if (localStorage.getItem('analytics')=='true') {
    document.getElementById('s-analytics').checked=true;
  }
  if (localStorage.getItem('autoDarkTheme')=='true') {
    document.getElementById('theme-light').innerHTML="";
    document.getElementById('theme-dark').innerHTML="";
    document.getElementById('theme-black').innerHTML="";
    document.getElementById('theme-light').style.outline = 0;
    document.getElementById('theme-dark').style.outline = 0;
    document.getElementById('theme-black').style.outline = 0;
    document.getElementById('theme-auto').style.outline="2px solid var(--accent)";
  }
  if (localStorage.getItem('alwaysLoggedIn')=='true') {
    document.getElementById('s-alwaysLoggedIn').checked=true;
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
  if (localStorage.getItem('alUpdates')=='true') {
    document.getElementById('s-alUpdates').checked=true;
  }
  if (localStorage.getItem('alUpdates2')=='true') {
    document.getElementById('s-alUpdates2').checked=true;
  }
  if (localStorage.getItem('mailSpam')=='true') {
    document.getElementById('s-mailSpam').checked=true;
  }

  if (localStorage.getItem('mobileVersion')=='true') {
    document.getElementById('s-mobileVersion').checked=true;
  }
  if (localStorage.getItem('debug-newVersionPopup')=='true') {
    document.getElementById('s-debug-newVersionPopup').checked=true;
  }
  if (localStorage.getItem('beta-mobileSearch')=='true') {
    document.getElementById('s-beta-mobileSearch').checked=true;
  }
  if (localStorage.getItem('debug-noAppPageRedirect')=='true') {
    document.getElementById('s-debug-noAppPageRedirect').checked=true;
  }
  if (localStorage.getItem('debug-noAppPageProhibit')=='true') {
    document.getElementById('s-debug-noAppPageProhibit').checked=true;
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
  document.getElementById('item-personal').style.fontFamily='var(--bold)';
  /*тема*/
  if ((localStorage.getItem('autoDarkTheme')=='true')&&(userPrefersDark)) {
    theme=localStorage.getItem('night-theme');
  } else {
    theme=localStorage.getItem('theme');
    if (theme==null) {
      theme='light';
    }
  }
  document.getElementById('theme-'+theme).innerHTML="<img class='check' src='images/check.svg'>";
  document.getElementById('theme-'+theme).style.outline="2px solid var(--accent)";
  border="white";
  if (theme=='light') {
    border='black';
  }
  let currentAccent=document.getElementById('accent-'+localStorage.getItem('accent-id'));
  currentAccent.innerHTML="<i class='ph-check check1'></i>";
  currentAccent.style.outline="2px solid "+border;
  chosenAccent=currentAccent;
  /*
  let accent='blue';
  if (localStorage.getItem('accent')!=null) {
    accent=localStorage.getItem('accent');
  }

  document.getElementById("colorPicker").value=localStorage.getItem('custom-accent');
  document.getElementById('accent-custom').style.background=localStorage.getItem('custom-accent');
  if (accent=='custom') {
    document.getElementById('accent-custom').innerHTML="<img class='check1' src='images/check.svg'>";
    document.getElementById('accent-custom').style.outline="2px solid "+border;
    chosenAccent=document.getElementById('accent-custom');
  } else {
    document.getElementById('accent-'+accent).innerHTML="<img class='check1' src='images/check.svg'>";
    document.getElementById('accent-'+accent).style.outline="2px solid "+border;
    chosenAccent=document.getElementById('accent-'+accent);
  }
  */
}

function changeTab(tab, tabName) {
  document.getElementById('settings-personal').style.display='none';
  document.getElementById('settings-account').style.display='none';
  document.getElementById('settings-apps').style.display='none';
  document.getElementById('settings-other').style.display='none';
  document.getElementById('settings-debug').style.display='none';

  document.getElementById('item-personal').style.fontFamily='var(--regular)';
  document.getElementById('item-account').style.fontFamily='var(--regular)';
  document.getElementById('item-apps').style.fontFamily='var(--regular)';
  document.getElementById('item-other').style.fontFamily='var(--regular)';
  document.getElementById('item-debug').style.fontFamily='var(--regular)';

  document.getElementById('item-personal').className='settings-nav-item';
  document.getElementById('item-account').className='settings-nav-item';
  document.getElementById('item-apps').className='settings-nav-item';
  document.getElementById('item-other').className='settings-nav-item';
  document.getElementById('item-debug').className='settings-nav-item';

  document.getElementById('settings-'+tab).style.display='block';
  document.getElementById('item-'+tab).style.fontFamily='var(--bold)';
  document.getElementById('item-'+tab).className='settings-nav-item chosen-nav-item';
  document.getElementById('settings-title').innerHTML=tabName;
}

function removeHighlights (category) {
  if (category=='accent') {
    let blue=document.getElementById('accent-blue');
    let purple=document.getElementById('accent-purple');
    let red=document.getElementById('accent-red');
    let orange=document.getElementById('accent-orange');
    let green=document.getElementById('accent-green');
    let pink=document.getElementById('accent-pink');
    let indigo=document.getElementById('accent-indigo');
    let cyan=document.getElementById('accent-cyan');
    let lightGreen=document.getElementById('accent-light-green');
    let yellow=document.getElementById('accent-yellow');
    let brown=document.getElementById('accent-brown');
    let grey=document.getElementById('accent-grey');
    let blueGrey=document.getElementById('accent-blue-grey');
    let custom=document.getElementById('accent-custom');

    blue.innerHTML='';
    purple.innerHTML='';
    red.innerHTML='';
    orange.innerHTML='';
    green.innerHTML='';
    pink.innerHTML='';
    indigo.innerHTML='';
    cyan.innerHTML='';
    lightGreen.innerHTML='';
    yellow.innerHTML='';
    brown.innerHTML='';
    grey.innerHTML='';
    blueGrey.innerHTML='';
    custom.innerHTML="<i class='ph-dots-three-outline check1'></i>";

    blue.style.outline='';
    purple.style.outline='';
    red.style.outline='';
    orange.style.outline='';
    green.style.outline='';
    pink.style.outline='';
    indigo.style.outline='';
    cyan.style.outline='';
    lightGreen.style.outline='';
    yellow.style.outline='';
    brown.style.outline='';
    grey.style.outline='';
    blueGrey.style.outline='';
    custom.style.outline='';
  }
}
