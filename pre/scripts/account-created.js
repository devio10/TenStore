function checkCode () {
  let code = getUrlVars()['code'];
  console.log(code);
  document.getElementById('AC-' + code).style.display = 'block';
}
