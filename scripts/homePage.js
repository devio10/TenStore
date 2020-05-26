let key = "KdSqSAOC";
let count = "more";
let select = "tag";
value = "utilities";

const request = new XMLHttpRequest();
const url = "api.php";
var params = "key=" + key+ "&count=" + count+ "&select=" + select+ "&value=" + value;
request.responseType =	"json";
request.open("POST", url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.addEventListener("readystatechange", () => {
  if (request.readyState === 4 && request.status === 200) {
    let obj = request.response;
    for(let i=0; i<obj.apps.length; i++) {
    var aCard = document.createElement('div');
    aCard.className = 'aCard';
    aCard.innerHTML = "<a href='app.html?&select=id&value="+ obj.apps[i].id +"'> \
      <img class='aCardIcon' src='"+ obj.apps[i].icon +"'> \
      <h3 class='aCardName'>"+ obj.apps[i].appname +"</h3> \
      <h3 class='aCardDev'>"+ obj.apps[i].devname +"</h3> \
    </a>"
    document.getElementById('utilities').appendChild(aCard);
    }
  }
});
request.send(params);

let select2 = "tag";
value2 = "novel";

const request2 = new XMLHttpRequest();
var params2 = "key=" + key+ "&count=" + count+ "&select=" + select2+ "&value=" + value2;
request2.responseType =	"json";
request2.open("POST", url, true);
request2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request2.addEventListener("readystatechange", () => {
  if (request2.readyState === 4 && request2.status === 200) {
    let obj2 = request2.response;
    for(let i=0; i<obj2.apps.length; i++) {
    var aCard2 = document.createElement('div');
    aCard2.className = 'aCard';
    aCard2.innerHTML = "<a href='app.html?&select=id&value="+ obj2.apps[i].id +"'> \
      <img class='aCardIcon' src='"+ obj2.apps[i].icon +"'> \
      <h3 class='aCardName'>"+ obj2.apps[i].appname +"</h3> \
      <h3 class='aCardDev'>"+ obj2.apps[i].devname +"</h3> \
    </a>"
    document.getElementById('novels').appendChild(aCard2);
    }
  }
});
request2.send(params2);

let select3 = "tag";
value3 = "media";

const request3 = new XMLHttpRequest();
var params3 = "key=" + key+ "&count=" + count+ "&select=" + select3+ "&value=" + value3;
request3.responseType =	"json";
request3.open("POST", url, true);
request3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request3.addEventListener("readystatechange", () => {
  if (request3.readyState === 4 && request3.status === 200) {
    let obj3 = request3.response;
    for(let i=0; i<obj3.apps.length; i++) {
    var aCard3 = document.createElement('div');
    aCard3.className = 'aCard';
    aCard3.innerHTML = "<a href='app.html?&select=id&value="+ obj3.apps[i].id +"'> \
      <img class='aCardIcon' src='"+ obj3.apps[i].icon +"'> \
      <h3 class='aCardName'>"+ obj3.apps[i].appname +"</h3> \
      <h3 class='aCardDev'>"+ obj3.apps[i].devname +"</h3> \
    </a>"
    document.getElementById('media').appendChild(aCard3);
    }
  }
});
request3.send(params3);
