if (localStorage.getItem('betaTest') == 't') {
  window.open('https://thetenstore.ru/pre-release/?source=betaRedirect', '_self');
}
let action = "KdSqSAOC";
let selectAction = "action";
valueAction = "action";

const url = "api.php";
const requestAction = new XMLHttpRequest();
const paramsAction = "action=" + action + "&select=" + selectAction + "&value=" + valueAction;
requestAction.responseType =	"json";
requestAction.open("POST", url, true);
requestAction.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
requestAction.addEventListener("readystatechange", () => {
  if (requestAction.readyState === 4 && requestAction.status === 200) {
    let objAction = requestAction.response;
    for(let i=0; i<objAction.apps.length; i++) {
      var aCardAction = document.createElement('div');
      let width = 0;
      if (objAction.apps[i].padding == 15) {
        width = '120px';
      } else {
        width = '150px';
      }
      aCardAction.className = 'aCard';
      aCardAction.innerHTML = "<a href='app?&id="+ objAction.apps[i].id +"'> \
        <img class='aCardIcon' style='width: " + width + "; height: " + width + "; background: "+ objAction.apps[i].bg +"; padding: "+ objAction.apps[i].padding +"px' src='"+ objAction.apps[i].icon +"'> \
        <h3 class='aCardName'>"+ objAction.apps[i].appname +"</h3> \
        <h3 class='aCardDev'>"+ objAction.apps[i].devname +"</h3> \
      </a>"
      document.getElementById('Action').appendChild(aCardAction);
    }
  }
});
requestAction.send(paramsAction);

let selectCommunication = "tag";
valueCommunication = "communication";

const requestCommunication = new XMLHttpRequest();
const paramsCommunication = "action=" + action + "&select=" + selectCommunication + "&value=" + valueCommunication;
requestCommunication.responseType =	"json";
requestCommunication.open("POST", url, true);
requestCommunication.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
requestCommunication.addEventListener("readystatechange", () => {
  if (requestCommunication.readyState === 4 && requestCommunication.status === 200) {
    let objCommunication = requestCommunication.response;
    for(let i=0; i<objCommunication.apps.length; i++) {
      var aCardCommunication = document.createElement('div');
      let width = 0;
      if (objCommunication.apps[i].padding == 15) {
        width = '120px';
      } else {
        width = '150px';
      }
      aCardCommunication.className = 'aCard';
      aCardCommunication.innerHTML = "<a href='app?&id="+ objCommunication.apps[i].id +"'> \
        <img class='aCardIcon' style='width: " + width + "; height: " + width + "; background: "+ objCommunication.apps[i].bg +"; padding: "+ objCommunication.apps[i].padding +"px' src='"+ objCommunication.apps[i].icon +"'> \
        <h3 class='aCardName'>"+ objCommunication.apps[i].appname +"</h3> \
        <h3 class='aCardDev'>"+ objCommunication.apps[i].devname +"</h3> \
      </a>"
      document.getElementById('Communication').appendChild(aCardCommunication);
    }
  }
});
requestCommunication.send(paramsCommunication);

let selectUtilities = "tag";
valueUtilities = "utilities";

const requestUtilities = new XMLHttpRequest();
const paramsUtilities = "action=" + action + "&select=" + selectUtilities + "&value=" + valueUtilities;
requestUtilities.responseType =  "json";
requestUtilities.open("POST", url, true);
requestUtilities.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
requestUtilities.addEventListener("readystatechange", () => {
  if (requestUtilities.readyState === 4 && requestUtilities.status === 200) {
    let objUtilities = requestUtilities.response;
    for(let i=0; i<objUtilities.apps.length; i++) {
      var aCardUtilities = document.createElement('div');
      let width = 0;
      if (objUtilities.apps[i].padding == 15) {
        width = '120px';
      } else {
        width = '150px';
      }
      aCardUtilities.className = 'aCard';
      aCardUtilities.innerHTML = "<a href='app?&id="+ objUtilities.apps[i].id +"'> \
        <img class='aCardIcon' style='width: " + width + "; height: " + width + "; background: "+ objUtilities.apps[i].bg +"; padding: "+ objUtilities.apps[i].padding +"px' src='"+ objUtilities.apps[i].icon +"'> \
        <h3 class='aCardName'>"+ objUtilities.apps[i].appname +"</h3> \
        <h3 class='aCardDev'>"+ objUtilities.apps[i].devname +"</h3> \
      </a>"
      document.getElementById('Utilities').appendChild(aCardUtilities);
    }
  }
});
requestUtilities.send(paramsUtilities);

