function search () {
  let searchBlock = document.getElementById('appsList-dS-block');
  if (searchBlock.style.display == "block") {
    searchBlock.style.display = "none";
  } else {
    searchBlock.style.display = "block";
  }
}
let select;
let action='KdSqSAOC';
if ((getUrlVars()['tag']!=null)&&(getUrlVars()['tag']!='rec-upd')&&(getUrlVars()['tag']!='game-rec-upd')&&(getUrlVars()['tag']!='popular')) {
  select='category';
  value=getUrlVars()['tag'];
} else if (getUrlVars()['dev']!=null) {
  select='dev';
  value=decodeURIComponent(getUrlVars()['dev']);
} else if (getUrlVars()['pub']!=null) {
  select='pub';
  value=getUrlVars()['pub'];
} else if (getUrlVars()['type']!=null) {
  select='type';
  value=getUrlVars()['type'];
} else if (getUrlVars()['search']!=null) {
  action='d6Gj59';
  search=decodeURIComponent(getUrlVars()['search']);
} else if (getUrlVars()['list']!=null) {
  select=getUrlVars()['list'];
  value=0;
} else {
  select='upd';
  value='app';
}
if ((getUrlVars()['tag']=='game-rec-upd')) {
  value='game';
}
var isNotFound;
const request = new XMLHttpRequest();
const url = "https://tstore.space/api.php";
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
      isNotFound='false';
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
    window.open('https://tstore.space/appsList?tag=' + value, '_self');
  } else if (dev == true) {
    window.open('https://tstore.space/appsList?dev=' + devV, '_self');
  } else {
    window.open('https://tstore.space/appsList?type=' + sType, '_self');
  }
}
function category(category, catName) {
  window.open('appsList?tag='+category, '_self');
}
function list(listName) {
  window.open('appsList?list='+listName, '_self');
}
function ifSearch () {
  if (getUrlVars()['search']!=null) {
    document.getElementById('appsList-title').innerHTML='Поиск';
    document.getElementById('dev-title').innerHTML='Поиск по запросу "'+decodeURIComponent(getUrlVars()['search'])+'"';
    document.getElementById('siteSearch').value=decodeURIComponent(getUrlVars()['search']);
    document.getElementById('appsList-icon').href='images/search.svg';
  } else if (getUrlVars()['dev']!=null) {
    document.getElementById('appsList-title').innerHTML='Приложения от '+decodeURIComponent(getUrlVars()['dev']);
    document.getElementById('dev-title').innerHTML='Приложения от '+decodeURIComponent(getUrlVars()['dev']);
    document.getElementById('appsList-icon').href='images/search.svg';
  }
}
function ifGame () {
  if ((getUrlVars()['type']=='game')||(getUrlVars()['tab']=='game')) {
    if (getUrlVars()['tag']==null) {
      document.getElementById('appsList-title').innerHTML='Недавно обновлено — TenStore';
      document.getElementById('dev-title').innerHTML='Недавно обновлено';
      document.getElementById('item-game-rec-upd').classList.add('tab-selected');
      document.getElementById('appsList-icon').href='images/category/rec-upd.svg';
      isGame();
    }
    document.getElementById('chosen').style.fontFamily='var(--regular)';
    document.getElementById('gameTab').style.fontFamily='var(--bold)';
    document.getElementById('apps-categ').style.display='none';
    document.getElementById('games-categ').style.display='var(--tabs-display)';
    document.getElementById('apps-i').className='ph-squares-four phoneNav-icon';
    document.getElementById('games-i').className='ph-game-controller-fill phoneNav-icon phoneNav-link-active';
    document.getElementById('apps-span').className='phoneNav-text';
    document.getElementById('games-span').className='phoneNav-text phoneNav-link-active';
  }
}

function isGame () {
  document.getElementById('chosen').style.fontFamily='var(--regular)';
  document.getElementById('gameTab').style.fontFamily='var(--bold)';
  document.getElementById('apps-categ').style.display='none';
  document.getElementById('games-categ').style.display='flex';
  document.getElementById('apps-i').className='ph-squares-four phoneNav-icon';
  document.getElementById('games-i').className='ph-game-controller-fill phoneNav-icon phoneNav-link-active';
  document.getElementById('apps-span').className='phoneNav-text';
  document.getElementById('games-span').className='phoneNav-text phoneNav-link-active';
}

