function newAlert (title, text) {
  let notBlock = document.createElement('div');
  notBlock.className = 'notification';
  notBlock.innerHTML = "<span class='closeNotification';`>&times;</span> \
   <h5 style='margin: 15px 15px 15px 15px'>" + title + "</h5> \
   <h5 style='margin: -5px 15px 15px 15px'>"  + text + "</h5>";
   document.body.appendChild(document.getElementById('notPlace'));
}

function closeAlert(notification) {
  let input = document.getElementsByClassName ('closeNotification')[0]
  input.onclick = function() {
    let el = document.querySelector(".notification");
    el.parentNode.removeChild(el);
  }
}

function showAlert (title, text){
  var notification = newAlert(title, text);
  closeAlert(notification);
}
