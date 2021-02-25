function showList() {
  toggleList();

  loadScrn.style.display='none';
  mainScrn.style.display='block';
}
let currentListScreen;
var list=document.getElementById('list');
var loadScrn=document.getElementById('list-loading');
var mainScrn=document.getElementById('list-main');
function toggleList() {
  let listBg=document.getElementById('list-block-bg');
  currentListScreen='index';
  if (list.style.display=='block') {
    loadScrn.style.display='none';
    mainScrn.style.display='block';
    setTimeout(function () {
      list.style.display="none";
      listBg.style.display="none";

      list.style.transform='scale(1)';
      list.style.opacity='1';
      listBg.style.opacity='1';
    }, 150);
    if (platform=='mobile') {
      list.style.transform='translateY(64px)';
    } else if (platform=='pc') {
      list.style.transform='scale(1.08)';
    }
    list.style.opacity='.4';
    listBg.style.opacity='.1';
    body.style.overflow='auto';
    toggleScrolling('add');
  } else {
    loadScrn.style.display='flex';
    mainScrn.style.display='none';
    toggleScrolling('remove');
    listBg.style.display='block';
    list.style.display='block';
    body.style.overflow='none';
  }
}

function scrollableList() {
  let listPositions;
  let previousTopList=list.style.top;
  mainScrn.onscroll=function(){
    listPositions=mainScrn.scrollTop;
    if (listPositions > 60) {
      listPositions=60;
      list.style.borderRadius='0';
      mainScrn.style.borderRadius='0';
    } else {
      list.style.borderTopLeftRadius='16px';
      list.style.borderTopRightRadius='16px';
      mainScrn.style.borderTopLeftRadius='16px';
      mainScrn.style.borderTopRightRadius='16px';
    }
    let newTopList=60 - listPositions;
    list.style.height='calc(100% - '+newTopList+'px)';
  };
}