function setTagName () {
  let tagName;
  let tagCode;
  if (getUrlVars()['tag']!=null) {
    var decodedTag=decodeURIComponent(getUrlVars()['tag']);
    var type=getUrlVars()['type'];
    if (decodedTag=='Музыка и видео') {
      tagName='Музыка и видео';
      tagCode='media';
      tagIcon='media';
    } else if (decodedTag=='VPN и прокси') {
      tagName='VPN и прокси';
      tagCode='vpn';
      tagIcon='vpn';
    } else if (decodedTag=='Связь') {
      tagName='Связь';
      tagCode='communication';
      tagIcon='commun';
    } else if (decodedTag=='Новости') {
      tagName='Новости';
      tagCode='news';
      tagIcon='news';
    } else if (decodedTag=='Продуктивность') {
      tagName='Продуктивность';
      tagCode='productivity';
      tagIcon='prod2';
    } else if (decodedTag=='Здоровье') {
      tagName='Здоровье';
      tagCode='health';
      tagIcon='health';
    } else if (decodedTag=='Дополнения') {
      tagName='Дополнения';
      tagCode='additions';
      tagIcon='addit';
    } else if (decodedTag=='Шоппинг') {
      tagName='Шоппинг';
      tagCode='shopping';
      tagIcon='shop';
    } else if (decodedTag=='Видеосвязь') {
      tagName='Видеосвязь';
      tagCode='videocommunication';
      tagIcon='webcam';
    } else if (decodedTag=='Социальные сети') {
      tagName='Социальные сети';
      tagCode='social';
      tagIcon='social';
    } else if (decodedTag=='Инструменты') {
      tagName='Инструменты';
      tagCode='utilities';
      tagIcon='util';
    } else if (decodedTag=='game-rec-upd') {
      tagName='Недавно обновлено';
      tagCode='rec-upd';
      tagIcon='rec-upd';
      isGame();
    } else if (decodedTag=='RPG') {
      tagName='RPG';
      tagCode='rpg';
      tagIcon='rpg';
      isGame();
    } else if (decodedTag=='Симуляторы') {
      tagName='Симуляторы';
      tagCode='simulation';
      tagIcon='simul';
      isGame();
    } else if (decodedTag=='Стратегии') {
      tagName='Стратегии';
      tagCode='strategy';
      tagIcon='strategy';
      isGame();
    } else if (decodedTag=='Экшен') {
      tagName='Экшен';
      tagCode='action';
      tagIcon='action';
      isGame();
    } else if (decodedTag=='Аркада') {
      tagName='Аркада';
      tagCode='arcade';
      tagIcon='arcade';
      isGame();
    } else if (decodedTag=='Файтинги') {
      tagName='Файтинги';
      tagCode='fighting';
      tagIcon='fighting';
      isGame();
    } else {
      tagName='Недавно обновлено';
      tagCode='rec-upd';
      tagIcon='rec-upd';
    }
    document.getElementById('appsList-title').innerHTML=tagName+' — TenStore';
    document.getElementById('dev-title').innerHTML=tagName;
    document.getElementById('item-'+tagCode).classList.add('tab-selected');
    document.getElementById('appsList-icon').href='images/category/'+tagIcon+'.svg';
  }
}
function ifList () {
  let urlList=getUrlVars()['list'];
  let listIcon;
  if (urlList!=null) {
    listIcon='images/category/'+urlList+'.svg';
    if (urlList=='popular') {
      listTitle='Популярное';
    } else if (urlList=='high-rated') {
      listTitle='Высокий рейтинг';
    } else if (urlList=='editors-choice') {
      listTitle='Выбор редакции';
    } else if (urlList=='recommended') {
      listTitle='Специально для вас';
    }
    document.getElementById('appsList-title').innerHTML=listTitle+' — TenStore';
    document.getElementById('dev-title').innerHTML=listTitle;
    document.getElementById('item-'+urlList).style.fontFamily='var(--bold)';
    document.getElementById('item-'+urlList).classList.add('tab-selected');
    document.getElementById('appsList-icon').href=listIcon;
  }
}
function ifNotFound () {
  document.getElementById('no-elements').style.display='none';
}
