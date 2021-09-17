var platform='pc';
function checkPlatform (page) {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    var link=document.createElement('link');
    link.rel='stylesheet';
    link.type='text/css';
    link.href='css/phones.css';
    head.appendChild(link);
    platform='mobile';
    if (page==null) {
      scrollableBlocks();
      scrollableList();
      scrollableSets();
    }
    link=null;
  }
}
