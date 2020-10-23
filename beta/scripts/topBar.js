window.addEventListener('scroll', function() {
  if (pageYOffset > 50) {
    document.getElementById('topBar').style.background = "rgba(var(--bright), var(--bright), var(--bright), 0.6)";
    document.getElementById('topBar').style.backdropFilter = 'blur(var(--blur))';
    document.getElementById('topBar').style.boxShadow = "var(--topShadow)";
  } else {
    document.getElementById('topBar').style.background = 0;
    document.getElementById('topBar').style.backdropFilter = 0;
    document.getElementById('topBar').style.boxShadow = "0px 4px 9px 0px rgba(0,0,0,0)";
  }
})
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('nav').style.top = "0";
  } else {
    document.getElementById('nav').style.top = "-70px";
  }
  prevScrollpos = currentScrollPos;
}
