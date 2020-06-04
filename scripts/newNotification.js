function newNotification (title, text) {
  let notBlock = document.createElement('div');
  notBlock.className = 'notification';
  notBlock.innerHTML = "<span class='closeNotification';`>&times;</span> \
   <h5 style='margin: 15px 15px 15px 15px'>" + title + "</h5> \
   <h5 style='margin: -5px 15px 15px 15px'>"  + text + "</h5>";
   let place = document.getElementById ('notPlace');
   document.body.appendChild(notBlock);
}
