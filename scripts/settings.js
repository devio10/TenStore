function setTheme(theme, isAutoDarkTheme) {
  showAlert('Тема сохранена.', 'images/check.svg');
  document.getElementById('theme-light').innerHTML="";
  document.getElementById('theme-dark').innerHTML="";

  document.getElementById('theme-light').style.outline = 0;
  document.getElementById('theme-dark').style.outline = 0;

  document.getElementById('theme-light').style.boxShadow='var(--shadow1)';
  document.getElementById('theme-dark').style.boxShadow='var(--shadow1)';
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
  if (isAutoDarkTheme!=true) {
    document.getElementById('s-autoDarkTheme').checked = false;
  }
  document.getElementById(themeId).innerHTML="<i class='ph-check "+checkId+"'></i>";
  document.getElementById(themeId).style.boxShadow='0px 0px 15px 2px var(--accent)';
  document.getElementById(themeId).style.outline="2px solid var(--accent)";
  chosenAccent.style.outline="2px solid "+border;
}
function autoDarkTheme() {
  if (localStorage.getItem('autoDarkTheme')!='true') {
    if (userPrefersDark) {
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

function setAccent(accentId, accent, accentLight, accentDark) {
  removeHighlights('accent');
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accent-light', accentLight);
  document.documentElement.style.setProperty('--accent-dark', accentDark);

  document.getElementById('accent-'+accentId).innerHTML="<i class='ph-check check1'></i>";
  document.getElementById('accent-'+accentId).style.outline="2px solid "+border;
  document.getElementById('accent-'+accentId).style.borderRadius='0';
  document.getElementById('accent-'+accentId).style.boxShadow="0px 0px 15px 2px var(--accent)";
  chosenAccent=document.getElementById('accent-'+accentId);

  localStorage.setItem('accent', accent);
  localStorage.setItem('accent-light', accentLight);
  localStorage.setItem('accent-dark', accentDark);
  localStorage.setItem('accent-id', accentId);

  showAlert('Тема сохранена.', 'images/check.svg');
}

function changeSetting (par, val, isLabel) {
  let choice;
  let negativeChoice;
  if (val==null) {
      //если не задаётся конкретное значение
      if (localStorage.getItem(par)=='true') {
        localStorage.setItem(par, 'false');
        choice='false';
        choiceLabel='Выключено';
        negativeChoice='true';
      } else if (localStorage.getItem(par)=='false') {
        localStorage.setItem(par, 'true');
        choice='true';
        choiceLabel='Включено';
        negativeChoice='false';
      } else {
        localStorage.setItem(par, 'true');
        choice='true';
        choiceLabel='Включено';
        negativeChoice='false';
      }
      if (par == 'slow-device') {
        document.documentElement.setAttribute('slow-device', choice);
      }
  } else {
    localStorage.setItem(par, val);
  }
  if ((par=='slow-device')||(par=='save-traffic')) {
    document.getElementById('l-'+par).innerText=choiceLabel;
  }
}


function checkSwitch(name, argum, isLabel) {
  if (localStorage.getItem(name)==argum) {
    document.getElementById('s-'+name).checked=argum;
  }
  if (isLabel=='true') {
    if (localStorage.getItem(name)=='true') {
      document.getElementById('l-'+name).innerText='Включено';
    } else {
      document.getElementById('l-'+name).innerText='Выключено';
    }
  }
}
function checkSwitches() {
  /*прочее*/
  checkSwitch('slow-device', 'true', 'true');
  checkSwitch('save-traffic', 'true', 'true');

  /*персонализация*/
  checkSwitch('autoDarkTheme', 'true');

  /*аккаунт*/
  checkSwitch('nameDisplay', 'true');
  checkSwitch('dev-link', 'true');

  /*полигон*/
  // TODO: появление рычага fake user, если включена настройка
  checkSwitch('alwaysLoggedIn', 'true');
  checkSwitch('mobileVersion', 'true');
  checkSwitch('debug-noAppPageRedirect', 'true');
  checkSwitch('debug-noAppPageProhibit', 'true');
  let objUseBeta=document.getElementById('use-beta');
  let dataChannel=localStorage.getItem('channel');
  if (dataChannel=='pre') {
    document.getElementById('pre').checked=true;
    objUseBeta.style.display='block';
  } else if (dataChannel=='beta') {
    document.getElementById('beta').checked=true;
    objUseBeta.style.display='block';
  } else {
    document.getElementById('release').checked=true;
  }
}
function currentThemeCheck () {
  /*тема*/
  if ((localStorage.getItem('autoDarkTheme')=='true')&&(userPrefersDark)) {
    theme='dark';
  } else {
    theme=localStorage.getItem('theme');
    if (theme==null) {
      theme='light';
    }
  }
  document.getElementById('theme-'+theme).innerHTML="<i class='ph-check check'></i>";
  document.getElementById('theme-'+theme).style.outline="2px solid var(--accent)";
  document.getElementById('theme-'+theme).style.boxShadow='0px 0px 15px 2px var(--accent)';
  border="white";
  if (theme=='light') {
    border='black';
  }
  let currentAccent=document.getElementById('accent-'+localStorage.getItem('accent-id'));
  if (localStorage.getItem('accent-id')==null) {
    currentAccent=document.getElementById('accent-blue');
  }
  currentAccent.innerHTML="<i class='ph-check check1'></i>";
  currentAccent.style.outline="2px solid "+border;
  currentAccent.style.borderRadius="0";
  currentAccent.style.boxShadow='0px 0px 15px 2px var(--accent)';
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
  document.getElementById('settings-other').style.display='none';
  document.getElementById('settings-debug').style.display='none';

  document.getElementById('item-personal').className='tab-2';
  document.getElementById('item-account').className='tab-2';
  document.getElementById('item-other').className='tab-2';
  document.getElementById('item-debug').className='tab-2';

  document.getElementById('settings-'+tab).style.display='block';
  document.getElementById('item-'+tab).className='tab-2 selected-tab-2';
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

    blue.style.borderRadius='5px';
    purple.style.borderRadius='5px';
    red.style.borderRadius='5px';
    orange.style.borderRadius='5px';
    green.style.borderRadius='5px';
    pink.style.borderRadius='5px';
    indigo.style.borderRadius='5px';
    cyan.style.borderRadius='5px';
    lightGreen.style.borderRadius='5px';
    yellow.style.borderRadius='5px';
    brown.style.borderRadius='5px';
    grey.style.borderRadius='5px';
    blueGrey.style.borderRadius='5px';

    blue.style.boxShadow='var(--shadow1)';
    purple.style.boxShadow='var(--shadow1)';
    red.style.boxShadow='var(--shadow1)';
    orange.style.boxShadow='var(--shadow1)';
    green.style.boxShadow='var(--shadow1)';
    pink.style.boxShadow='var(--shadow1)';
    indigo.style.boxShadow='var(--shadow1)';
    cyan.style.boxShadow='var(--shadow1)';
    lightGreen.style.boxShadow='var(--shadow1)';
    yellow.style.boxShadow='var(--shadow1)';
    brown.style.boxShadow='var(--shadow1)';
    grey.style.boxShadow='var(--shadow1)';
    blueGrey.style.boxShadow='var(--shadow1)';
  }
}
