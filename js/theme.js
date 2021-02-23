let currentTheme=localStorage.getItem('dark-theme');
function toggleDarkTheme (place) {
  currentTheme=localStorage.getItem('dark-theme');
  if (currentTheme!='true') {
    localStorage.setItem('dark-theme', 'true');
    document.documentElement.setAttribute('dark-theme', 'true');
    if (place=='ub') {
      document.getElementById('s-theme').checked=true;
    } else {
      document.getElementById('ub-theme-sw').checked=true;
    }
  } else {
    localStorage.setItem('dark-theme', 'false');
    document.documentElement.setAttribute('dark-theme', 'false');
    if (place=='ub') {
      document.getElementById('s-theme').checked=false;
    } else {
      document.getElementById('ub-theme-sw').checked=false;
    }
  }
}

function checkTheme () {
  if (currentTheme=='true') {
    document.documentElement.setAttribute('dark-theme', 'true');
    document.getElementById('ub-theme-sw').checked='true';
    document.getElementById('s-theme').checked='true';
  }
}
