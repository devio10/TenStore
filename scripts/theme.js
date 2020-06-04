const toggleSwitch = document.querySelector('.themeSwitch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

function changeTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function changeAccent(accent) {
  document.documentElement.setAttribute('data-accent', accent);
  localStorage.setItem('accent', accent);
}

toggleSwitch.addEventListener('change', switchTheme, false);

//Проверка установленной темы
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if ((currentTheme === 'dark') || (currentTheme === 'black')) {
        toggleSwitch.checked = true;
    }
}

const currentAccent = localStorage.getItem('accent') ? localStorage.getItem('accent') : null;

if (currentAccent) {
    document.documentElement.setAttribute('data-accent', currentAccent);
}