let selectArcade = "tag";
valueArcade = "arcade";

const requestArcade = new XMLHttpRequest();
const paramsArcade = "action=" + action + "&select=" + selectArcade + "&value=" + valueArcade;
requestArcade.responseType =  "json";
requestArcade.open("POST", url, true);
requestArcade.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
requestArcade.addEventListener("readystatechange", () => {
  if (requestArcade.readyState === 4 && requestArcade.status === 200) {
    let objArcade = requestArcade.response;
    for(let i=0; i<objArcade.apps.length; i++) {
      var aCardArcade = document.createElement('div');
      let width = 0;
      if (objArcade.apps[i].padding == 15) {
        width = '120px';
      } else {
        width = '150px';
      }
      aCardArcade.className = 'aCard';
      aCardArcade.innerHTML = "<a href='app?&id="+ objArcade.apps[i].id +"'> \
        <img class='aCardIcon' style='width: " + width + "; height: " + width + "; background: "+ objArcade.apps[i].bg +"; padding: "+ objArcade.apps[i].padding +"px' src='"+ objArcade.apps[i].icon +"'> \
        <h3 class='aCardName'>"+ objArcade.apps[i].appname +"</h3> \
        <h3 class='aCardDev'>"+ objArcade.apps[i].devname +"</h3> \
      </a>"
      document.getElementById('Arcade').appendChild(aCardArcade);
    }
  }
});
requestArcade.send(paramsArcade);

let selectSocial = "tag";
valueSocial = "social";

const requestSocial = new XMLHttpRequest();
const paramsSocial = "action=" + action + "&select=" + selectSocial + "&value=" + valueSocial;
requestSocial.responseType =  "json";
requestSocial.open("POST", url, true);
requestSocial.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
requestSocial.addEventListener("readystatechange", () => {
  if (requestSocial.readyState === 4 && requestSocial.status === 200) {
    let objSocial = requestSocial.response;
    for(let i=0; i<objSocial.apps.length; i++) {
      var aCardSocial = document.createElement('div');
      let width = 0;
      if (objSocial.apps[i].padding == 15) {
        width = '120px';
      } else {
        width = '150px';
      }
      aCardSocial.className = 'aCard';
      aCardSocial.innerHTML = "<a href='app?&id="+ objSocial.apps[i].id +"'> \
        <img class='aCardIcon' style='width: " + width + "; height: " + width + "; background: "+ objSocial.apps[i].bg +"; padding: "+ objSocial.apps[i].padding +"px' src='"+ objSocial.apps[i].icon +"'> \
        <h3 class='aCardName'>"+ objSocial.apps[i].appname +"</h3> \
        <h3 class='aCardDev'>"+ objSocial.apps[i].devname +"</h3> \
      </a>"
      document.getElementById('Social').appendChild(aCardSocial);
    }
  }
});
requestSocial.send(paramsSocial);

let selectMedia = "tag";
valueMedia = "media";

const requestMedia = new XMLHttpRequest();
const paramsMedia = "action=" + action + "&select=" + selectMedia + "&value=" + valueMedia;
requestMedia.responseType =  "json";
requestMedia.open("POST", url, true);
requestMedia.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
requestMedia.addEventListener("readystatechange", () => {
  if (requestMedia.readyState === 4 && requestMedia.status === 200) {
    let objMedia = requestMedia.response;
    for(let i=0; i<objMedia.apps.length; i++) {
      var aCardMedia = document.createElement('div');
      let width = 0;
      if (objMedia.apps[i].padding == 15) {
        width = '120px';
      } else {
        width = '150px';
      }
      aCardMedia.className = 'aCard';
      aCardMedia.innerHTML = "<a href='app?&id="+ objMedia.apps[i].id +"'> \
        <img class='aCardIcon' style='width: " + width + "; height: " + width + "; background: "+ objMedia.apps[i].bg +"; padding: "+ objMedia.apps[i].padding +"px' src='"+ objMedia.apps[i].icon +"'> \
        <h3 class='aCardName'>"+ objMedia.apps[i].appname +"</h3> \
        <h3 class='aCardDev'>"+ objMedia.apps[i].devname +"</h3> \
      </a>"
      document.getElementById('Media').appendChild(aCardMedia);
    }
  }
});
requestMedia.send(paramsMedia);

