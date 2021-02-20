let currentAppScreen;
var ab=document.getElementById('app-block');
function toggleAB () {
 let abBg=document.getElementById('app-block-bg');
 currentAppScreen='index';
 if (ab.style.display=='block') {
   setTimeout(function () {
     ab.style.display="none";
     abBg.style.display="none";

     ab.style.transform='scale(1)';
     ab.style.opacity='1';
     abBg.style.opacity='1';
   }, 150);
   if (platform=='mobile') {
     ab.style.transform='translateY(64px)';
   } else if (platform=='pc') {
     ab.style.transform='scale(1.08)';
   }
   ab.style.opacity='.4';
   abBg.style.opacity='.1';
   body.style.overflow='auto';
   toggleScrolling('add');
 } else {
   toggleScrolling('remove');
   abBg.style.display='block';
   ab.style.display='block';
   body.style.overflow='none';
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

function scrollableBlocks() {
  let positions;
  let previousTop=ab.style.top;
  let abIndex=document.getElementById('ab-index');
  abIndex.onscroll=function(){
    positions=abIndex.scrollTop;
    if (positions > 60) {
      positions=60;
    }
    let newTop=60 - positions;
    ab.style.height='calc(100% - '+newTop+'px)';
  };
}
