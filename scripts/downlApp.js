let id = getUrlVars()['value'];
function sWindow() {
	let jsWindow = window.open('http://bomj2655.chsw.ru/js.html?value=' + id, '_blank');
	jsWindow.close();
}
function downlBtn() {
  let downlMenu = document.getElementById('downlMenu');
  let downlBtn = document.getElementById('downlBtn');
  if (downlMenu.style.display == 'block') {
    downlBtn.style.borderRadius = '10px';
    downlMenu.style.display = 'none';
  } else {
    downlBtn.style.borderRadius = '10px 10px 0 0';
    downlMenu.style.display = 'block';
  }
}
