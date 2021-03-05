function getUrlVars(key) {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
}
function checkUrlVars() {
  if (getUrlVars()['id']!=null) {
    showAB(getUrlVars()['id']);
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
