function homeCard(cardId, name, appId, background, background2) {
  document.getElementById(cardId+'-name').innerHTML=name;
  if (background==0) {
    background=background2;
  }
  if ((background2==0)&&(background==0)) {
    let random = Math.floor(Math.random() * 10) + 1;
    document.getElementById(cardId).style.backgroundImage='var(--topCard-gradient), url(https://thetenstore.ru/images/headers/'+random+'.jpg)';
  } else if (background!=0) {
    document.getElementById(cardId).style.backgroundImage='var(--topCard-gradient), url(https://thetenstore.ru/'+background+')';
  }
  document.getElementById(cardId).style.backgroundRepeat='no-repeat';
  document.getElementById(cardId).style.backgroundPosition='center';
  document.getElementById(cardId).setAttribute('onclick',"window.open('app?id="+appId+"', '_self')");
}

const ec_app_request=new XMLHttpRequest();
const url='https://thetenstore.ru/api.php';
const ec_app_params='action=KdSqSAOC&select=editors-choice&value=app';
ec_app_request.responseType='json';
ec_app_request.open('POST', url, true);
ec_app_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
ec_app_request.addEventListener("readystatechange", () => {
  if ((ec_app_request.readyState === 4) && (ec_app_request.status === 200)) {
    var ec_app_response=ec_app_request.response;
    for(let i=0; i<ec_app_response.apps.length; i++) {
      homeCard('ec-app', ec_app_response.apps[0].name, ec_app_response.apps[0].id, ec_app_response.apps[0].card_bg, ec_app_response.apps[0].bg);
    }
  }
});
ec_app_request.send(ec_app_params);

const ec_game_request=new XMLHttpRequest();
const ec_game_params='action=KdSqSAOC&select=editors-choice&value=game';
ec_game_request.responseType='json';
ec_game_request.open('POST', url, true);
ec_game_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
ec_game_request.addEventListener("readystatechange", () => {
  if ((ec_game_request.readyState === 4) && (ec_game_request.status === 200)) {
    var ec_game_response=ec_game_request.response;
    for(let i=0; i<ec_game_response.apps.length; i++) {
      homeCard('ec-game', ec_game_response.apps[0].name, ec_game_response.apps[0].id, ec_game_response.apps[0].card_bg, ec_game_response.apps[0].bg);
    }
  }
});
ec_game_request.send(ec_game_params);


const rnd_game_request=new XMLHttpRequest();
const rnd_game_params='action=KdSqSAOC&select=random&value=game';
rnd_game_request.responseType='json';
rnd_game_request.open('POST', url, true);
rnd_game_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
rnd_game_request.addEventListener("readystatechange", () => {
  if ((rnd_game_request.readyState === 4) && (rnd_game_request.status === 200)) {
    var rnd_game_response=rnd_game_request.response;
    for(let i=0; i<rnd_game_response.apps.length; i++) {
      homeCard('random-game', rnd_game_response.apps[0].name, rnd_game_response.apps[0].id, rnd_game_response.apps[0].card_bg, rnd_game_response.apps[0].bg);
    }
  }
});
rnd_game_request.send(rnd_game_params);

function popupNext(windowName) {
  document.getElementById('window1').style.display='none';
  document.getElementById('window2').style.display='none';
  document.getElementById('window3').style.display='none';
  document.getElementById('window4').style.display='none';
  document.getElementById('window5').style.display='none';
  document.getElementById('window6').style.display='none';
  document.getElementById('window7').style.display='none';

  document.getElementById(windowName).style.display='block';
}
function closePopup(isWatched) {
  if (isWatched=='true') {
    localStorage.setItem('version-2.2-popup', 'watched');
  }
  document.getElementById('tenstore-2.2').style.display='none';
  document.getElementById('phoneNav').style.display='flex';
}

if ((localStorage.getItem('version-2.2-popup')!='watched')||(localStorage.getItem('debug-popups')=='true')) {
  document.getElementById('tenstore-2.2').style.display='flex';
  document.getElementById('mobileSearch').style.display='none';
  document.getElementById('phoneNav').style.display='none';
} else {
  document.getElementById('tenstore-2.2').style.display='none';
}
