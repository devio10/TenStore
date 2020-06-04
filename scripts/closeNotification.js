function closeNot(notification) {
  let input = document.getElementsByClassName ('closeNotification')[0]
  input.onclick = function() {
    let el = document.querySelector(".notification");
    el.parentNode.removeChild(el);
  }
}
