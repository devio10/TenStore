const random_game_request=new XMLHttpRequest();
const url='https://thetenstore.ru/api.php';
let random_game_id=Math.floor(Math.random() * 50) + 1;
const random_game_params='action=4LlFCT&id='+random_game_id;
random_game_request.responseType='json';
random_game_request.open('POST', url, true);
random_game_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
random_game_request.addEventListener("readystatechange", () => {
  if ((random_game_request.readyState === 4) && (random_game_request.status === 200)) {
    var random_game_response=random_game_request.response;
    for(let i=0; i<random_game_response.apps.length; i++) {
      if (random_game_response.apps[0].type!='game') {
        console.log('расходимся, ребята, это не игра');
      }
      document.getElementById('random-game-name').innerHTML=random_game_response.apps[0].name;
      document.getElementById('random-game-icon').src='https://thetenstore.ru/'+random_game_response.apps[0].icon;
      /*димочка сделай здесь padding и фон иконки пж спасибо*/
      document.getElementById('random-game').style.backgroundImage='var(--topCard-gradient), url(https://thetenstore.ru/'+random_game_response.apps[0].bg+')';
      document.getElementById('random-game').style.backgroundRepeat='no-repeat';
      document.getElementById('random-game').style.backgroundPosition='center';
      document.getElementById('random-game').onclick="window.open('https://thetenstore.ru/app?id="+random_game_response.apps[0].id+"', '_self')"
    }
  }
});
random_game_request.send(random_game_params);
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
