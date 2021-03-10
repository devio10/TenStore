let currentTheme=localStorage.getItem('dark-theme');
function toggleDarkTheme (place) {
  currentTheme=localStorage.getItem('dark-theme');
  if (currentTheme!='true') {
    localStorage.setItem('dark-theme', 'true');
    document.documentElement.setAttribute('dark-theme', 'true');
    if (place=='ub') {
      document.getElementById('s-theme-sw').checked=true;
    } else {
      document.getElementById('ub-theme-sw').checked=true;
    }
  } else {
    localStorage.setItem('dark-theme', 'false');
    document.documentElement.setAttribute('dark-theme', 'false');
    if (place=='ub') {
      document.getElementById('s-theme-sw').checked=false;
    } else {
      document.getElementById('ub-theme-sw').checked=false;
    }
  }
}

const userPrefersDark=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
function checkTheme () {
  if ((localStorage.getItem('autoDarkTheme')!='false')&&(userPrefersDark)) {
    document.documentElement.setAttribute('dark-theme', 'true');
    document.getElementById('ub-theme-sw').checked=true;
    document.getElementById('s-theme-sw').checked=true;
    document.getElementById('adt-help').style.display='block';
  } else if (localStorage.getItem('autoDarkTheme')!='false') {
    document.getElementById('ub-theme-sw').checked=false;
    document.getElementById('s-theme-sw').checked=false;
    document.getElementById('adt-help').style.display='block';
  } else if (currentTheme=='true') {
    document.documentElement.setAttribute('dark-theme', 'true');
    document.getElementById('ub-theme-sw').checked=true;
    document.getElementById('s-theme-sw').checked=true;
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme=e.matches?'dark':'light';
    if (newColorScheme=='dark') {
      document.getElementById('tab-icon').href='img/store-dark.svg';
    } else {
      document.getElementById('tab-icon').href='img/store-light.svg';
    }
});
