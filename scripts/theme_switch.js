//Theme Switch for TenStore.
  'use strict';
  // создаем <link rel="stylesheet" href="light|dark.css">
  let head = document.head,
      link = document.createElement('link');
  link.rel = 'stylesheet';

  if (localStorage.getItem('themeStyle') === 'dark') {
    link.href = 'css/dark.css';
    document.getElementById('switch').setAttribute('checked', true); // переключаем чекбокс в положение "темная тема"
  }

  else {
    link.href = 'css/light.css';
  }
  head.appendChild(link); // вставляем <link rel="stylesheet" href="light|dark.css"> в шапку страницы между темаги head

  //Переключение чекбокса
  document.getElementById('switch').addEventListener('change', ev => {
    let btn = ev.target;
    if (btn.checked) {
      link.href = 'css/dark.css';
      localStorage.setItem('themeStyle', 'dark');
    }
    else {
      link.href = 'css/light.css';
      localStorage.setItem('themeStyle', 'light');
    }
  });