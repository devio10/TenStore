document.getElementById('siteSearch').addEventListener("keyup", function(event) {
  if (event.keyCode===13) {
    window.open('appsList?search='+document.getElementById('siteSearch').value, '_self');
  }
});
