const userPrefersDark=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
function checkTheme () {
  if (userPrefersDark) {
    document.documentElement.setAttribute('dark-theme', 'true');
    document.getElementById('tab-icon').href='img/store-dark.svg';
  } else {
    document.getElementById('tab-icon').href='img/store-light.svg';
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme=e.matches?'dark':'light';
    if (newColorScheme=='dark') {
      document.getElementById('tab-icon').href='img/store-dark.svg';
      document.documentElement.setAttribute('dark-theme', 'true');
    } else {
      document.getElementById('tab-icon').href='img/store-light.svg';
      document.documentElement.setAttribute('dark-theme', 'false');
    }
});
