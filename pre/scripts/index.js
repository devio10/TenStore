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
      document.getElementById('ec-app-name').innerHTML=ec_app_response.apps[0].name;

      if (ec_app_response.apps[0].bg != 0) {
        document.getElementById('ec-app').style.backgroundImage='var(--topCard-gradient), url(https://thetenstore.ru/'+ec_app_response.apps[0].bg+')';
      } else {
        let random = Math.floor(Math.random() * 10) + 1;
        document.getElementById('ec-app').style.backgroundImage='var(--topCard-gradient), url(https://thetenstore.ru/images/headers/'+random+'.jpg)';
      }
      document.getElementById('ec-app').style.backgroundRepeat='no-repeat';
      document.getElementById('ec-app').style.backgroundPosition='center';
      document.getElementById('ec-app').setAttribute('onclick',"window.open('app?id="+ec_app_response.apps[0].id+"', '_self')");
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
      document.getElementById('ec-game-name').innerHTML=ec_game_response.apps[0].name;

      if (ec_game_response.apps[0].bg != 0) {
        document.getElementById('ec-game').style.backgroundImage='var(--topCard-gradient), url(https://thetenstore.ru/'+ec_game_response.apps[0].bg+')';
      } else {
        let random = Math.floor(Math.random() * 10) + 1;
        document.getElementById('ec-game').style.backgroundImage='var(--topCard-gradient), url(https://thetenstore.ru/images/headers/'+random+'.jpg)';
      }
      document.getElementById('ec-game').style.backgroundRepeat='no-repeat';
      document.getElementById('ec-game').style.backgroundPosition='center';
      document.getElementById('ec-game').setAttribute('onclick',"window.open('app?id="+ec_game_response.apps[0].id+"', '_self')");
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
      document.getElementById('random-game-name').innerHTML=rnd_game_response.apps[0].name;

      if (rnd_game_response.apps[0].bg != 0) {
        document.getElementById('random-game').style.backgroundImage='var(--topCard-gradient), url(https://thetenstore.ru/'+rnd_game_response.apps[0].bg+')';
      } else {
        let random = Math.floor(Math.random() * 10) + 1;
        document.getElementById('random-game').style.backgroundImage='var(--topCard-gradient), url(https://thetenstore.ru/images/headers/'+random+'.jpg)';
      }
      document.getElementById('random-game').style.backgroundRepeat='no-repeat';
      document.getElementById('random-game').style.backgroundPosition='center';
      document.getElementById('random-game').setAttribute('onclick',"window.open('app?id="+rnd_game_response.apps[0].id+"', '_self')");
    }
  }
});
rnd_game_request.send(rnd_game_params);

function popupNext(windowName) {
  document.getElementById('window1').style.display='none';
  document.getElementById('window2').style.display='none';
  document.getElementById('window3').style.display='none';

  document.getElementById(windowName).style.display='block';
}
if (localStorage.getItem('debug-newVersionPopup')=='true') {
  document.getElementById('tenstore-2.0').style.display='flex';
  document.getElementById('mobileSearch').style.display='none';
  document.getElementById('phoneNav').style.display='none';
} else {
  document.getElementById('tenstore-2.0').style.display='none';
}
