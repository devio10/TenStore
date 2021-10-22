
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
    showList(getUrlVars()['list']);
  } else if (getUrlVars()['search']!=null) {
    hmContent('search');
    goSearch(getUrlVars()['search']);

  } else if (getUrlVars()['block']=='search') {
    hmContent("search")
  } else if (getUrlVars()['block']=='user') {
    toggleUB(true);
  } else if (getUrlVars()['block']=='settings') {
    toggleSettings(true);
  } else if (getUrlVars()['tenid_activation_code']!=null) {
    show_activation_popup();
  }
}
function show_activation_popup() {

  function toggle_popup(msg) {

    let obj = document.getElementById('top_alert');
    obj.children[0].innerHTML=msg;
    obj.style.display='block';

  }

  let key = getUrlVars()['tenid_activation_code'];

  if (key=='success') {

    toggle_popup('Ваша учётная запись TenID подтверждена. Теперь вы можете воспользоваться всеми её преимуществами.');

  } else if (key=='error') {

    toggle_popup(`При подтверждении учётной записи TenID что-то пошло не так. Пожалуйста, напишите в <a style='color: var(--tenstore_accent_dark)' onclick="toggleSettings(), setWindow('support')">поддержку</a>.`)

  }

}
var h_amount=2;
var h_page=0;
var lastload=0;

