function appsList () {
  var requestURL = 'http://bomj2655.chsw.ru/json/apps.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var apps = request.response;
    appName(apps);
  }
  function appName(jsonObj) {
    var aCard = document.createElement('div');
    aCard.className = 'aCard';
    aCard.innerHTML = "<a href='app.html?id="+ jsonObj['id'] +"'> \
      <img class='aCardIcon' src='"+ jsonObj['icon'] +"'> \
      <h3 class='aCardName'>"+ jsonObj['appname'] +"</h3> \
      <h3 class='aCardDev'>"+ jsonObj['devname'] +"</h3> \
    </a>"
    document.body.appendChild(aCard);
  }
  function aCardsShow(jsonObj) {
    var aCards = jsonObj['appname'];
    for (var i = 0; i <aCards.length; i++) {

    }
  }
};

//let notBlock = document.createElement('div');
//notBlock.className = 'notification';
//notBlock.innerHTML = "<span class='closeNotification';`>&times;</span> \
// <h5 style='margin: 15px 15px 15px 15px'>" + title + "</h5> \
// <h5 style='margin: -5px 15px 15px 15px'>"  + text + "</h5>";
// let place = document.getElementById ('notPlace');
// document.body.appendChild(notBlock);
