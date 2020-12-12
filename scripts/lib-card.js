function showAppCard(block, app_icon, app_icon_pad, app_icon_bg, app_id, app_name, app_dev) {
  let icon_bg;
  let aCard_width='var(--aCard-width)';
  let icon_border='';
  let icon_size='var(--aCard-icon)';
  if ((app_icon_bg==0)||(app_icon_bg=='white')||(app_icon_bg=='#ffffff')||(app_icon_bg=='#fff')||(app_icon_bg=='#FFFFFF')){
    icon_bg='var(--bg)';
    icon_border='; border: 1px solid var(--aCard-border); border-bottom: 0';
    aCard_width='var(--aCard-width2)';
  } else {
    icon_bg=app_icon_bg;
  }
  let icon_pad=app_icon_pad;
  if ((app_icon_pad==15)||(app_icon_pad=='true')) {
    icon_size='var(--aCard-icon2)';
    icon_pad='var(--aCard-icon-padding)';
  }

  var aCard=document.createElement('div');
  aCard.className='lib-card';
  aCard.style.width=aCard_width;
  aCard.innerHTML="<a href='app?&id="+app_id+"'> \
    <img loading='lazy' class='aCard-icon' style='width: "+icon_size+"; background: "+icon_bg+"; padding: "+icon_pad+""+icon_border+"' src='https://thetenstore.ru/"+app_icon+"'> \
    <h4 class='aCard-name'>"+app_name+"</h4> \
    <h4 class='aCard-dev'>"+app_dev+"</h4> \
  </a>"
  document.getElementById(block).appendChild(aCard);
}

var lcHead=document.getElementsByTagName('HEAD')[0];
var lcLink=document.createElement('link');
lcLink.rel='stylesheet';
lcLink.type='text/css';
lcLink.href='styles/lib-card.css';
lcHead.appendChild(lcLink);