let selectStrategy = "tag";
valueStrategy = "strategy";

const requestStrategy = new XMLHttpRequest();
const paramsStrategy = "action=" + action + "&select=" + selectStrategy + "&value=" + valueStrategy;
requestStrategy.responseType =  "json";
requestStrategy.open("POST", url, true);
requestStrategy.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
requestStrategy.addEventListener("readystatechange", () => {
  if (requestStrategy.readyState === 4 && requestStrategy.status === 200) {
    let objStrategy = requestStrategy.response;
    for(let i=0; i<objStrategy.apps.length; i++) {
      var aCardStrategy = document.createElement('div');
      let width = 0;
      if (objStrategy.apps[i].padding == 15) {
        width = '120px';
      } else {
        width = '150px';
      }
      aCardStrategy.className = 'aCard';
      aCardStrategy.innerHTML = "<a href='app?&id="+ objStrategy.apps[i].id +"'> \
        <img class='aCardIcon' style='width: " + width + "; height: " + width + "; background: "+ objStrategy.apps[i].bg +"; padding: "+ objStrategy.apps[i].padding +"px' src='"+ objStrategy.apps[i].icon +"'> \
        <h3 class='aCardName'>"+ objStrategy.apps[i].appname +"</h3> \
        <h3 class='aCardDev'>"+ objStrategy.apps[i].devname +"</h3> \
      </a>"
      document.getElementById('Strategy').appendChild(aCardStrategy);
    }
  }
});
requestStrategy.send(paramsStrategy);

let selectSimulation = "tag";
valueSimulation = "simulation";

const requestSimulation = new XMLHttpRequest();
const paramsSimulation = "action=" + action + "&select=" + selectSimulation + "&value=" + valueSimulation;
requestSimulation.responseType =  "json";
requestSimulation.open("POST", url, true);
requestSimulation.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
requestSimulation.addEventListener("readystatechange", () => {
  if (requestSimulation.readyState === 4 && requestSimulation.status === 200) {
    let objSimulation = requestSimulation.response;
    for(let i=0; i<objSimulation.apps.length; i++) {
      var aCardSimulation = document.createElement('div');
      let width = 0;
      if (objSimulation.apps[i].padding == 15) {
        width = '120px';
      } else {
        width = '150px';
      }
      aCardSimulation.className = 'aCard';
      aCardSimulation.innerHTML = "<a href='app?&id="+ objSimulation.apps[i].id +"'> \
        <img class='aCardIcon' style='width: " + width + "; height: " + width + "; background: "+ objSimulation.apps[i].bg +"; padding: "+ objSimulation.apps[i].padding +"px' src='"+ objSimulation.apps[i].icon +"'> \
        <h3 class='aCardName'>"+ objSimulation.apps[i].appname +"</h3> \
        <h3 class='aCardDev'>"+ objSimulation.apps[i].devname +"</h3> \
      </a>"
      document.getElementById('Simulation').appendChild(aCardSimulation);
    }
  }
});
requestSimulation.send(paramsSimulation);

let selectNews = "tag";
valueNews = "news";

const requestNews = new XMLHttpRequest();
const paramsNews = "action=" + action + "&select=" + selectNews + "&value=" + valueNews;
requestNews.responseType =  "json";
requestNews.open("POST", url, true);
requestNews.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
requestNews.addEventListener("readystatechange", () => {
  if (requestNews.readyState === 4 && requestNews.status === 200) {
    let objNews = requestNews.response;
    for(let i=0; i<objNews.apps.length; i++) {
      var aCardNews = document.createElement('div');
      let width = 0;
      if (objNews.apps[i].padding == 15) {
        width = '120px';
      } else {
        width = '150px';
      }
      aCardNews.className = 'aCard';
      aCardNews.innerHTML = "<a href='app?&id="+ objNews.apps[i].id +"'> \
        <img class='aCardIcon' style='width: " + width + "; height: " + width + "; background: "+ objNews.apps[i].bg +"; padding: "+ objNews.apps[i].padding +"px' src='"+ objNews.apps[i].icon +"'> \
        <h3 class='aCardName'>"+ objNews.apps[i].appname +"</h3> \
        <h3 class='aCardDev'>"+ objNews.apps[i].devname +"</h3> \
      </a>"
      document.getElementById('News').appendChild(aCardNews);
    }
  }
});
requestNews.send(paramsNews);
