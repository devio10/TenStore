function getUrlVars(key) {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
}

let action="4LlFCT";
let id=getUrlVars()["id"];
let appBackground;
let devName;
if ((localStorage.getItem('debug-noAppPageRedirect')!='true')&&(id==undefined)) {
  window.open('index?source=emptyAppPage', '_self');
}

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

      //document.getElementById('app-popups').style.display='none';

      let appPage = document.getElementById('appPage');
      devName = obj.apps[0].dev;
      let icon = document.getElementById('appPage-icon');
      /*Новые загрузки*/
      let files0=obj.apps[0].files;
      if (obj.apps[0].files!=0) {
        const files=JSON.parse(files0);
        for(let i=0; i<files.files.length; i++) {
          var downloadCard=document.createElement('div');
          downloadCard.className='download-card';
          let downloadCardIcon;
          if ((files.files[i].icon==0)||(files.files[i].icon==undefined)) {
            downloadCardIcon='file.svg';
          } else {
            downloadCardIcon=files.files[i].icon;
          }
          downloadCard.setAttribute('onclick',"window.open('https://thetenstore.ru/"+files.files[i].file+"', '_self')");
          downloadCard.innerHTML="<img class='download-card-icon' src='https://thetenstore.ru/images/platforms/"+downloadCardIcon+"'> \
          <div class='flex flex-column download-card-text'> \
            <h4 class='download-card-title'>"+files.files[i].platform+"</h4> \
            <h5 class='download-card-description grey'>"+files.files[i].architecture+" • "+files.files[i].version+" • "+files.files[i].published+" • "+files.files[i].size+" Мб</h5> \
          </div> \
          <img class='download-card-nexticon' src='images/download.svg'>";
          document.getElementById('download-cards-block').appendChild(downloadCard);
        }
      }

      /*Скриншоты*/
      let scr0=obj.apps[0].screenshots;
      if (obj.apps[0].screenshots!=0) {
        const screenshots=JSON.parse(scr0);
        console.log(screenshots);
        for(let s in screenshots.scr) {
          var screenshot=document.createElement('img');
          screenshot.className='screenshot';
          screenshot.setAttribute('onclick',"window.open('https://thetenstore.ru/"+screenshots.scr[s].image+"', '_self')");
          screenshot.src='https://thetenstore.ru/'+screenshots.scr[s].image;
          document.getElementById('screenshots').appendChild(screenshot);
        }
      }

      /*Отзывы*/
      let com0=obj.apps[0].comments;
      if (obj.apps[0].comments!=0) {
        const comments=JSON.parse(com0);
        console.log(comments);
        for(let c in comments.comments) {

          const userPicRequest=new XMLHttpRequest();
          const userPicUrl="https://thetenstore.ru/api.php";
          const userPicParams="action=FEhf42d&login="+comments.comments[c].login;
          userPicRequest.responseType="json";
          userPicRequest.open("POST", userPicUrl, true);
          userPicRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          userPicRequest.addEventListener("readystatechange", () => {
            if ((request.readyState === 4) && (request.status === 200)) {
              var reviewPic=userrr.user[0].photo;
            }
          });
          userPicRequest.send(userPicParams);

          var comment=document.createElement('img');
          if (comments.comments[c].isLiked=='1') {
            comment.className='review-card liked';
          } else {
            comment.className='review-card disliked';
          }
          comment.innerHTML="<div class='flex flex-row'> \
            <img class='review-card-userPic' src='"+reviewPic+"'> \
            <h5 class='review-card-name'>"+comments.comments[c].login+"</h5> \
          </div> \
          <h5 class='review-card-text'></h5>"
          console.log(comment);
          document.getElementById('reviews-block').appendChild(comment);
        }
      }


      /*if (obj.apps[0].windows == 0) {
        document.getElementById('appPage-windows').style.display = "none";
      }
      if (obj.apps[0].android == 0) {
        document.getElementById('appPage-android').style.display = "none";
      }*/
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
      let liked=obj.apps[0].liked;
      let disliked=obj.apps[0].disliked;
      if (obj.apps[0].liked==0) {
        liked='0';
      }
      if (obj.apps[0].disliked==0) {
        disliked='0';
      }
      var description=obj.apps[0].descr;
      var shortDescription=description.split('<p>');
      document.getElementById('app-description').innerHTML=shortDescription[0]+'..';

      document.getElementById('app-likes').innerHTML=liked;
      document.getElementById('app-dislikes').innerHTML=disliked;
      document.getElementById('appPage-name').innerHTML=obj.apps[0].name;
      document.getElementById('mLogo2').innerHTML=obj.apps[0].name;
      document.getElementById('appPage-dev').innerHTML=obj.apps[0].dev;
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
      document.getElementById('appPage-category').innerHTML = "<a class='link' href='appsList?tag=" + obj.apps[0].category + "'>" + obj.apps[0].category + "</a>";
      /* document.getElementById('appPage-details1').innerHTML = "Разработчик: " + obj.apps[0].dev + "<br> \
      Издатель: " + publisher + "<br> \
      Скачано: " + obj.apps[0].downloads + "<br> \
      Категория: <a class='link' href='appsList?tag=" + obj.apps[0].category + "'>" + obj.apps[0].category + "</a><br>"; */

      const requestDev = new XMLHttpRequest();
      const paramsDev = "action=KdSqSAOC&select=dev" + "&value=" + devName;
      requestDev.responseType =	"json";
      requestDev.open("POST", url, true);
      requestDev.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestDev.addEventListener("readystatechange", () => {
        if (requestDev.readyState === 4 && requestDev.status === 200) {
          let maobj = requestDev.response;
          for(let i=0; i<maobj.apps.length; i++) {
            showAppCard('aCard-block', maobj.apps[i].icon, maobj.apps[i].icon_pad, maobj.apps[i].icon_bg, maobj.apps[i].id, maobj.apps[i].name, '');
          }
        }
      });
      requestDev.send(paramsDev);
  }
} else {
  let random = Math.floor(Math.random() * 10) + 1;
  appPage.style.background = "linear-gradient(0deg, var(--rgba) 0%, rgba(0,0,0,0) 59%), url(https://thetenstore.ru/images/headers/" + random  + ".jpg)";
  appPage.style.backgroundPosition = 'center';
  appPage.style.backgroundRepeat = 'no-repeat';
  appPage.style.backgroundSize = 'cover';
}
});
request.send(params);

function fullDescription() {
  if (descType=='full') {
    descType='short';
    document.getElementById('showFull').innerHTML='Скрыть';
    document.getElementById('app-description').innerHTML=description;
  } else {
    var descType='long';
    document.getElementById('showFull').innerHTML='Показать полностью';
    document.getElementById('app-description').innerHTML=description;
  }
}
function scrollScreenshots (direction) {
  let newPosition;
  let previousPosition=document.getElementById('screenshots').scrollLeft;
  if (direction=='forward') {
    newPosition=previousPosition+150;
  } else {
    newPosition=previousPosition-150;
  }
  document.getElementById('screenshots').scroll({
    top: 0,
    left: newPosition,
    behavior: 'smooth'
  });
}
