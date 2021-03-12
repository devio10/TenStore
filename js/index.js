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

function checkPars() {
  if (localStorage.getItem('autoDarkTheme')=='false') {
    console.log('mmm');
    document.getElementById('s-adt-sw').checked=false;
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
