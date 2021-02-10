function toggleUB() {
  let ubBgObj=document.getElementById('user-block-bg');
  let hideubObj=document.getElementById('hide-ub');
  let ubObj=document.getElementById('user-block');
  if (ubBgObj.style.display=='block') {
    setTimeout(function () {
      ubObj.style.display="none";
      hideubObj.style.display="none";
      ubBgObj.style.display="none";
      ubObj.style.transform='scale(1)';
      ubObj.style.opacity='1';
      ubBgObj.style.opacity='1';
    }, 200);
    ubObj.style.transform='scale(1.08)';
    ubObj.style.opacity='.4';
    ubBgObj.style.opacity='.1';
  } else {
    ubBgObj.style.display='block';
    hideubObj.style.display='block';
    ubObj.style.display='block';
  }
}
