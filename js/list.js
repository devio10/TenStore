function showList(par1, par2, donotToggle, par3, background, font, nameColor, subColor, nameSize) {
  if (par1!='search') {
    window.history.pushState(null, 'Список', '?list=true&par1='+par1+'&par2='+par2+'&donotToggle='+donotToggle+'&par3='+par3+'&background='+background+'&font='+font+'&nameColor='+nameColor+'&subColor='+subColor+'&nameSize='+nameSize);
  } else {
    window.history.pushState(null, 'Поиск', '?search='+par2);
  }
  if (donotToggle!=true) {
    toggleList();
  } else {
    loadScrn.style.display='flex';
    mainScrn.style.display='none';
  }
  if (localStorage.getItem('debug')=='true') {
    loadScrn.style.display='none';
    mainScrn.style.display='block';
  }
  let listName=document.getElementById('list-name');
  let listHeader=document.getElementById('list-header');

  document.getElementById('list-block').innerHTML='';
  document.getElementById('list-subtext').innerText=par3;
  listHeader.style.background='';
  listHeader.style.display='none';
  listName.style.marginTop='8px';
  listName.style.fontSize='1.5em';
  listName.style.color='var(--text)';
  listName.style.fontFamily='Roboto';
  document.getElementById('list-subtext').style.color='gray';

  if ((background==null)||(background==0)) {
    listName.style.marginTop='60px';
  } else {
    listHeader.style.display='block';
    listHeader.style.background='url(https://thetenstore.ru/'+background+')';
    listHeader.style.backgroundPosition='center';
    listHeader.style.backgroundRepeat='no-repeat';
    listHeader.style.backgroundSize='cover';
  }
  if ((font!=null)||(font!=0)||(font!=undefined)) { listName.style.fontFamily=font; }
  if ((nameColor!=null)||(nameColor!=0)) { listName.style.color=nameColor; }
  if ((nameSize!=null)||(nameSize!=0)) { listName.style.fontSize=nameSize; }
  if ((subColor!=null)||(subColor!=0)) { document.getElementById('list-subtext').style.color=subColor; }
  if (par1=='search') {
    listName.style.fontFamily='Roboto';
  }
  var appsList=new XMLHttpRequest();
  var listId;
  if (par1!='search') {
    listId='action=KdSqSAOC&select='+par1+'&value='+par2;
    document.getElementById('list-name').innerText=par2;
  } else {
    listId='action=d6Gj59&search='+par2;
    document.getElementById('list-name').innerText='Поиск';
    document.getElementById('list-subtext').innerText='по запросу "'+par2+'"';
  }
  appsList.responseType='json';
  appsList.open('POST', api, true);
  appsList.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  appsList.addEventListener("readystatechange", () => {
    if ((appsList.readyState===4)&&(appsList.status===200)) {
      var listData=appsList.response;
      loadScrn.style.display='none';
      mainScrn.style.display='block';
      for (let i=0; i<listData.apps.length; i++) {
        let iconPadding='0';
        let iconBg='white';
        let iconSize='40px';
        let liIcon='https://thetenstore.ru/'+listData.apps[i].icon;
        if (listData.apps[i].icon_bg!=0) {
          iconBg=listData.apps[i].icon_bg;
        }
        if (listData.apps[i].icon_pad!=0) {
          iconPadding='5px';
          iconSize='30px';
        }
        var listItem=document.createElement('div');
        listItem.className='app-item';
        listItem.innerHTML="<img class='ai-icon' onclick='toggleList(); showAB("+listData.apps[i].id+")' style='background: "+iconBg+"; padding: "+iconPadding+"; width: "+iconSize+"; height: "+iconSize+"' src='"+liIcon+"'> \
        <div class='ai-text'> <h5 onclick='showAB("+listData.apps[i].id+"); toggleList()' class='ai-name'>"+listData.apps[i].name+"</h5> <h5 onclick='showAB("+listData.apps[i].id+"); toggleList()' class='ai-dev'>"+listData.apps[i].dev+"</h5> </div> \
        <i onclick='showAB("+listData.apps[i].id+"); toggleList()' class='ph-info ai-info'></i> <i onclick='download("+listData.apps[i].id+")' class='ph-cloud-arrow-down ai-down'></i>"
        document.getElementById('list-block').appendChild(listItem);
      }
    }
  });
  appsList.send(listId);
}
let currentListScreen;
var list=document.getElementById('list');
var loadScrn=document.getElementById('list-loading');
var mainScrn=document.getElementById('list-main');
function toggleList(isSearch) {
  document.getElementById('search-block').style.display='none';
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
    window.history.pushState(null, null, '?');
  } else {
    loadScrn.style.display='flex';
    mainScrn.style.display='none';
    toggleScrolling('remove');
    listBg.style.display='block';
    list.style.display='block';
    body.style.overflow='none';
  }
  if (isSearch==true) {
    loadScrn.style.display='none';
    mainScrn.style.display='block';
    document.getElementById('list-subtext').innerText='';
    document.getElementById('list-name').innerText='';
    document.getElementById('search-block').style.display='block';
    document.getElementById('list-header').style.display='none';
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

document.getElementById('list-search').addEventListener("keyup", function(event) {
  if (event.keyCode===13) {
    showList('search', document.getElementById('list-search').value, true);
  }
});
