
window.addEventListener('scroll', function() {
  if (pageYOffset > 0) {
    document.getElementById('bg-blur').style.backdropFilter = 'blur(10px)';
  } else {
    document.getElementById('bg-blur').style.backdropFilter = 'blur(0)';
  }
})

function getUrlVars(key) {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
}

let action = "4LlFCT";
let id = getUrlVars()["id"];

const request = new XMLHttpRequest();
const url = "https://thetenstore.ru/api.php";
const params = "action=" + action + "&id=" + id;
request.responseType = "json";
request.open("POST", url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.addEventListener("readystatechange", () => {
  if ((request.readyState === 4) && (request.status === 200)) {
    var obj = request.response;
    for(let i=0; i<obj.apps.length; i++) {
      let appPage = document.getElementById('appPage');
      let rating = obj.apps[0].rating;
      let tag = 0;
      let icon = document.getElementById('appPage-icon');
      if (obj.apps[0].tag == 'action') {
        tag = "Экшен";
      } else if (obj.apps[0].tag == 'arcade') {
        tag = "Аркады";
      } else if (obj.apps[0].tag == 'communication') {
        tag = "Связь";
      } else if (obj.apps[0].tag == 'media') {
        tag = "Музыка и видео";
      } else if (obj.apps[0].tag == 'news') {
        tag = "Новости";
      } else if (obj.apps[0].tag == 'productivity') {
        tag = "Продуктивность";
      } else if (obj.apps[0].tag == 'simulation') {
        tag = "Симуляторы";
      } else if (obj.apps[0].tag == 'social') {
        tag = "Социальные сети";
      } else if (obj.apps[0].tag == 'strategy') {
        tag = "Стратегии";
      } else if (obj.apps[0].tag == 'utilities') {
        tag = "Инструменты";
      } else if (obj.apps[0].tag == 'RPG') {
        tag = "RPG";
      }
      if (obj.apps[0].windows == 0) {
        document.getElementById('appPage-windows').style.display = "none";
      }
      if (obj.apps[0].android == 0) {
        document.getElementById('appPage-android').style.display = "none";
      }
      if (obj.apps[0].head_image != 0) {
        appPage.style.background = "url(https://thetenstore.ru/" + obj.apps[0].head_image + ")";
      } else {
        let random = Math.floor(Math.random() * 10) + 1;
        appPage.style.background = "url(https://thetenstore.ru/images/headers/" + random  + ".jpg)";
      }
      if (obj.apps[0].padding != 0) {
        icon.style.width = '150px';
        icon.style.height = '150px';
        icon.style.padding = '15px';
      }
      if (obj.apps[0].screenshots == 0) {
        document.getElementById('screenshots').style.display = "none";
      } else {
        document.getElementById('screenshots').innerHTML = obj.apps[0].screenshots;
      }
      icon.src = "https://thetenstore.ru/" + obj.apps[0].icon;
      icon.style.background = obj.apps[0].bg;
      appPage.style.objectFit = 'cover';
      appPage.style.backgroundAttachment = 'fixed';
      appPage.style.backgroundPosition = 'center';
      appPage.style.backgroundRepeat = 'no-repeat';
      appPage.style.backgroundSize = 'cover';
      document.getElementById('appPage-rating').innerHTML = rating + "/5.0";
      document.getElementById('appPage-name').innerHTML = obj.apps[0].appname;
      document.getElementById('appPage-dev').innerHTML = obj.apps[0].devname;
      document.getElementById('appPage-description').innerHTML = obj.apps[0].description;
      document.getElementById('appPage-whatsNew').innerHTML = obj.apps[0].whatsNew;
      document.getElementById('appPage-downloadLink').action = "https://thetenstore.ru/" + obj.apps[0].windows;
      document.getElementById('appPage-title').innerHTML = obj.apps[0].appname + " — TenStore";
      document.getElementById('appPage-titleIcon').href = "https://thetenstore.ru/" + obj.apps[0].icon;
      document.getElementById('appPage-category').innerHTML = "<a class='link' href='appsList?tag=" + obj.apps[0].tag + "'>" + tag + "</a>";
      document.getElementById('appPage-details1').innerHTML = "Версия (Windows): " + obj.apps[0].version + "<br> \
      Вес: 0 МБ<br> \
      Разработчик: " + obj.apps[0].devname + "<br> \
      Издатель: " + obj.apps[0].devname + "<br> \
      Опубликовано: 30 апреля 2020г.<br> \
      Скачано: " + obj.apps[0].downloads + "<br> \
      Категория: <a class='link' href='appsList?tag=" + obj.apps[0].tag + "'>" + tag + "</a><br> \
      Рейтинг: " + rating + "/5.0";

  }
}
});
request.send(params);
let selectDev = "devname";
let aaa = document.getElementById('appPage-dev');
valueDev = aaa.innerHTML;
const requestDev = new XMLHttpRequest();
const paramsDev = "action=" + action + "&select=" + selectDev + "&value=" + valueDev;
requestDev.responseType =	"json";
requestDev.open("POST", url, true);
requestDev.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
requestDev.addEventListener("readystatechange", () => {
  if (requestDev.readyState === 4 && requestDev.status === 200) {
    let objDev = requestDev.response;
    for(let i=0; i<objDev.apps.length; i++) {
      var aCardDev = document.createElement('div');
      let width = 0;
      if (objDev.apps[i].padding == 15) {
        width = '120px';
      } else {
        width = '150px';
      }
      aCardDev.className = 'aCard';
      aCardDev.innerHTML = "<a href='app?&id="+ objDev.apps[i].id +"'> \
        <img class='aCardIcon' style='width: " + width + "; height: " + width + "; background: "+ objDev.apps[i].bg +"; padding: "+ objDev.apps[i].padding +"px' src='"+ objDev.apps[i].icon +"'> \
        <h3 class='aCardName'>"+ objDev.apps[i].appname +"</h3> \
        <h3 class='aCardDev'>"+ objDev.apps[i].devname +"</h3> \
      </a>"
      aCardDev.innerHTML = "<a href='app?&id="+ objDev.apps[i].id +"'> \
        <img class='aCard-icon' style='width: " + width + "; height: " + width + "; background: "+ objDev.apps[i].bg +"; padding: "+ objDev.apps[i].padding +"px' src='"+ objDev.apps[i].icon +"'> \
        <h4 class='aCard-name'>"+ objDev.apps[i].appname +"</4> \
      </a>"
      document.getElementById('aCard-block').appendChild(aCardDev);
    }
  }
});
requestDev.send(paramsDev);
