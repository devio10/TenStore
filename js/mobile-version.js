var platform='pc';
function checkPlatform () {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    var link=document.createElement('link');
    link.rel='stylesheet';
    link.type='text/css';
    link.href='css/phones.css';
    head.appendChild(link);
    platform='mobile';
    link=null;

    if (localStorage.getItem('top_navbar')=='true') {

      let tn_link=document.createElement('link');
      tn_link.rel='stylesheet';
      tn_link.type='text/css';
      tn_link.href='css/top_navbar.css';
      head.appendChild(tn_link);

    } else {

      efNavigationBar();

    }

  } else {

    efNavigationBar();

  }
}
