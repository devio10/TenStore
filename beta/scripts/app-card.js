function showAppCard(block, app_icon, app_icon_pad, app_icon_bg, app_id, app_name, app_dev) {
  let icon_bg;
  let icon_size='150px';
  if (app_icon_bg==0) {
    icon_bg='var(--bg)';
  } else {
    icon_bg=app_icon_bg;
  }
  if ((app_icon_pad==15)||(app_icon_pad=='true')) {
    icon_size='120px';
  }
  var aCard=document.createElement('div');
  aCard.className='aCard';
  aCard.innerHTML = "<a href='app?&id="+app_id+"'> \
    <img class='aCard-icon' style='width: "+icon_size+"; height: "+icon_size+"; background: "+icon_bg+"; padding: "+app_icon_pad+"px' src='https://thetenstore.ru/"+app_icon+"'> \
    <h4 class='aCard-name'>"+app_name+"</h4> \
    <h4 class='aCard-dev'>"+app_dev+"</h4> \
  </a>"
  document.getElementById(block).appendChild(aCard);
}
