function redirect(page) {
  let channel = localStorage.getItem('channel');
  if (channel=='beta') {
    window.open('https://thetenstore.ru/beta/'+page, '_self');
  } else if(channel=='pre') {
    window.open('https://thetenstore.ru/pre/'+page, '_self');
  }
}
