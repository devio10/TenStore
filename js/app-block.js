let currentAppScreen;
function toggleAB () {
 let abBg=document.getElementById('app-block-bg');
 let ab=document.getElementById('app-block');
 currentAppScreen='index';
 if (ab.style.display=='block') {
   setTimeout(function () {
     ab.style.display="none";
     abBg.style.display="none";

     ab.style.transform='scale(1)';
     ab.style.opacity='1';
     abBg.style.opacity='1';
   }, 200);
   ab.style.transform='scale(1.08)';
   ab.style.opacity='.4';
   abBg.style.opacity='.1';
 } else {
   abBg.style.display='block';
   ab.style.display='block';
 }
}
function showAB(appid) {
  toggleAB();
  //заглушка
}

function abBack () {
  if ((currentAppScreen==null)||(currentAppScreen=='index')) {
    toggleAB();
  } else {

  }
}
