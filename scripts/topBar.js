window.addEventListener('scroll', function() {
  if (pageYOffset > 24) {
    document.getElementById('topBar').style.background = "rgba(var(--bright), var(--bright), var(--bright), 0.6)";
    document.getElementById('topBar').style.backdropFilter = 'blur(10px)';
    document.getElementById('topBar').style.boxShadow = "0px 4px 9px 0px rgba(0,0,0,0.17)";
  } else {
    document.getElementById('topBar').style.background = 0;
    document.getElementById('topBar').style.backdropFilter = 0;
    document.getElementById('topBar').style.boxShadow = "0px 4px 9px 0px rgba(0,0,0,0)";
  }
})
