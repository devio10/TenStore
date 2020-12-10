const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
if ((userPrefersDark)&&(localStorage.getItem('autoDarkTheme')=='true')){
    document.documentElement.setAttribute('data-theme', localStorage.getItem('night-theme'));
} else if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme=e.matches?'dark':'light';
    if (localStorage.getItem('autoDarkTheme')=='true') {
      if (newColorScheme=='dark') {
        document.documentElement.setAttribute('data-theme', localStorage.getItem('night-theme'));
        console.log('dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        console.log('light');
      }
    }
});
