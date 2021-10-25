const userPrefersDark=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
function checkTheme (page) {
  if (userPrefersDark) {
    document.documentElement.setAttribute('dark-theme', 'true');
    if (page==null) {
      document.getElementById('header_logo').src='img/tenstore_header_dark.svg';
    }

  } else {
    if (page==null) {
      document.getElementById('header_logo').src='img/tenstore_header.svg';
    }
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme=e.matches?'dark':'light';
    if (newColorScheme=='dark') {
      document.documentElement.setAttribute('dark-theme', 'true');
      if (document.getElementById('header_logo')!=null) {
        document.getElementById('header_logo').src='img/tenstore_header_dark.svg';
      }
    } else {
      document.documentElement.setAttribute('dark-theme', 'false');
      if (document.getElementById('header_logo')!=null) {
        document.getElementById('header_logo').src='img/tenstore_header.svg';
      }
    }
});
