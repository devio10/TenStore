function getUrlVars(key) {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
}

let action = "4LlFCT";
let id = getUrlVars()["id"];
let appBackground;
let devName;

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
      let tags = 0;
      devName = obj.apps[0].dev;
      let icon = document.getElementById('appPage-icon');
      if (obj.apps[0].tags == 'action') {
        tags = "Экшен";
      } else if (obj.apps[0].tags == 'arcade') {
        tags = "Аркады";
      } else if (obj.apps[0].tags == 'communication') {
        tags = "Связь";
      } else if (obj.apps[0].tags == 'media') {
        tags = "Музыка и видео";
      } else if (obj.apps[0].tags == 'news') {
        tags = "Новости";
      } else if (obj.apps[0].tags == 'productivity') {
        tags = "Продуктивность";
      } else if (obj.apps[0].tags == 'simulation') {
        tags = "Симуляторы";
      } else if (obj.apps[0].tags == 'social') {
        tags = "Социальные сети";
      } else if (obj.apps[0].tags == 'strategy') {
        tags = "Стратегии";
      } else if (obj.apps[0].tags == 'utilities') {
        tags = "Инструменты";
      } else if (obj.apps[0].tags == 'RPG') {
        tags = "RPG";
      }
      if (obj.apps[0].windows == 0) {
        document.getElementById('appPage-windows').style.display = "none";
      }
      if (obj.apps[0].android == 0) {
        document.getElementById('appPage-android').style.display = "none";
      }
      if (localStorage.getItem('app-background')!='false') {
        if (obj.apps[0].bg != 0) {
          appPage.style.background = "linear-gradient(0deg, var(--rgba) 0%, rgba(0,0,0,0) 59%), url(https://thetenstore.ru/" + obj.apps[0].bg + ")";
        } else {
          let random = Math.floor(Math.random() * 10) + 1;
          appPage.style.background = "linear-gradient(0deg, var(--rgba) 0%, rgba(0,0,0,0) 59%), url(https://thetenstore.ru/images/headers/" + random  + ".jpg)";
        }
        appPage.style.backgroundPosition = 'center';
        appPage.style.backgroundRepeat = 'no-repeat';
        appPage.style.backgroundSize = 'cover';
      }

      if (obj.apps[0].icon_pad != 0) {
        icon.style.width = '150px';
        icon.style.height = '150px';
        icon.style.padding = '15px';
      }
      let iconBg = obj.apps[0].icon_bg;
      if (iconBg == 0) {
        cssBg = 'var(--bg)';
      } else {
        cssBg = obj.apps[0].icon_bg;
      }
      icon.src = "https://thetenstore.ru/" + obj.apps[0].icon;
      icon.style.background = cssBg;

      document.getElementById('appPage-rating').innerHTML = rating + "/5.0";
      document.getElementById('appPage-name').innerHTML = obj.apps[0].name;
      document.getElementById('mLogo2').innerHTML = obj.apps[0].name;
      document.getElementById('appPage-dev').innerHTML = obj.apps[0].dev;
      document.getElementById('appPage-description').innerHTML = obj.apps[0].descr;
      document.getElementById('appPage-whatsNew').innerHTML = obj.apps[0].changelog;
      if (obj.apps[0].changelog == 0) {
        document.getElementById('fourthBlock').style.display = 'none';
        document.getElementById('flex1').style.display = 'block';
        document.getElementById('thirdBlock').className = "appPage-block third wide";
        document.getElementById('thirdBlock').style.marginRight = "auto";
      }
      let publisher;
      if (obj.apps[0].pub == 0) {
        publisher = obj.apps[0].dev;
      } else {
        publisher = obj.apps[0].pub;
      }
      let dPlatform;
      if (localStorage.getItem('platform') == 'android') {
        dPlatform = obj.apps[0].android;
      } else {
        dPlatform = obj.apps[0].windows;
      }
      document.getElementById('appPage-downloadLink').action = dPlatform;
      document.getElementById('appPage-title').innerHTML = obj.apps[0].name + " — TenStore";
      document.getElementById('appPage-titleIcon').href = "https://thetenstore.ru/" + obj.apps[0].icon;
      document.getElementById('appPage-category').innerHTML = "<a class='link' href='appsList?tag=" + obj.apps[0].tags + "'>" + tags + "</a>";
      document.getElementById('appPage-details1').innerHTML = "Версия (Windows): " + obj.apps[0].version + "<br> \
      Вес: " + obj.apps[0].size + "<br> \
      Разработчик: " + obj.apps[0].dev + "<br> \
      Издатель: " + publisher + "<br> \
      Опубликовано: <br> \
      Скачано: " + obj.apps[0].downloads + "<br> \
      Категория: <a class='link' href='appsList?tag=" + obj.apps[0].tags + "'>" + tags + "</a><br> \
      Рейтинг: " + rating + "/5.0";

      const requestDev = new XMLHttpRequest();
      const paramsDev = "action=KdSqSAOC&select=dev" + "&value=" + devName;
      console.log(paramsDev);
      requestDev.responseType =	"json";
      requestDev.open("POST", url, true);
      requestDev.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestDev.addEventListener("readystatechange", () => {
        if (requestDev.readyState === 4 && requestDev.status === 200) {
          let maobj = requestDev.response;
          for(let i=0; i<maobj.apps.length; i++) {
            let iconBg = maobj.apps[i].icon_bg;
            if (iconBg == 0) {
              cssBg = 'var(--bg)';
            } else {
              cssBg = maobj.apps[i].icon_bg;
            }
            var aCard = document.createElement('div');
            //let width = 0;
            if (maobj.apps[i].icon_pad == 15) {
              width = '120px';
            } else {
              width = '150px';
            }
            aCard.className = 'aCard';
            aCard.innerHTML = "<a href='app?&id="+ maobj.apps[i].id +"'> \
              <img class='aCard-icon' style='width: " + width + "; height: " + width + "; background: "+ cssBg +"; padding: "+ maobj.apps[i].icon_pad +"px' src='https://thetenstore.ru/"+ maobj.apps[i].icon +"'> \
              <h4 class='aCard-name'>"+ maobj.apps[i].name +"</h4> \
            </a>"
            document.getElementById('aCard-block').appendChild(aCard);
          }
        }
      });
      requestDev.send(paramsDev);
  }
}
});
request.send(params);
