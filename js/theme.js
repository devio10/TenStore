let currentTheme=localStorage.getItem('dark-theme');
function toggleDarkTheme () {
  if (currentTheme!='true') {
    localStorage.setItem('dark-theme', 'true');
    document.documentElement.setAttribute('dark-theme', 'true');
  } else {
    localStorage.setItem('dark-theme', 'false');
    document.documentElement.setAttribute('dark-theme', 'false');
  }
}

function checkTheme () {
  if (currentTheme=='true') {
    document.documentElement.setAttribute('dark-theme', 'true');
  }
}
