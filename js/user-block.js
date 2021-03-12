var ubObj=document.getElementById('user-block');
var setBgObj=document.getElementById('set-block-bg');
var setObj=document.getElementById('settings-block');

function toggleUB(dontPushHistory) {

  let ubBgObj=document.getElementById('user-block-bg');
  let hideubObj=document.getElementById('hide-ub');

  if (ubBgObj.style.display=='block') {
    setTimeout(function () {
      ubObj.style.display="none";
      ubBgObj.style.display="none";
      ubObj.style.transform='scale(1)';
      ubObj.style.opacity='1';
      ubBgObj.style.opacity='1';
    }, 150);
    toggleScrolling('add');
    if (platform=='mobile') {
      ubObj.style.transform='translateY(64px)';
    } else if (platform=='pc') {
      ubObj.style.transform='scale(1.08)';
    }
    ubObj.style.opacity='.4';
    ubBgObj.style.opacity='.1';
    window.history.pushState(null, 'TenStore', '?');
  } else {
    ubWindow('main');
    toggleScrolling('remove');
    ubBgObj.style.display='block';
    ubObj.style.display='block';
    if (dontPushHistory!=true) {
      window.history.pushState(null, 'TENSTORE', '?block=user');
    }
  }

}


function scrollableUB() {
  let ubpositions;
  let previousTopub=ubObj.style.top;
  let ubIndex=document.getElementById('ub-main');
  ubIndex.onscroll=function(){
    ubpositions=ubIndex.scrollTop;
    if (ubpositions > 60) {
      ubpositions=60;
      ubObj.style.borderRadius='0';
      ubIndex.style.borderRadius='0';
    } else {
      ubObj.style.borderTopLeftRadius='16px';
      ubObj.style.borderTopRightRadius='16px';
      ubIndex.style.borderTopLeftRadius='16px';
      ubIndex.style.borderTopRightRadius='16px';
    }
    let ubnewTop=60 - ubpositions;
    ubObj.style.height='calc(100% - '+ubnewTop+'px)';
  };
}

function ubWindow(windowName) {
  if ((windowName=='logout-confirm')&&(localStorage.getItem('login')==null)) {
    window.open('login', '_self');
  } else {
    document.getElementById('ub-main').style.display='none';
    document.getElementById('ub-logout-confirm').style.display='none';
    document.getElementById('ub-'+windowName).style.display='block';
  }
}



function toggleSettings(dontPushHistory) {

  if (setBgObj.style.display=='block') {
    setTimeout(function () {
      setObj.style.display="none";
      setBgObj.style.display="none";
      setObj.style.transform='scale(1)';
      setObj.style.opacity='1';
      setBgObj.style.opacity='1';
    }, 150);
    toggleScrolling('add');
    if (platform=='mobile') {
      setObj.style.transform='translateY(64px)';
    } else if (platform=='pc') {
      setObj.style.transform='scale(1.08)';
    }
    setObj.style.opacity='.4';
    setBgObj.style.opacity='.1';
    window.history.pushState(null, 'TenStore', '?');
  } else {
    ubWindow('main');
    toggleScrolling('remove');
    setBgObj.style.display='block';
    setObj.style.display='block';
    if (dontPushHistory!=true) {
      window.history.pushState(null, 'TENSTORE', '?block=settings');
    }
  }

}
function scrollableSets() {
  let setpositions;
  let previousTopset=setObj.style.top;
  let setIndex=document.getElementById('set-main');
  setIndex.onscroll=function(){
    setpositions=setIndex.scrollTop;
    if (setpositions > 60) {
      setpositions=60;
      setObj.style.borderRadius='0';
      setIndex.style.borderRadius='0';
    } else {
      setObj.style.borderTopLeftRadius='16px';
      setObj.style.borderTopRightRadius='16px';
      setIndex.style.borderTopLeftRadius='16px';
      setIndex.style.borderTopRightRadius='16px';
    }
    let setnewTop=60 - setpositions;
    setObj.style.height='calc(100% - '+setnewTop+'px)';
  };
}



function toggleScrolling(state) {
  if (state=='remove') {
    body.classList.add('no-scrolling');
  } else {
    body.classList.remove('no-scrolling');
  }
}
