function newAlert (title, text) {
  let alert = document.createElement('div');
  alert.className = 'alert';
  alert.innerHTML = "<span class='closeAlert';`>&times;</span> \
   <h5 style='margin: 15px'>" + title + "</h5> \
   <h5 style='margin: -5px 15px'>"  + text + "</h5>";
  let block = document.getElementById('alertBlock');
  document.body.appendChild(block);

  let button = document.getElementsByClassName('closeAlert');
  button.onclick = function() {
    let el = document.querySelector(".alert");
    el.parentNode.removeChild(el);
  }
}
