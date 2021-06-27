function getUrlVars(key) {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
}
function checkUrlVars() {
  hideAllBlocks();
  if (getUrlVars()['id']!=null) {
    showAB(getUrlVars()['id'], true);
  } else if (getUrlVars()['list']!=null) {
    showList(getUrlVars()['par1'], getUrlVars()['par2'], getUrlVars()['donotToggle'], getUrlVars()['par3'], getUrlVars()['background'], getUrlVars()['font'], getUrlVars()['nameColor'], getUrlVars()['subColor'], getUrlVars()['nameSize'], true);
  } else if (getUrlVars()['search']!=null) {
    toggleList(true, true);
    showList('search', getUrlVars()['search'], true);
  } else if (getUrlVars()['block']=='search') {
    toggleList(true);
  } else if (getUrlVars()['block']=='user') {
    toggleUB(true);
  } else if (getUrlVars()['block']=='settings') {
    toggleSettings(true);
  }
}

function loadCards() {
  var cards=new XMLHttpRequest();
  var appId='action=не ебу че здесь';
  cards.responseType = "json";
  cards.open("POST", api, true);
  cards.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  cards.addEventListener("readystatechange", () => {
    if ((cards.readyState===4)&&(cards.status===200)) {
      var cardsData=cards.response;

    }
  });
}
function hideAllBlocks () {
  if (ab.style.display=='block') {
    toggleAB();
  }
  if (list.style.display=='block') {
    toggleList();
  }
  if (ubObj.style.display=='block') {
    toggleUB();
  }
  if (setObj.style.display=='block') {
    toggleSettings();
  }
}
function toggleADT() {
  curADT=localStorage.getItem('autoDarkTheme');
  if (curADT=='false') {
    localStorage.setItem('autoDarkTheme', 'true');
    document.getElementById('adt-help').style.display='block';
  } else {
    localStorage.setItem('autoDarkTheme', 'false');
    document.getElementById('adt-help').style.display='none';
  }
  checkTheme();
}

var selHC='index';
function hmContent(page) {
  document.getElementById('hm-index').style.display='none';
  document.getElementById('hm-apps').style.display='none';
  document.getElementById('hm-games').style.display='none';
  document.getElementById('hm-'+page).style.display='flex';

  selHC=page;

  let iconClass;
  if (page=='index') { iconClass='house' }
  else if (page=='apps') { iconClass='squares-four' }
  else if (page=='games') { iconClass='game-controller' }

  document.getElementById('nav-index').className='';
  document.getElementById('nav-apps').className='';
  document.getElementById('nav-games').className='';

  document.getElementById('nav-index').classList='ph-house-light ui-nav-icon ui-nav-icon-highlight';
  document.getElementById('nav-apps').classList='ph-squares-four-light ui-nav-icon ui-nav-icon-highlight';
  document.getElementById('nav-games').classList='ph-game-controller-light ui-nav-icon ui-nav-icon-highlight';



  document.getElementById('nav-'+page).classList='ph-'+iconClass+'-fill ui-nav-icon';

  document.getElementById('nav-'+page).classList='ph-'+iconClass+'-fill ui-nav-icon ui-nav-icon-highlight';
  window.scrollTo(0, 0);
}

function setPlatform(pmName) {
  localStorage.setItem('platform', pmName);
  document.getElementById('s-platform').innerText=localStorage.getItem('platform');
  document.getElementById('cur-platform').innerText='Текущая: '+localStorage.getItem('platform');
  if ((pmName=='Windows')||(pmName=='Linux')) {
    document.getElementById('device-icon').src='img/icons/device-desktop.svg';
  } else {
    document.getElementById('device-icon').src='img/icons/device-mobile.svg';
  }
}

function debug_newReview() {
  toggleAB();
  document.getElementById('ab-main_content').style.display='none';
  document.getElementById('ab-new_review').style.display='block';
}

/* AFTERLOAD */
const api='https://tstore.space/api.php';
var head=document.getElementsByTagName('HEAD')[0];
var body=document.getElementsByTagName('body')[0];
checkTheme();
checkPlatform();
login();
checkUrlVars();
checkPars();
if ((localStorage.getItem('platform')==null)&&(localStorage.getItem('manual-platform')!='true')) {
  var script=document.createElement('script');
  script.src='js/detect-os.js';
  head.appendChild(script);
}
document.getElementById('s-platform').innerText=localStorage.getItem('platform');
if ((localStorage.getItem('platform')=='Windows')||(localStorage.getItem('platform')=='Linux')) {
  document.getElementById('device-icon').src='img/icons/device-desktop.svg';
} else {
  document.getElementById('device-icon').src='img/icons/device-mobile.svg';
}
window.onpopstate=function(event) {
  checkUrlVars();
};
if (localStorage.getItem('debug')!='true') {
  document.getElementById('beta-introduction').style.display='none';
}
if (localStorage.getItem('temp-beta-introduction')=='hidden') {
  document.getElementById('beta-introduction').style.display='none';
}
