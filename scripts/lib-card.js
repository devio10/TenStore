function showLibCard(app_icon, app_icon_pad, app_icon_bg, app_id, app_name, app_dev) {
  let icon_bg;
  app_icon='https://tstore.space/'+app_icon;
  let icon_size='45px';
  if ((app_icon_bg==0)||(app_icon_bg=='white')||(app_icon_bg=='#ffffff')||(app_icon_bg=='#fff')||(app_icon_bg=='#FFFFFF')){
    icon_bg='var(--bg)';
  } else {
    icon_bg=app_icon_bg;
  }
  let icon_pad=app_icon_pad;
  if ((app_icon_pad==15)||(app_icon_pad=='true')) {
    icon_size='39px';
    icon_pad='3px';
  }

  var lCard=document.createElement('div');
  lCard.className='lib-card';
  lCard.innerHTML="<img style='width: "+icon_size+"; height: "+icon_size+"; background: "+app_icon_bg+"; padding: "+icon_pad+"' src='"+app_icon+"' class='lib-card-icon'> \
  <div class='flex flex-column'> \
    <h5 class='lib-card-name'>"+app_name+"</h5> \
    <h5 class='lib-card-dev'>"+app_dev+"</h5> \
  </div> \
  <a href='app?id="+app_id+"'><i class='ph-share lib-card-open-icon'></i></a>";
  document.getElementById('lib-cards').appendChild(lCard);
}
