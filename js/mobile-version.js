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

      document.getElementById('nav-bar').style.bottom="var(--bottom)";
      document.getElementById('nav-home').className='ph-house-light ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-apps').className='ph-squares-four-light ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-search').className='ph-magnifying-glass-light ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-games').className='ph-game-controller ui-nav-icon ui-nav-icon-highlight';
      document.getElementsByClassName('fake_search')[0].style.display='none';

    }

  } else {

    efNavigationBar();

  }
}
