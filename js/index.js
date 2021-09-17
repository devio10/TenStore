
function getUrlVars(key) {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
}
function checkUrlVars() {
  hideAllBlocks();
  if (getUrlVars()['id']!=null) {
    showAB(getUrlVars()['id'], true);
  } else if (getUrlVars()['list']!=null) {
    showList(getUrlVars()['par1'], getUrlVars()['par2'], getUrlVars()['donotToggle'], getUrlVars()['par3'], getUrlVars()['background'], getUrlVars()['font'], getUrlVars()['nameColor'], getUrlVars()['subColor'], getUrlVars()['nameSize'], true);
  } else if (getUrlVars()['search']!=null) {
    hmContent('search');
    goSearch(getUrlVars()['search']);

  } else if (getUrlVars()['block']=='search') {
    hmContent("search")
  } else if (getUrlVars()['block']=='user') {
    toggleUB(true);
  } else if (getUrlVars()['block']=='settings') {
    toggleSettings(true);
  }
}

function loadCards() {
  var cards=new XMLHttpRequest();
  var cardskey='action=HKdoi40';
  cards.responseType = "json";
  cards.open("POST", api, true);
  cards.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  cards.addEventListener("readystatechange", () => {
    if ((cards.readyState===4)&&(cards.status===200)) {
      var cardsData=cards.response;

      if (cardsData!=undefined) {
        document.getElementById('index-loading').style.display='none';
        for (let i=0; i<cardsData.cards.length; i++) {
           let cardobj=document.createElement('div');
           if (cardsData.cards[i].type=='2_wide') {
             let btm_buttons=`
               <i class="hm-card-button ph-cloud-arrow-down-light" onclick="download(${cardsData.cards[i].link_app})"></i>
               <i class="hm-card-button ph-info-light" onclick="showAB(${cardsData.cards[i].link_app})"></i>
             `;
             if (cardsData.cards[i].download_button==0) {
               btm_buttons=`
                 <i class="hm-card-button ph-info-light" onclick="showAB(${cardsData.cards[i].link_app})"></i>
               `;
             }
             let toptitle='';
             if (cardsData.cards[i].top_title!='') {
               toptitle=`<h4 class="hm-card-toptext1">${cardsData.cards[i].top_title}</h4>`;
             }
             cardobj.innerHTML=`
             ${toptitle}
             <div class='hm-card new' style='background-image: linear-gradient(0deg, rgba(0,0,0,0.8), rgba(0,0,0,0.3) ), url(https://tstore.space/${cardsData.cards[i].bg_image}); background-repeat: no-repeat; background-size: cover; background-position: center'>
               <div class="hm-card-rate">
                 <h5 class="hc-rate-text">${cardsData.cards[i].age_rating}+</h5>
               </div>
               <h1 class="hm-card-title new">${cardsData.cards[i].title}</h1>
               <h4 class="hm-card-text new">${cardsData.cards[i].text}</h4>
               <hr class="hm-card-hr">

               <div class="flex-row">
                ${btm_buttons}
               </div>
             </div>
             `;

            document.getElementById('hm-index').appendChild(cardobj);
           }
        }
      } else {
        popup('Ошибка при загрузке страницы', 'warning');
      }

    }
  });
  cards.send(cardskey);
}
function hideAllBlocks () {
  if (ab.style.display=='block') {
    toggleAB(true);
  }
  if (list.style.display=='block') {
    toggleList(null, true);
  }
  if (ubObj.style.display=='block') {
    toggleUB(true);
  }
  if (setObj.style.display=='block') {
    toggleSettings(true);
  }
}
function toggleADT() {
  curADT=localStorage.getItem('autoDarkTheme');
  if (curADT=='false') {
    localStorage.setItem('autoDarkTheme', 'true');
    document.getElementById('adt-help').style.display='block';
  } else {
    localStorage.setItem('autoDarkTheme', 'false');
    document.getElementById('adt-help').style.display='none';
  }
  checkTheme();
}

