function search () {
  let searchBlock = document.getElementById('appsList-dS-block');
  if (searchBlock.style.display == "block") {
    searchBlock.style.display = "none";
  } else {
    searchBlock.style.display = "block";
  }
}
let select;
let action = "KdSqSAOC";
if (getUrlVars()['tag'] != null) {
  select = 'tags';
  value = getUrlVars()['tag'];
} else if (getUrlVars()['dev'] != null) {
  select = 'dev';
  value = getUrlVars()['dev'];
} else if (getUrlVars()['pub'] != null) {
  select = 'pub';
  value = getUrlVars()['pub'];
} else if (getUrlVars()['type'] != null) {
  select = 'type';
  value = getUrlVars()['type'];
} else {
  select = "type";
  value = "app";
}
const request = new XMLHttpRequest();
const url = "https://thetenstore.ru/api.php";
const params = "action=" + action + "&select=" + select + "&value=" + value;
request.responseType =	"json";
request.open("POST", url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.addEventListener("readystatechange", () => {
  if (request.readyState === 4 && request.status === 200) {
    let obj=request.response;
    for(let i=0; i<obj.apps.length; i++) {
      showAppCard('aCard-block', obj.apps[i].icon, obj.apps[i].icon_pad, obj.apps[i].icon_bg, obj.apps[i].id, obj.apps[i].name, obj.apps[i].dev);
    }
  }
});
request.send(params);
function sortButton () {
  if (localStorage.getItem('appsListSort') == "t") {
    document.getElementById('sortButton').style.display = "block";
  } else {
    document.getElementById('sortButton').style.display = "none";
  }
}
function confirm() {
  let selector = document.getElementById('selectBox');
  let value = selector[selector.selectedIndex].value;
  let devV = document.getElementById('inpDev').value;
  let sType;
  if (document.getElementById('r1').checked == true) {
    sType = 'app';
  } else if (document.getElementById('r2').checked == true) {
    sType = 'game';
  } else {
    sType = 'app';
  }
  if (tag == true) {
    window.open('https://thetenstore.ru/appsList?tag=' + value, '_self');
  } else if (dev == true) {
    window.open('https://thetenstore.ru/appsList?dev=' + devV, '_self');
  } else {
    window.open('https://thetenstore.ru/appsList?type=' + sType, '_self');
  }
}
