function getUrlVars(key) {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
}
function checkUrlVars() {
  if (getUrlVars()['app']!=null) {
    showAB(getUrlVars()['id']);
  } else if (getUrlVars()['list']!=null) {
    showList(getUrlVars()['par1'], getUrlVars()['par2'], getUrlVars()['donotToggle'], getUrlVars()['par3'], getUrlVars()['background'], getUrlVars()['font'], getUrlVars()['nameColor'], getUrlVars()['subColor'], getUrlVars()['nameSize']);
  } else if (getUrlVars()['search']!=null) {
    toggleList(true);
  } else {
    
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
