function checkPars() {
  let redSwitch=document.getElementById('ef-redirect-sw');
  if (localStorage.getItem('ef-nav-bar-animations')=='true') { efNavigationBar() }
  if (localStorage.getItem('ef-search-bar')=='true') { efSearchBar() }
  if (localStorage.getItem('ef-content-margin')=='true') { efContentMargin() }
  if (localStorage.getItem('ef-redirect')=='true') { redSwitch.checked=true }
  if (localStorage.getItem('ef-home-cards')=='true') { efHomeCards() }
  if (localStorage.getItem('ef-new-nav-bar')=='true') { efNewNavBar() }
  document.getElementById('cur-platform').innerText=localStorage.getItem('platform');
  document.getElementById('p-'+localStorage.getItem('platform')).checked=true;
}

function changePar(parName) {
  if (localStorage.getItem(parName)=='true') {
    localStorage.setItem(parName, 'false');
  } else {
    localStorage.setItem(parName, 'true');
  }
}
function efNewNavBar() {
  document.getElementById('ef-new-nav-bar-sw').checked=true;
  var link=document.createElement('link');
  link.rel='stylesheet';
  link.type='text/css';
  link.href='css/ef-new-nav-bar.css';
  head.appendChild(link);
}
function efSearchBar() {
  document.getElementById('ef-search-bar-sw').checked=true;
  document.getElementById('search-nav-bar').style.display='flex';
}
function efHomeCards() {
  document.getElementById('ef-home-cards-sw').checked=true;
  document.getElementById('hm-index').innerHTML="<div class='hm-bottom-loading' style='display: flex'> \
    <i class='ph-prohibit' style='font-size: 36px; color: gray'></i> \
    <h5 class='ui-gray'>Не удалось загрузить контент</h5> \
  </div>";
  document.getElementById('hm-apps').innerHTML="<div class='hm-bottom-loading' style='display: flex'> \
    <i class='ph-prohibit' style='font-size: 36px; color: gray'></i> \
    <h5 class='ui-gray'>Не удалось загрузить контент</h5> \
  </div>";
}
function efContentMargin() {
  document.getElementById('ef-content-margin-sw').checked=true;
  if (platform=='mobile') {
    var link=document.createElement('link');
    link.rel='stylesheet';
    link.type='text/css';
    link.href='css/ef-content-margin.css';
    head.appendChild(link);
  }
}
function efNavigationBar() {
  document.getElementById('ef-nav-bar-sw').checked=true;
  var prevScrollpos=window.pageYOffset;
  window.onscroll=function() {
    var currentScrollPos=window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById('nav-bar').style.bottom="var(--bottom)";
      document.getElementById('search-nav-bar').style.bottom="var(--bottom)";
      let iconId='house';
      if (selHC=='apps') { iconId='squares-four'; } else if (selHC=='games') { iconId='game-controller'; }
      document.getElementById('nav-index').className='';
      document.getElementById('nav-apps').className='';
      document.getElementById('nav-games').className='';

      document.getElementById('nav-index').className='ph-house-light ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-apps').className='ph-squares-four-light ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-games').className='ph-game-controller ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-'+selHC).className='ph-'+iconId+'-fill ui-nav-icon ui-nav-icon-highlight';
    } else {
      document.getElementById('nav-bar').style.bottom="-70px";
      document.getElementById('search-nav-bar').style.bottom="-70px";
      document.getElementById('nav-index').className='';
      document.getElementById('nav-apps').className='';
      document.getElementById('nav-games').className='';
    }
    prevScrollpos=currentScrollPos;
  }
}
