function toggleUB() {
  let ubBgObj=document.getElementById('user-block-bg');
  let hideubObj=document.getElementById('hide-ub');
  let ubObj=document.getElementById('user-block');
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
  } else {
    ubWindow('main');
    toggleScrolling('remove');
    ubBgObj.style.display='block';
    ubObj.style.display='block';

  }
}

function toggleScrolling(state) {
  if (state=='remove') {
    body.classList.add('no-scrolling');
  } else {
    body.classList.remove('no-scrolling');
  }
}

function ubWindow(windowName) {
  if ((windowName=='logout-confirm')&&(localStorage.getItem('login')==null)) {
    window.open('login', '_self');
  } else {
    document.getElementById('ub-settings').style.display='none';
    document.getElementById('ub-main').style.display='none';
    document.getElementById('ub-logout-confirm').style.display='none';
    document.getElementById('ub-'+windowName).style.display='block';
  }
}