var selHC='index';
function hmContent(page) {
  document.getElementById('hm-index').style.display='none';
  document.getElementById('hm-apps').style.display='none';
  document.getElementById('hm-games').style.display='none';
  document.getElementById('hm-search').style.display='none';
  document.getElementById('hm-'+page).style.display='flex';

  selHC=page;

  let iconClass;
  if (page=='index') { iconClass='house' }
  else if (page=='apps') { iconClass='squares-four' }
  else if (page=='games') { iconClass='game-controller' }
  else if (page=='search') { iconClass='magnifying-glass'; checkHistory() }

  document.getElementById('nav-index').className='';
  document.getElementById('nav-apps').className='';
  document.getElementById('nav-games').className='';
  document.getElementById('nav-search').className='';

  document.getElementById('nav-index').classList='ph-house-light ui-nav-icon ui-nav-icon-highlight';
  document.getElementById('nav-apps').classList='ph-squares-four-light ui-nav-icon ui-nav-icon-highlight';
  document.getElementById('nav-search').classList='ph-magnifying-glass-light ui-nav-icon ui-nav-icon-highlight';
  document.getElementById('nav-games').classList='ph-game-controller-light ui-nav-icon ui-nav-icon-highlight';



  document.getElementById('nav-'+page).classList='ph-'+iconClass+'-fill ui-nav-icon';

  document.getElementById('nav-'+page).classList='ph-'+iconClass+'-fill ui-nav-icon ui-nav-icon-highlight';
  window.scrollTo(0, 0);
}

function setPlatform(pmName) {
  localStorage.setItem('platform', pmName);
  document.getElementById('s-platform').innerText=localStorage.getItem('platform');
  document.getElementById('cur-platform').innerText='Текущая: '+localStorage.getItem('platform');
  if ((pmName=='Windows')||(pmName=='Linux')) {
    document.getElementById('device-icon').src='img/icons/device-desktop.svg';
  } else {
    document.getElementById('device-icon').src='img/icons/device-mobile.svg';
  }
}

function debug_newReview() {
  toggleAB();
  document.getElementById('ab-main_content').style.display='none';
  document.getElementById('ab-new_review').style.display='block';
}

/* AFTERLOAD */
const api='https://tstore.space/api.php';
var head=document.getElementsByTagName('HEAD')[0];
var body=document.getElementsByTagName('body')[0];
if ((localStorage.getItem('platform')==null)&&(localStorage.getItem('manual-platform')!='true')) {
  var script=document.createElement('script');
  script.src='js/detect-os.js';
  head.appendChild(script);
}
checkTheme();
login();
checkUrlVars();
checkPars();
checkPlatform();

efNavigationBar();

document.getElementById('s-platform').innerText=localStorage.getItem('platform');
if ((localStorage.getItem('platform')=='Windows')||(localStorage.getItem('platform')=='Linux')) {
  document.getElementById('device-icon').src='img/icons/device-desktop.svg';
} else {
  document.getElementById('device-icon').src='img/icons/device-mobile.svg';
}
window.onpopstate=function(event) {
  checkUrlVars();
};

if (localStorage.getItem('ef-home-cards')=='true') {
  loadCards();
}

function checkHistory() {
  document.getElementById('search-main_content').style.display='block';
  document.getElementById('search_list').style.display='none';
  let history=JSON.parse(localStorage.getItem('search-history'));
  let historyList=document.getElementById('search-history');
  historyList.innerHTML='';
  let historyLength=0;
  if (history!=null) {
    historyLength=Object.keys(history).length;
  }
  for (var i = 0; i < historyLength; i++) {
    let historyItem=document.createElement('div');
    historyItem.className='search-item';
    historyItem.setAttribute('onclick', `goSearch('${Object.values(history)[i]}')`);
    historyItem.innerHTML=`
    <i class="ph-magnifying-glass-bold"></i>
    <p class="search-item-text">${Object.values(history)[i]}</p>
    `;
    historyList.appendChild(historyItem);
  }

  window.history.pushState(null, '', `?block=search`);
}
function writeHistory(value) {
  let history=localStorage.getItem('search-history');
  if (history==null) {
    history=JSON.stringify({});
  }
  history=JSON.parse(history);

  let historyLength=Object.keys(history).length;
  history[`i${historyLength}`]=value;

  localStorage.setItem('search-history', JSON.stringify(history));
}

