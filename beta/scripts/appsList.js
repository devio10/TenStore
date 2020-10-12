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
  select='tags';
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
  select = "type";
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
  if (getUrlVars()['tag']!=null) {
    if (getUrlVars()['tag']=='media') {
      tagName='Музыка и видео';
      tagIcon='media';
    } else if (getUrlVars()['tag']=='vpn') {
      tagName='VPN и прокси';
      tagIcon='vpn';
    } else if (getUrlVars()['tag']=='communication') {
      tagName='Связь';
      tagIcon='commun';
    } else if (getUrlVars()['tag']=='news') {
      tagName='Новости';
      tagIcon='news';
    } else if (getUrlVars()['tag']=='productivity') {
      tagName='Продуктивность';
      tagIcon='prod2';
    } else if (getUrlVars()['tag']=='health') {
      tagName='Здоровье';
      tagIcon='health';
    } else if (getUrlVars()['tag']=='addons') {
      tagName='Дополнения';
      tagIcon='addit';
    } else if (getUrlVars()['tag']=='shopping') {
      tagName='Шоппинг';
      tagIcon='shop';
    } else if (getUrlVars()['tag']=='videocommunication') {
      tagName='Видеосвязь';
      tagIcon='webcam';
    } else if (getUrlVars()['tag']=='social') {
      tagName='Социальные сети';
      tagIcon='social';
    } else if (getUrlVars()['tag']=='utilities') {
      tagName='Инструменты';
      tagIcon='util';
    } else if (getUrlVars()['tag']=='game-rec-upd') {
      tagName='Недавно обновлено';
      tagIcon='rec-upd';
      isGame();
    } else if (getUrlVars()['tag']=='rpg') {
      tagName='RPG';
      tagIcon='rpg';
      isGame();
    } else if (getUrlVars()['tag']=='simulation') {
      tagName='Симуляторы';
      tagIcon='simul';
      isGame();
    } else if (getUrlVars()['tag']=='strategy') {
      tagName='Стратегии';
      tagIcon='strategy';
      isGame();
    } else if (getUrlVars()['tag']=='action') {
      tagName='Экшен';
      tagIcon='action';
      isGame();
    } else if (getUrlVars()['tag']=='arcade') {
      tagName='Аркады';
      tagIcon='arcade';
      isGame();
    } else {
      tagName='Недавно обновлено';
      tagIcon='rec-upd';
    }
    document.getElementById('appsList-title').innerHTML=tagName+' — TenStore';
    document.getElementById('dev-title').innerHTML=tagName;
    document.getElementById('item-'+getUrlVars()['tag']).style.fontFamily='var(--bold)';
    document.getElementById('appsList-icon').href='images/category/'+tagIcon+'.svg';
  }
}