function loadCards(location) {

  if (lastload >= (Date.now() - 150)) {
    return;
  }
  lastload = Date.now();

  let locationPage=location;
  let more_loading=document.getElementById('more_cards_loading');

  if (h_page==0) {
    more_loading.style.display='none';
    document.getElementById(`hm-${locationPage}`).innerHTML=`
      <div id="${locationPage}-loading">
        <div class="ab-loading-block">
          <div class="ui-loading-wheel ui-42px"> </div>
          <h5 class="ui-gray">Контент загружается</h5>
        </div>
      </div>
    `;
  }


  var cards=new XMLHttpRequest();
  var cardskey='action=HKdoi40';
  h_page++;

  var cardRequestStatus;
  cards.responseType = "json";
  if (localStorage.getItem('ef-api2')=='true') {
    cardskey=`tab=${location}`;
    if (localStorage.getItem('ef-pages')=='true') {
      cardskey=`tab=${location}&amount=${h_amount}&page=${h_page}`;
    }
    cards.open("POST", api2_cards, true);
  } else {
    cards.open("POST", api, true);
  }

  cards.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  cards.addEventListener("readystatechange", () => {

    if ((cards.readyState===4)&&(cards.status===200)&&(cards!='null')) {

      /* timeout */
      setTimeout(function () {
        if (cardRequestStatus!='done') {
          popup('Превышено время ожидания', 'clock');
          // cards.abort();
        }
      }, 30000);

      var cardsData=cards.response;

      if (cardsData!=undefined) {
        document.getElementById(`${locationPage}-loading`).style.display='none';
        var skippedCard;
        for (let i=0; i<cardsData.cards.length; i++) {
           if (cardsData.cards[i].location==location) {

             let cardType=cardsData.cards[i].type;

             let cardobj=document.createElement('div');
             if (cardType=='2_wide') {
               let btm_buttons=`
                 <i class="hm-card-button ph-cloud-arrow-down-light" onclick="download(${cardsData.cards[i].appId})"></i>
                 <i class="hm-card-button ph-info-light" onclick="showAB(${cardsData.cards[i].appId})"></i>
               `;
               if (cardsData.cards[i].download_button==0) {
                 btm_buttons=`
                   <i class="hm-card-button ph-info-light" onclick="showAB(${cardsData.cards[i].appId})"></i>
                 `;
               }
               cardobj.className='hm-card new';
               cardobj.style.backgroundImage=`linear-gradient(0deg, rgba(0,0,0,0.8), rgba(0,0,0,0.3) ), url(https://tstore.space/${cardsData.cards[i].bg_image})`;
               cardobj.style.backgroundRepeat='no-repeat';
               cardobj.style.backgroundSize='cover';
               cardobj.style.backgroundPosition=`center`;
               cardobj.innerHTML=`
                 <div class="hm-card-rate">
                   <h5 class="hc-rate-text">${cardsData.cards[i].age_rating}+</h5>
                 </div>
                 <h1 class="hm-card-title new">${cardsData.cards[i].title}</h1>
                 <h4 class="hm-card-text new">${cardsData.cards[i].text}</h4>
                 <hr class="hm-card-hr">

                 <div class="flex-row">
                  ${btm_buttons}
                 </div>
               `;

            } else if (cardType=='1_small') {

              let phClass='';
              let src=`src='https://tstore.space/${cardsData.cards[i].bg_image}'`;
              let imgObj=`<img style="height: 300px; --ph_color: ${cardsData.cards[i].ph_color}" class="hm-card-img short-img ${phClass}" ${src}>`;
              if (cardsData.cards[i].placeholder!=0) {
                phClass='placeholder';
                imgObj='<div style="height: 300px; --ph_color: ${cardsData.cards[i].ph_color}" class="placeholder"></div>';
              }

              cardobj.className='hm-card';
              cardobj.style.background=`rgb(${cardsData.cards[i].bg_color})`;
              cardobj.setAttribute('onclick', `showList("${cardsData.cards[i].link_list}")`);
              cardobj.innerHTML=`
                ${imgObj}
                <h5 style="color: rgb(${cardsData.cards[i].text_color}); --ph_color: ${cardsData.cards[i].ph_color}" class="hm-card-smalltext ${phClass}">${cardsData.cards[i].subtitle}</h5>
                <h2 style="color: rgb(${cardsData.cards[i].text_color}); --ph_color: ${cardsData.cards[i].ph_color}" class="hm-card-title2 ${phClass}">${cardsData.cards[i].title}</h2>
              `;

            }

            document.getElementById('hm-'+locationPage).appendChild(cardobj);
            more_loading.style.display='flex';

           }
        }
      } else if (h_page==0) {
        popup('Ошибка при загрузке страницы', 'warning');
      } else {
        more_loading.style.display='none';
      }

      cardRequestStatus='done';
    } else if (cards=='null') {
    } else if (cards.status===0) {

      document.getElementById(`hm-${locationPage}`).innerHTML=`
        <div id="${locationPage}-loading">
          <div class="ab-loading-block">
            <i class="ph-cloud-slash" style="font-size: 48px; color: gray"></i>
            <h5 class="ui-gray">Нет соединения с сервером</h5>
          </div>
        </div>
      `;
      cards.abort();

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

var selHC='home';
function hmContent(page) {

  document.getElementById('more_cards_loading').style.display='none';
  h_page=0;
  let pages=['home', 'apps', 'games', 'search'];
  let icons=['house', 'squares-four', 'game-controller', 'magnifying-glass'];
  let icon;
  let top_navbar=localStorage.getItem('top_navbar')!='false';
  let top_nav = document.getElementById('ts-top_nav');
  let fake_search = document.getElementsByClassName('fake_search')[0];

  if (top_navbar) {
    top_nav.style.display='flex';
  }
  fake_search.style.display='flex';

  for (var i = 0; i < pages.length; i++) {

    if (pages[i] == page) { icon = icons[i] };

    document.getElementById(`hm-${pages[i]}`).style.display='none';

    if (page!='search') {

      if (i!=3) {

        document.getElementById(`top_nav_${pages[i]}`).className='';
        document.getElementById(`top_nav_${pages[i]}`).children[0].className='';
        document.getElementById(`top_nav_${pages[i]}`).children[0].className=`ph-${icons[i]}-light`;

      }

      document.getElementById(`nav-${pages[i]}`).className=``;
      document.getElementById(`nav-${pages[i]}`).classList=`ph-${icons[i]}-light ui-nav-icon ui-nav-icon-highlight`;

    }


  }

  if (page!='search') {
    loadCards(page);
  } else {
    setTimeout(function () {
      document.getElementById('hm-search-input').focus();
    }, 100);
    checkHistory();
    fake_search.style.display='none';
  }
  document.getElementById(`hm-${page}`).style.display='flex';
  document.getElementById(`nav-${page}`).classList=`ph-${icon}-fill ui-nav-icon ui-nav-icon-highlight`;
  document.getElementById(`top_nav_${page}`).className='active';
  document.getElementById(`top_nav_${page}`).children[0].className=`ph-${icon}-fill`;

  selHC=page;
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
document.getElementById('nav-bar').style.bottom="-70px";
document.getElementById('nav-home').className='';
document.getElementById('nav-search').className='';
document.getElementById('nav-apps').className='';
document.getElementById('nav-games').className='';
const api='https://tstore.space/api.php';
const api2_app=`https://api.tstore.space/app.php`;
const api2_search=`https://api.tstore.space/search.php`;
const api2_list=`https://api.tstore.space/list.php`;
const api2_cards=`https://api.tstore.space/cards.php`;
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

window.onscroll=function() {

  let current_scroll=window.pageYOffset + window.screen.height;
  if ((current_scroll >= document.body.scrollHeight)&&selHC!='search') {
    loadCards(selHC);
  }

}



document.getElementById('s-platform').innerText=localStorage.getItem('platform');
if ((localStorage.getItem('platform')=='Windows')||(localStorage.getItem('platform')=='Linux')) {
  document.getElementById('device-icon').src='img/icons/device-desktop.svg';
} else {
  document.getElementById('device-icon').src='img/icons/device-mobile.svg';
}
window.onpopstate=function(event) {
  checkUrlVars();
};

loadCards('home');

function checkHistory() {


  document.getElementById('search-main_content').style.display='block';
  document.getElementById('search_list').style.display='none';
  document.getElementById('search-process').style.display='none';
  document.getElementById('search-no_results').style.display='none';
  document.getElementById('search-best_result').style.display='none';
  let history=JSON.parse(localStorage.getItem('search-history'));
  let historyList=document.getElementById('search-history');
  historyList.innerHTML='';

  document.getElementById('hm-title_1').style.color='var(--text)';
  document.getElementById('hm-title_2_block').style.animationName='title-hide';
  setTimeout(function () {
    document.getElementById('hm-title_2_block').style.display='none';
    document.getElementById('hm-title_2_block').style.animationName='none';
  }, 300);

  if (history!=null) {
    document.getElementById('history_topblock').style.display='flex';
    for (var i = 0; i < history.length; i++) {
      let historyItem=document.createElement('div');
      historyItem.className='search-item';
      historyItem.setAttribute('onclick', `goSearch('${history[i]}')`);
      historyItem.innerHTML=`
      <i class="ph-magnifying-glass-bold"></i>
      <p class="search-item-text">${history[i]}</p>
      `;
      historyList.appendChild(historyItem);
    }
  } else {
    document.getElementById('history_topblock').style.display='none';
  }


  // TODO: window.history.pushState(null, '', `?block=search`);


}
function writeHistory(value) {


  value=value.trim();

  if (value!='') {

    let history=localStorage.getItem('search-history');

    if (history==null) { history=JSON.stringify([]); }

    history=JSON.parse(history);

    for (var i = 0; i < history.length; i++) {
      if (history[i]==value) {
        history.splice(i, 1);
      }
    }

    history.push(value);

    localStorage.setItem('search-history', JSON.stringify(history));

  }


}

function goSearch(historyValue) {
  document.getElementById('search_list').innerHTML='';
  document.getElementById('search-process').style.display='flex';
  document.getElementById('search-main_content').style.display='none';
  document.getElementById('search_list').style.display='flex';
  document.getElementById('search-no_results').style.display='none';
  document.getElementById('search-best_result').style.display='none';

  let searchValue=document.getElementById('hm-search-input').value;
  if (historyValue!=null) {
    searchValue=historyValue;
    document.getElementById('hm-search-input').value=searchValue;
  }

  document.getElementById('hm-title_2').innerText=searchValue;
  document.getElementById('hm-title_1').style.color='gray';
  document.getElementById('hm-title_2_block').style.animationName='title-show';
  document.getElementById('hm-title_2_block').style.display='flex';

  var searchPars=`action=d6Gj59&search=${searchValue}`;
  writeHistory(searchValue);

  // TODO: window.history.pushState(null, '', `?search=${searchValue}`);
  var search=new XMLHttpRequest();
  search.responseType='json';
  if (localStorage.getItem('ef-api2')=='true') {
    search.open('POST', api2_search, true);
    searchPars=`search=${searchValue}`;
  } else {
    search.open('POST', api, true);
  }

  search.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  search.addEventListener("readystatechange", () => {
    if ((search.readyState===4)&&(search.status===200)) {
      var listData=search.response;
      /*
      loadScrn.style.display='none';
      mainScrn.style.display='block';
      */
      if (listData.apps==undefined) {
        document.getElementById('search-no_results').style.display='flex';
        document.getElementById('search-process').style.display='none';
      } else if (listData.apps!=undefined) {
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
          let otherResults=`<h2 class="hm-title">Остальные результаты</h2>`;
          if (listData.apps.length==1) {
            otherResults='';
          }
          if (i==0) {

            let appbg=`https://tstore.space/${listData.apps[i].bg}`;

            if (listData.apps[i].bg == '') {
              appbg='https://tstore.space/images/headers/2.jpg';
            }

            document.getElementById('search-best_result').style.display='block';
            document.getElementById('search-best_result').innerHTML=`
              <h2 class="hm-title">Лучший результат</h2>
              <div class="hm-card hm-card-wide no-scale">
                <img onclick="showAB(${listData.apps[i].id})" class="hm-card-img" src='${appbg}'>
                <div class="flex-row">
                  <h5 class="hm-card-smalltext">${appdev}</h5>
                  <h5 class="hm-card-smalltext hm-card-smtxt-right">${listData.apps[i].agelimit}</h5>
                </div>
                <h2 class="hm-card-title">${listData.apps[i].name}</h2>
                <h4 class="hm-card-text">${listData.apps[i].sh_desc}</h4>
                <div class="flex-row">
                  <i class="hm-card-button ph-cloud-arrow-down-light z_wide_icon" onclick="download(${listData.apps[i].id})"></i>
                  <i class="hm-card-button ph-info-light z_wide_icon" onclick="showAB(${listData.apps[i].id})"></i>
                </div>
              </div>
              ${otherResults}
            `;

          } else {

            var listItem=document.createElement('div');
            listItem.className='app-item';
            listItem.innerHTML="<img class='ai-icon' onclick='showAB("+listData.apps[i].id+")' style='background: "+iconBg+"; padding: "+iconPadding+"; width: "+iconSize+"; height: "+iconSize+"' src='"+liIcon+"'> \
            <div class='ai-text'> <h5 onclick='showAB("+listData.apps[i].id+")' class='ai-name'>"+listData.apps[i].name+"</h5> <h5 onclick='showAB("+listData.apps[i].id+")' class='ai-dev'>"+appdev+"</h5> </div> \
            <i onclick='showAB("+listData.apps[i].id+")' class='ph-info ai-info'></i> <i onclick='download("+listData.apps[i].id+"); popup(`Скачивание началось`, `cloud-arrow-down`)' class='ph-cloud-arrow-down ai-down'></i>"
            document.getElementById('search_list').appendChild(listItem);

          }

          document.getElementById('search-process').style.display='none';

        }
      } else {
        document.getElementById('search-process').style.display='none';
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
function removeHistoryItem(i) {
  setTimeout(function () {
    let historyItem=document.getElementById('search-history').children;
    historyItem[i].remove();
  }, 500);
}
