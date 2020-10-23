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
if ((getUrlVars()['tag']!=null)&&(getUrlVars()['tag']!='rec-upd')&&(getUrlVars()['tag']!='game-rec-upd')) {
  select='category';
  value=getUrlVars()['tag'];
} else if (getUrlVars()['dev'] != null) {
  select = 'dev';
  value = getUrlVars()['dev'];
} else if (getUrlVars()['pub'] != null) {
  select = 'pub';
  value = getUrlVars()['pub'];
} else if (getUrlVars()['type'] != null) {
  select = 'type';
  value = getUrlVars()['type'];
} else if (getUrlVars()['search']!=null) {
  action='d6Gj59';
  search=getUrlVars()['search'];
} else {
  select = "upd";
  value = "app";
}
if ((getUrlVars()['tag']=='game-rec-upd')) {
  value='game';
}
const request = new XMLHttpRequest();
const url = "https://thetenstore.ru/api.php";
let params;
if (getUrlVars()['search']!=null) {
  params="action="+action+"&search="+search;
} else {
  params="action="+action+"&select="+select+"&value="+value;
}
request.responseType="json";
request.open("POST", url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.addEventListener("readystatechange", () => {
  if (request.readyState === 4 && request.status === 200) {
    let obj=request.response;
    for(let i=0; i<obj.apps.length; i++) {
      document.getElementById('no-elements').style.display='none';
      showAppCard('aCard-block', obj.apps[i].icon, obj.apps[i].icon_pad, obj.apps[i].icon_bg, obj.apps[i].id, obj.apps[i].name, obj.apps[i].dev);
    }
  }
});
request.send(params);

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
function category(category, catName) {
  window.open('appsList?tag='+category, '_self');
}
function ifSearch () {
  if (getUrlVars()['search']!=null) {
    document.getElementById('appsList-title').innerHTML='Поиск';
    document.getElementById('dev-title').innerHTML='Поиск по запросу "'+getUrlVars()['search']+'"';
    document.getElementById('siteSearch').value=getUrlVars()['search'];
    document.getElementById('appsList-icon').href='images/search.svg';
  }
}
function ifGame () {
  if ((getUrlVars()['type']=='game')||(getUrlVars()['tab']=='game')) {
    document.getElementById('chosen').style.fontFamily='var(--regular)';
    document.getElementById('gameTab').style.fontFamily='var(--bold)';
    document.getElementById('apps-categ').style.display='none';
    document.getElementById('games-categ').style.display='block';
  }
}
function isGame() {
  document.getElementById('chosen').style.fontFamily='var(--regular)';
  document.getElementById('gameTab').style.fontFamily='var(--bold)';
  document.getElementById('apps-categ').style.display='none';
  document.getElementById('games-categ').style.display='block';
}
function setTagName () {
  let tagName;
  let tagCode;
  if (getUrlVars()['tag']!=null) {
    if (getUrlVars()['tag']=='Музыка и видео') {
      tagName='Музыка и видео';
      tagCode='media';
      tagIcon='media';
    } else if (getUrlVars()['tag']=='VPN и прокси') {
      tagName='VPN и прокси';
      tagCode='vpn';
      tagIcon='vpn';
    } else if (getUrlVars()['tag']=='Связь') {
      tagName='Связь';
      tagCode='communication';
      tagIcon='commun';
    } else if (getUrlVars()['tag']=='Новости') {
      tagName='Новости';
      tagCode='news';
      tagIcon='news';
    } else if (getUrlVars()['tag']=='Продуктивность') {
      tagName='Продуктивность';
      tagCode='productivity';
      tagIcon='prod2';
    } else if (getUrlVars()['tag']=='Здоровье') {
      tagName='Здоровье';
      tagCode='health';
      tagIcon='health';
    } else if (getUrlVars()['tag']=='Дополнения') {
      tagName='Дополнения';
      tagCode='additions';
      tagIcon='addit';
    } else if (getUrlVars()['tag']=='Шоппинг') {
      tagName='Шоппинг';
      tagCode='shopping';
      tagIcon='shop';
    } else if (getUrlVars()['tag']=='Видеосвязь') {
      tagName='Видеосвязь';
      tagCode='videocommunication';
      tagIcon='webcam';
    } else if (getUrlVars()['tag']=='Социальные сети') {
      tagName='Социальные сети';
      tagCode='social';
      tagIcon='social';
    } else if (getUrlVars()['tag']=='Инструменты') {
      tagName='Инструменты';
      tagCode='utilities';
      tagIcon='util';
    } else if (getUrlVars()['tag']=='game-rec-upd') {
      tagName='Недавно обновлено';
      tagCode='rec-upd';
      tagIcon='rec-upd';
      isGame();
    } else if (getUrlVars()['tag']=='RPG') {
      tagName='RPG';
      tagCode='rpg';
      tagIcon='rpg';
      isGame();
    } else if (getUrlVars()['tag']=='Симуляторы') {
      tagName='Симуляторы';
      tagCode='simulation';
      tagIcon='simul';
      isGame();
    } else if (getUrlVars()['tag']=='Стратегии') {
      tagName='Стратегии';
      tagCode='strategy';
      tagIcon='strategy';
      isGame();
    } else if (getUrlVars()['tag']=='Экшен') {
      tagName='Экшен';
      tagCode='action';
      tagIcon='action';
      isGame();
    } else if (getUrlVars()['tag']=='Аркада') {
      tagName='Аркада';
      tagCode='arcade';
      tagIcon='arcade';
      isGame();
    } else {
      tagName='Недавно обновлено';
      tagCode='rec-upd';
      tagIcon='rec-upd';
    }
    document.getElementById('appsList-title').innerHTML=tagName+' — TenStore';
    document.getElementById('dev-title').innerHTML=tagName;
    document.getElementById('item-'+tagCode).style.fontFamily='var(--bold)';
    document.getElementById('appsList-icon').href='images/category/'+tagIcon+'.svg';
  }
}
