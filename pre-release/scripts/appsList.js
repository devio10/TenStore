function search () {
  let searchBlock = document.getElementById('appsList-dS-block');
  let sortButton = document.getElementById('sortButton');
  if (searchBlock.style.display == "block") {
    searchBlock.style.display = "none";
    sortButton.style.right = "30px";
  } else {
    searchBlock.style.display = "block";
    sortButton.style.right = "470px";
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
    let obj = request.response;
    for(let i=0; i<obj.apps.length; i++) {
      let iconBg = obj.apps[i].icon_bg;
      if (iconBg == 0) {
        cssBg = 'var(--bg)';
      } else {
        cssBg = obj.apps[i].icon_bg;
      }
      var aCard = document.createElement('div');
      let width = 0;
      if (obj.apps[i].icon_pad == 15) {
        width = '120px';
      } else {
        width = '150px';
      }
      aCard.className = 'aCard';
      aCard.innerHTML = "<a href='app?&id="+ obj.apps[i].id +"'> \
        <img class='aCard-icon' style='width: " + width + "; height: " + width + "; background: "+ cssBg +"; padding: "+ obj.apps[i].icon_pad +"px' src='https://thetenstore.ru/"+ obj.apps[i].icon +"'> \
        <h4 class='aCard-name'>"+ obj.apps[i].name +"</h4> \
        <h4 class='aCard-dev'>"+ obj.apps[i].dev +"</h4> \
      </a>"
      document.getElementById('aCard-block').appendChild(aCard);
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
  //let sortList = document.getElementById('sortBy');
  //let sortValue = sortList[sortList.selectedIndex].value;
  let selector = document.getElementById('selectBox');
  let value = selector[selector.selectedIndex].value;
  let devV = document.getElementById('inpDev').value;
  let sType;
  //if (sortValue != 0) {
    //sortBy = sortValue;
  //} else {
    //sortBy = 'name';
  //}
  //if (document.getElementById('r8').checked == true) {
    //sortOrder = '-';
  //} else {
    //sortOrder = '+';
  //}
  if (document.getElementById('r1').checked == true) {
    sType = 'app';
  } else if (document.getElementById('r2').checked == true) {
    sType = 'game';
  } else {
    sType = 'app';
  }
  if (tag == true) {
    window.open('https://thetenstore.ru/pre-release/appsList?tag=' + value, '_self');
  } else if (dev == true) {
    window.open('https://thetenstore.ru/pre-release/appsList?dev=' + devV, '_self');
  } else {
    window.open('https://thetenstore.ru/pre-release/appsList?type=' + sType, '_self');
  }
}