function goSearch(historyValue) {
  loadbox('begin', 15000);
  document.getElementById('search-main_content').style.display='none';
  document.getElementById('search_list').style.display='flex';

  let searchValue=document.getElementById('hm-search-input').value;
  if (historyValue!=null) {
    searchValue=historyValue;
  }

  var searchPars=`action=d6Gj59&search=${searchValue}`;
  console.log(`${searchPars} 9:10`);
  writeHistory(searchValue);

  window.history.pushState(null, '', `?search=${searchValue}`);
  var search=new XMLHttpRequest();
  search.responseType='json';
  search.open('POST', api, true);
  search.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  search.addEventListener("readystatechange", () => {
    if ((search.readyState===4)&&(search.status===200)) {
      document.getElementById('search_list').innerHTML='';
      var listData=search.response;
      console.log(listData);
      /*
      loadScrn.style.display='none';
      mainScrn.style.display='block';
      */
      if (listData.apps!=undefined) {
        for (let i=0; i<listData.apps.length; i++) {
          let iconPadding='0';
          let iconBg='white';
          let iconSize='40px';
          let liIcon='https://tstore.space/'+listData.apps[i].icon;
          if (listData.apps[i].icon=='') {
            liIcon='img/prohibit.svg';
          }
          if (listData.apps[i].icon_bg!=0) {
            iconBg=listData.apps[i].icon_bg;
          }
          if (listData.apps[i].icon_pad!=0) {
            iconPadding='5px';
            iconSize='30px';
          }
          let appdev=listData.apps[i].dev;
          if (listData.apps[i].pub!='') {
            appdev=listData.apps[i].pub;
          }
          var listItem=document.createElement('div');
          listItem.className='app-item';
          listItem.innerHTML="<img class='ai-icon' onclick='showAB("+listData.apps[i].id+")' style='background: "+iconBg+"; padding: "+iconPadding+"; width: "+iconSize+"; height: "+iconSize+"' src='"+liIcon+"'> \
          <div class='ai-text'> <h5 onclick='showAB("+listData.apps[i].id+")' class='ai-name'>"+listData.apps[i].name+"</h5> <h5 onclick='showAB("+listData.apps[i].id+")' class='ai-dev'>"+appdev+"</h5> </div> \
          <i onclick='showAB("+listData.apps[i].id+")' class='ph-info ai-info'></i> <i onclick='download("+listData.apps[i].id+"); popup(`Скачивание началось`, `cloud-arrow-down`)' class='ph-cloud-arrow-down ai-down'></i>"
          document.getElementById('search_list').appendChild(listItem);
          loadbox('end');
        }
      } else {
        loadbox('end');
        /* document.getElementById('list-noitems').style.display='flex'; */
      }
    }
  });
  search.send(searchPars);
}

function clearHistory () {
  let historyItems=document.getElementById('search-history').children;

  for (var i = 0; i < historyItems.length; i++) {
    historyItems[i].style.animationName='history-item-hide';
    let delay=i * (0.3 / historyItems.length);
    historyItems[i].style.animationDelay=`${delay}s`;
    removeHistoryItem(i);
  }
  localStorage.removeItem('search-history');

  let clearButton=document.getElementById('clear-history');
  clearButton.innerText='Очищено';
  popup('История поиска очищена', 'trash', 'small');
  setTimeout(function () {
    clearButton.innerText='Очистить';
    checkHistory();
  }, 3000);
}
function checkHistoryForRepeat(value) {
  let history=JSON.parse(localStorage.getItem('search-history'));

  for (var i = 0; i < Object.keys(history).length; i++) {
    if (value == Object.entries(history)[i]) {
      history[`i${i}`]=null;
      return false;
    } else {
      return true;
    }
  }
}
function removeHistoryItem(i) {
  setTimeout(function () {
    let historyItem=document.getElementById('search-history').children;
    historyItem[i].remove();
  }, 500);
}
