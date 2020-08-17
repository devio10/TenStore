let action = "KdSqSAOC";
let select = "tag";
value = "utilities";

const request = new XMLHttpRequest();
const url = "api.php";
const params = "action=" + action + "&select=" + select + "&value=" + value;
request.responseType =	"json";
request.open("POST", url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.addEventListener("readystatechange", () => {
  if (request.readyState === 4 && request.status === 200) {
    let obj = request.response;
    for(let i=0; i<obj.apps.length; i++) {
    var aCard = document.createElement('div');
    aCard.className = 'aCard';
    aCard.innerHTML = "<a href='app?id="+ obj.apps[i].id +"'> \
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
var params2 = "action=" + action + "&select=" + select2+ "&value=" + value2;
request2.responseType =	"json";
request2.open("POST", url, true);
request2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request2.addEventListener("readystatechange", () => {
  if (request2.readyState === 4 && request2.status === 200) {
    let obj2 = request2.response;
    for(let i=0; i<obj2.apps.length; i++) {
    var aCard2 = document.createElement('div');
    aCard2.className = 'aCard';
    aCard2.innerHTML = "<a href='app?id="+ obj2.apps[i].id +"'> \
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
var params3 = "action=" + action + "&select=" + select3+ "&value=" + value3;
request3.responseType =	"json";
request3.open("POST", url, true);
request3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request3.addEventListener("readystatechange", () => {
  if (request3.readyState === 4 && request3.status === 200) {
    let obj3 = request3.response;
    for(let i=0; i<obj3.apps.length; i++) {
    var aCard3 = document.createElement('div');
    aCard3.className = 'aCard';
    aCard3.innerHTML = "<a href='app?id="+ obj3.apps[i].id +"'> \
      <img class='aCardIcon' src='"+ obj3.apps[i].icon +"'> \
      <h3 class='aCardName'>"+ obj3.apps[i].appname +"</h3> \
      <h3 class='aCardDev'>"+ obj3.apps[i].devname +"</h3> \
    </a>"
    document.getElementById('media').appendChild(aCard3);
    }
  }
});
request3.send(params3);

let select5 = "tag";
value5 = "communication";
const request5 = new XMLHttpRequest();
var params5 = "action=" + action + "&select=" + select5+ "&value=" + value5;
request5.responseType =	"json";
request5.open("POST", url, true);
request5.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request5.addEventListener("readystatechange", () => {
  if (request5.readyState === 5 && request5.status === 200) {
    let obj5 = request5.response;
    for(let i=0; i<obj5.apps.length; i++) {
    var aCard5 = document.createElement('div');
    aCard5.className = 'aCard';
    aCard5.innerHTML = "<a href='app?id="+ obj5.apps[i].id +"'> \
      <img class='aCardIcon' src='"+ obj5.apps[i].icon +"'> \
      <h3 class='aCardName'>"+ obj5.apps[i].appname +"</h3> \
      <h3 class='aCardDev'>"+ obj5.apps[i].devname +"</h3> \
    </a>"
    document.getElementById('communication').appendChild(aCard5);
    }
  }
});
request5.send(params5);

let select6 = "tag";
value6 = "social";

const request6 = new XMLHttpRequest();
var params6 = "action=" + action + "&select=" + select6+ "&value=" + value6;
request6.responseType =	"json";
request6.open("POST", url, true);
request6.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request6.addEventListener("readystatechange", () => {
  if (request6.readyState === 6 && request6.status === 200) {
    let obj6 = request6.response;
    for(let i=0; i<obj6.apps.length; i++) {
    var aCard6 = document.createElement('div');
    aCard6.className = 'aCard';
    aCard6.innerHTML = "<a href='app?id="+ obj6.apps[i].id +"'> \
      <img class='aCardIcon' src='"+ obj6.apps[i].icon +"'> \
      <h3 class='aCardName'>"+ obj6.apps[i].appname +"</h3> \
      <h3 class='aCardDev'>"+ obj6.apps[i].devname +"</h3> \
    </a>"
    document.getElementById('social').appendChild(aCard6);
    }
  }
});
request6.send(params6);


let select4 = "tag";
value4 = "action";

const request4 = new XMLHttpRequest();
var params4 = "action=" + action + "&select=" + select4+ "&value=" + value4;
request4.responseType =	"json";
request4.open("POST", url, true);
request4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request4.addEventListener("readystatechange", () => {
  if (request4.readyState === 4 && request4.status === 200) {
    let obj4 = request4.response;
    for(let i=0; i<obj4.apps.length; i++) {
    var aCard4 = document.createElement('div');
    aCard4.className = 'aCard';
    aCard4.innerHTML = "<a href='app?id="+ obj4.apps[i].id +"'> \
      <img class='aCardIcon' src='"+ obj4.apps[i].icon +"'> \
      <h3 class='aCardName'>"+ obj4.apps[i].appname +"</h3> \
      <h3 class='aCardDev'>"+ obj4.apps[i].devname +"</h3> \
    </a>"
    document.getElementById('action').appendChild(aCard4);
    }
  }
});
request4.send(params4);
