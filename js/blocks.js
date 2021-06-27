/* БЛОК ПРИЛОЖЕНИЯ */
let currentAppScreen;
var ab=document.getElementById('app-block');
var loadScreen=document.getElementById('ab-loading');
var shortDescription;
var longDescription;
var indexScreen=document.getElementById('ab-index');
var lastscr=0;
var curscr=0;
var nextscr=1;
var showFull='<a onclick="toggleDescription()"> Показать полностью...</a>';
var hideFull='<a onclick="toggleDescription()"> Скрыть</a>';
var curDescType='short';
var selectedPlatform=localStorage.getItem('platform');
let selectedFile;
function toggleAB () {
 let abBg=document.getElementById('app-block-bg');
 currentAppScreen='index';
 if (ab.style.display=='block') {
   loadScreen.style.display='none';
   indexScreen.style.display='block';
   setTimeout(function () {
     ab.style.display="none";
     abBg.style.display="none";
     ab.className='';
     ab.style.opacity='1';
     abBg.style.opacity='1';
   }, 150);
   if (platform=='mobile') {
     ab.className='scale-phone-anim';
   } else if (platform=='pc') {
     ab.className='scale-pc-anim';
   }
   ab.style.opacity='.4';
   abBg.style.opacity='.1';
   body.style.overflow='auto';
   toggleScrolling('add');
   window.history.pushState(null, null, '?');
 } else {
   loadScreen.style.display='flex';
   indexScreen.style.display='none';
   toggleScrolling('remove');
   abBg.style.display='block';
   ab.style.display='block';
   body.style.overflow='none';
 }
}
function showAB(appid, dontPushHistory) {
  selectedPlatform=localStorage.getItem('platform');
  if (dontPushHistory!=true) { window.history.pushState(null, null, '?id='+appid); }
  toggleAB();
  if (localStorage.getItem('debug')=='true') {
    loadScreen.style.display='none';
    indexScreen.style.display='block';
    let abHeader=document.getElementById('ab-header');
    abHeader.style.background="url(https://tstore.space/images/headers/10.jpg)";
    abHeader.style.backgroundPosition='center';
    abHeader.style.backgroundRepeat='no-repeat';
    abHeader.style.backgroundSize='cover';
    abHeader.style.display='block';
    document.getElementById('topcontent').style.marginTop='0';
  }
  document.getElementById('ab-platform-select').style.display='none';
  var appBlock=new XMLHttpRequest();
  var appId='action=4LlFCT&id='+appid;
  appBlock.responseType = "json";
  appBlock.open("POST", api, true);
  appBlock.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  appBlock.addEventListener("readystatechange", () => {
    if ((appBlock.readyState===4)&&(appBlock.status===200)) {
      var appData=appBlock.response;
      if (appData!=0) {
        let abIcon=document.getElementById('ab-icon');
        abIcon.src='https://tstore.space/'+appData.apps[0].icon;
        if (appData.apps[0].icon_pad!=0) {
          abIcon.style.width='80px';
          abIcon.style.height='80px';
          abIcon.style.padding='10px';
        } else {
          abIcon.style.width='100px';
          abIcon.style.height='100px';
          abIcon.style.padding='0';
        }
        let abIconBg;
        if (appData.apps[0].icon_bg==0) {
          abIconBg='white';
        } else {
          abIconBg=appData.apps[0].icon_bg;
        }
        abIcon.style.background=abIconBg;
        shortDescription=appData.apps[0].descr.split('<p>');
        longDescription=appData.apps[0].descr;
        if (shortDescription[0]==longDescription) {
          document.getElementById('ab-desc').innerHTML=shortDescription[0];
        } else {
          document.getElementById('ab-desc').innerHTML=shortDescription[0]+showFull;
        }
        document.getElementById('ab-name').innerText=appData.apps[0].name;
        document.getElementById('ab-short-desc').innerText=appData.apps[0].dev; // TODO: добавить сюда краткое описание
        let abHeader=document.getElementById('ab-header');
        if (appData.apps[0].bg!=0) {
          abHeader.style.background="url(https://tstore.space/"+appData.apps[0].bg+")";
          abHeader.style.backgroundPosition='center';
          abHeader.style.backgroundRepeat='no-repeat';
          abHeader.style.backgroundSize='cover';
          abHeader.style.display='block';
          document.getElementById('topcontent').style.marginTop='0';
        } else {
          abHeader.style.display='none';
          document.getElementById('topcontent').style.marginTop='40px';
        }
        document.getElementById('ab-scrs').innerHTML='';
        document.getElementById('scrs-pag').innerHTML='';
        document.getElementById('scrs-block').style.display='none';
        document.getElementById('nav-prev').disabled=false;
        document.getElementById('nav-next').disabled=false;
        curscr=0;
        let scrsData=appData.apps[0].screenshots;
        if ((scrsData!='[]')||(scrsData!='')) {
          var screenshots=JSON.parse(scrsData);
          for(let s in screenshots.scr) {
            lastscr=s;
            var screenshot=document.createElement('img');
            var scrDot=document.createElement('div');
            if (s==0) {
              scrDot.className='scr-dot scr-dot-active';
            } else {
              scrDot.className='scr-dot';
            }
            scrDot.setAttribute('onclick', 'switchScreenshot('+s+')');
            scrDot.id='dot-'+s;
            screenshot.className='ab-scr';
            screenshot.id='scr-'+s;
            screenshot.setAttribute('onclick',"window.open('https://tstore.space/"+screenshots.scr[s].image+"', '_self')");
            screenshot.src='https://tstore.space/'+screenshots.scr[s].image;
            document.getElementById('ab-scrs').appendChild(screenshot);
            document.getElementById('scrs-pag').appendChild(scrDot);
            document.getElementById('scrs-block').style.display='block';
          }
        }
        document.getElementById('ab-reviews').innerHTML='';
        let revJson=appData.apps[0].comments;
        if (revJson!=0) {
        const revs=JSON.parse(revJson);
          for(let c in revs.comments) {
            var reviewObj=document.createElement('div');
            if (revs.comments[c].isLiked=='1') {
              reviewObj.className='ab-review rev-pos';
            } else {
              reviewObj.className='ab-review rev-neg';
            }
            reviewObj.innerHTML="<h3 class='rev-title'>"+revs.comments[c].title+"</h3> \
            <h5 class='rev-text'>"+revs.comments[c].comment+"</h5> \
            <h5 class='rev-author'>от пользователя "+revs.comments[c].login+"</h5>";
            document.getElementById('ab-reviews').appendChild(reviewObj);
            document.getElementById('ab-no-reviews').style.display='none';
          }
        }
        document.getElementById('ab-platforms').innerHTML='';
        if ((appData.apps[0].files!='')||(appData.apps[0].files!='[]')) {
          let psJson=JSON.parse(appData.apps[0].files);
          for (var i = 0; i < psJson.files.length; i++) {
            let psItem=document.createElement('div');
            let psBlock;
            if (psJson.files[i].platform==selectedPlatform) {
              psItem.className='platform-check selected';
              selectedFile=psJson.files[i].file;
              if (psJson.files[i].architecture!='') {
                document.getElementById('ab-platform').innerText=psJson.files[i].platform+' ('+psJson.files[i].architecture+')';
              } else {
                document.getElementById('ab-platform').innerText=psJson.files[i].platform;
              }
              document.getElementById('si-size').innerText=psJson.files[i].size+' МБ';
            } else {
              psItem.className='platform-check';
            }
            if (psJson.files[i].architecture!='') {
              psItem.innerText=psJson.files[i].platform+' ('+psJson.files[i].architecture+')';
            } else {
              psItem.innerText=psJson.files[i].platform;
            }
            psItem.setAttribute('onclick','selectPlatform("'+psJson.files[i].platform+'", "'+psJson.files[i].file+'", "'+psJson.files[i].architecture+'", "'+psJson.files[i].size+'")');
            psItem.id='ps-'+psJson.files[i].platform+'-'+psJson.files[i].architecture;
            document.getElementById('ab-platforms').appendChild(psItem);
          }
          if (psJson.files.length > 0) {
            document.getElementById('ab-platform-select').style.display='block';
          }
        } else {
          document.getElementById('ab-download').disabled=true;
          document.getElementById('ab-platform-select').style.display='none';
          document.getElementById('ab-platform').style.display='none';
        }
        document.getElementById('si-pos').innerText=appData.apps[0].liked;
        document.getElementById('si-neg').innerText=appData.apps[0].disliked;
        document.getElementById('si-rating').innerText=appData.apps[0].agelimit;
        document.getElementById('si-dev-name').innerText=appData.apps[0].dev;
        document.getElementById('si-downloads').innerText=appData.apps[0].downloads;

        document.getElementById('ab-download').setAttribute('onclick',"download("+appid+")");

        loadScreen.style.display='none';
        indexScreen.style.display='block';
      }
    }
  });
  appBlock.send(appId);
}
function selectPlatform(psName, fileName, psArc, psSize) {
  const highlightedItems=document.querySelectorAll(".platform-check");
  highlightedItems.forEach(function(userItem) {
    hiId=userItem.id;
    document.getElementById(hiId).className='platform-check';
  });
  document.getElementById('ps-'+psName+'-'+psArc).className='platform-check selected';
  selectedFile=fileName;
  if (psArc!='') { document.getElementById('ab-platform').innerText=psName+' ('+psArc+')'; } else { document.getElementById('ab-platform').innerText=psName; }
  document.getElementById('si-size').innerText=psSize+' МБ';
  platforms();
}
function toggleDescription() {
  if (curDescType=='long') {
    curDescType='short';
    document.getElementById('ab-desc').innerHTML=shortDescription[0]+showFull;
  } else {
    curDescType='long';
    document.getElementById('ab-desc').innerHTML=longDescription+hideFull;
  }
}
function abBack () {
  if ((currentAppScreen==null)||(currentAppScreen=='index')) {
    toggleAB();
  }
}
var positions=0;
var nrpositions=0;
function scrollableBlocks() {
  let previousTop=ab.style.top;
  let abIndex=document.getElementById('ab-main_content');
  abIndex.onscroll=function(){
    positions=abIndex.scrollTop;
    if (positions > 60) {
      positions=60;
      ab.style.borderRadius='0';
    }
    let newTop=60 - positions;
    ab.style.height='calc(100% - '+newTop+'px)';
    let scrPerc = positions / (60 / 100);
    let newbRadius=16 - (16 / 100 * scrPerc);
    abIndex.style.borderTopLeftRadius=newbRadius+'px';
    abIndex.style.borderTopRightRadius=newbRadius+'px';
    ab.style.borderTopLeftRadius=newbRadius+'px';
    ab.style.borderTopRightRadius=newbRadius+'px';
    if (positions < -70) {
      toggleAB();
    }
  };
  let abNR=document.getElementById('ab-new_review');
  abNR.onscroll=function(){
    nrpositions=abNR.scrollTop;
    if (nrpositions > 60) {
      nrpositions=60;
    }
    let newTop=60 - nrpositions;
    ab.style.height='calc(100% - '+newTop+'px)';
    let scrPerc = nrpositions / (60 / 100);
    let newbRadius=16 - (16 / 100 * scrPerc);
    abNR.style.borderTopLeftRadius=newbRadius+'px';
    abNR.style.borderTopRightRadius=newbRadius+'px';
    ab.style.borderTopLeftRadius=newbRadius+'px';
    ab.style.borderTopRightRadius=newbRadius+'px';
  };
}
function newReview() {
  document.getElementById('ab-main_content').style.display='none';
  document.getElementById('ab-new_review').style.display='block';
  if (platform=='mobile') {
    positions=0;
    ab.style.height='calc(100% - 60px)';
    abIndex.style.borderTopLeftRadius='16px';
    abIndex.style.borderTopRightRadius='16px';
    ab.style.borderTopLeftRadius='16px';
    ab.style.borderTopRightRadius='16px';
  }
}
function cancelReview() {
  document.getElementById('ab-main_content').style.display='block';
  document.getElementById('ab-new_review').style.display='none';
}

function switchScreenshot(action) {
  for (let i=0; i <= lastscr; i++) {
    document.getElementById('scr-'+i).style.display='none';
    document.getElementById('dot-'+i).className='scr-dot';
  }
  document.getElementById('nav-prev').disabled=false;
  document.getElementById('nav-next').disabled=false;
  if (action=='next') {

    nextscr=curscr + 1;
    if (nextscr > lastscr) {
      nextscr=lastscr;
    }
    if (nextscr==lastscr) {
      document.getElementById('nav-next').disabled=true;
    }
    document.getElementById('scr-'+nextscr).style.display='block';
    document.getElementById('dot-'+nextscr).className='scr-dot scr-dot-active';

  } else if (action=='prev') {

    nextscr=curscr - 1;
    if (nextscr < 0) {
      nextscr=0;
    }
    if (nextscr==0) {
      document.getElementById('nav-prev').disabled=true;
    }
    document.getElementById('scr-'+nextscr).style.display='block';
    document.getElementById('dot-'+nextscr).className='scr-dot scr-dot-active';

  } else {
    nextscr=action;
    document.getElementById('scr-'+nextscr).style.display='block';
    document.getElementById('dot-'+nextscr).className='scr-dot scr-dot-active';

  }
  curscr=nextscr;
}
function platforms() {
  let psBlock=document.getElementById('ab-platforms');
  let psIcon=document.getElementById('ab-platform-select');
  if (psBlock.style.display=='flex') {
    psBlock.style.display='none';
    psIcon.className='hm-card-compatibility ph-caret-down-bold';
  } else {
    psBlock.style.display='flex';
    psIcon.className='hm-card-compatibility ph-caret-up-bold';
  }
}
function nrRate(rate) {
  document.getElementById('nr-disliked').style.width='calc(30% - 16px)';
  document.getElementById('nr-disliked').style.flexBasis='auto';
  document.getElementById('nr-disliked-txt').style.display='none';
  document.getElementById('nr-liked').style.width='calc(30% - 16px)';
  document.getElementById('nr-liked').style.flexBasis='auto';
  document.getElementById('nr-liked-txt').style.display='none';
  let rateObj;
  let rateName;
  if (rate==1) {
    rateObj='liked';
    isLiked=1;
  } else {
    rateObj='disliked';
    isLiked=0;
  }
  if (platform!='mobile') {
    document.getElementById('nr-'+rateObj).style.width='calc(70% - 16px)';
  } else {
    document.getElementById('nr-'+rateObj).style.width='calc(70% - 32px)';
  }
  document.getElementById('nr-'+rateObj).style.flexBasis='auto';
  setTimeout(function () {
    document.getElementById('nr-liked-txt').style.display='none';
    document.getElementById('nr-disliked-txt').style.display='none';
    document.getElementById('nr-'+rateObj+'-txt').style.display='block';
  }, 1000);
}
function download (appid) {
  if (loggedIn==true) {
    var downloadRequest=new XMLHttpRequest();
    var dqData='action=4LlFCT&id='+appid;
    downloadRequest.responseType = "json";
    downloadRequest.open("POST", api, true);
    downloadRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    downloadRequest.addEventListener("readystatechange", () => {
      if ((downloadRequest.readyState===4)&&(downloadRequest.status===200)) {
        var ddResponse=downloadRequest.response;
        let ddFiles=ddResponse.apps[0].files;
        if ((ddFiles!='')||(ddFiles!='[]')) {
          ddFiles=JSON.parse(ddFiles);
          for(let i=0; i<ddFiles.files.length; i++) {

            if (ddFiles.files[i].file==selectedFile) {
              if (ddFiles.files[i].file.includes('http')==true) {
                window.open(ddFiles.files[i].file);
              } else {
                window.open('https://tstore.space/'+ddFiles.files[i].file);
              }
              break;
            }

          }
        }
      }
    });
    downloadRequest.send(dqData);
  }
}

/* НАСТРОЙКИ */
function checkPars() {
  let redSwitch=document.getElementById('ef-redirect-sw');
  if (localStorage.getItem('ef-nav-bar-animations')=='true') { efNavigationBar() }
  if (localStorage.getItem('ef-search-bar')=='true') { efSearchBar() }
  if (localStorage.getItem('ef-content-margin')=='true') { efContentMargin() }
  if (localStorage.getItem('ef-redirect')=='true') { redSwitch.checked=true }
  if (localStorage.getItem('ef-home-cards')=='true') { efHomeCards() }
  document.getElementById('cur-platform').innerText=localStorage.getItem('platform');
  document.getElementById('p-'+localStorage.getItem('platform')).checked=true;
}

function changePar(parName) {
  if (localStorage.getItem(parName)=='true') {
    localStorage.setItem(parName, 'false');
  } else {
    localStorage.setItem(parName, 'true');
  }
}
function efNewNavBar() {
  document.getElementById('ef-new-nav-bar-sw').checked=true;
  var link=document.createElement('link');
  link.rel='stylesheet';
  link.type='text/css';
  link.href='css/ef-new-nav-bar.css';
  head.appendChild(link);
}
function efSearchBar() {
  document.getElementById('ef-search-bar-sw').checked=true;
  document.getElementById('search-nav-bar').style.display='flex';
}
function efHomeCards() {
  document.getElementById('ef-home-cards-sw').checked=true;
  document.getElementById('hm-index').innerHTML="<div class='hm-bottom-loading' style='display: flex'> \
    <i class='ph-prohibit' style='font-size: 36px; color: gray'></i> \
    <h5 class='ui-gray'>Не удалось загрузить контент</h5> \
  </div>";
  document.getElementById('hm-apps').innerHTML="<div class='hm-bottom-loading' style='display: flex'> \
    <i class='ph-prohibit' style='font-size: 36px; color: gray'></i> \
    <h5 class='ui-gray'>Не удалось загрузить контент</h5> \
  </div>";
}
function efContentMargin() {
  document.getElementById('ef-content-margin-sw').checked=true;
  if (platform=='mobile') {
    var link=document.createElement('link');
    link.rel='stylesheet';
    link.type='text/css';
    link.href='css/ef-content-margin.css';
    head.appendChild(link);
  }
}
function efNavigationBar() {
  document.getElementById('ef-nav-bar-sw').checked=true;
  var prevScrollpos=window.pageYOffset;
  window.onscroll=function() {
    var currentScrollPos=window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById('nav-bar').style.bottom="var(--bottom)";
      document.getElementById('search-nav-bar').style.bottom="var(--bottom)";
      let iconId='house';
      if (selHC=='apps') { iconId='squares-four'; } else if (selHC=='games') { iconId='game-controller'; }
      document.getElementById('nav-index').className='';
      document.getElementById('nav-apps').className='';
      document.getElementById('nav-games').className='';

      document.getElementById('nav-index').className='ph-house-light ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-apps').className='ph-squares-four-light ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-games').className='ph-game-controller ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-'+selHC).className='ph-'+iconId+'-fill ui-nav-icon ui-nav-icon-highlight';
    } else {
      document.getElementById('nav-bar').style.bottom="-70px";
      document.getElementById('search-nav-bar').style.bottom="-70px";
      document.getElementById('nav-index').className='';
      document.getElementById('nav-apps').className='';
      document.getElementById('nav-games').className='';
    }
    prevScrollpos=currentScrollPos;
  }
}

/* СПИСОК*/
function showList(par1, par2, donotToggle, par3, background, font, nameColor, subColor, nameSize, dontPushHistory) {
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
  document.getElementById('list-subtext').style.display='block';
  document.getElementById('list-name').style.display='block';
  document.getElementById('list-search').style.marginTop='8px';
  document.getElementById('list-block').style.display='flex';
  document.getElementById('list-search').style.display='none';
  document.getElementById('list-block').innerHTML='';
  document.getElementById('list-subtext').innerText=par3;
  listHeader.style.background='';
  listHeader.style.display='none';
  listName.style.marginTop='8px';
  listName.style.fontSize='1.5em';
  listName.style.color='var(--text)';
  listName.style.fontFamily='Roboto';
  document.getElementById('list-subtext').style.color='gray';
  if (dontPushHistory!=true) {
    if (par1!='search') {
      window.history.pushState(null, 'Список', '?list=true&par1='+par1+'&par2='+par2+'&donotToggle='+donotToggle+'&par3='+par3+'&background='+background+'&font='+font+'&nameColor='+nameColor+'&subColor='+subColor+'&nameSize='+nameSize);
    } else {
      window.history.pushState(null, 'Поиск', '?search='+par2);
      document.getElementById('list-search').style.marginTop='60px';
    }
  }
  if ((background==null)||(background==0)) {
    listName.style.marginTop='60px';
  } else {
    listHeader.style.display='block';
    listHeader.style.background='url(https://tstore.space/'+background+')';
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
    document.getElementById('search-block').style.display='none';
  }
  var appsList=new XMLHttpRequest();
  var listId;
  if (par1!='search') {
    listId='action=KdSqSAOC&select='+par1+'&value='+par2;
    document.getElementById('list-name').innerHTML=par2+'<i class="ph-heart-straight list-love"></i>';
  } else {
    listId='action=d6Gj59&search='+par2;
    document.getElementById('list-name').style.display='none';
    document.getElementById('list-subtext').style.display='none';
    document.getElementById('list-search').style.display='block';
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
        let liIcon='https://tstore.space/'+listData.apps[i].icon;
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
function toggleList(isSearch, dontPushHistory) {
  document.getElementById('search-block').style.display='none';
  let listBg=document.getElementById('list-block-bg');
  currentListScreen='index';
  if (list.style.display=='block') {
    loadScrn.style.display='none';
    mainScrn.style.display='block';
    setTimeout(function () {
      list.style.display="none";
      listBg.style.display="none";
      list.className='';
      list.style.opacity='1';
      listBg.style.opacity='1';
    }, 150);
    if (platform=='mobile') {
      list.className='scale-phone-anim';
    } else if (platform=='pc') {
      list.className='scale-pc-anim';
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
    document.getElementById('list-subtext').style.display='none';
    document.getElementById('list-name').style.display='none';
    document.getElementById('search-block').style.display='flex';
    document.getElementById('list-header').style.display='none';
    document.getElementById('list-search').style.marginTop='60px';
    document.getElementById('list-block').style.display='none';
    document.getElementById('list-search').style.display='block';
    if (dontPushHistory!=true) {
      window.history.pushState(null, 'TENSTORE', '?block=search');
    }
  }
}
function scrollableList() {
  let listPositions;
  let previousTopList=list.style.top;
  mainScrn.onscroll=function(){
    listPositions=mainScrn.scrollTop;
    if (listPositions > 60) {
      listPositions=60;
    }
    let newTopList=60 - listPositions;
    list.style.height='calc(100% - '+newTopList+'px)';
    let scrPerc = listPositions / (60 / 100);
    let newbRadius=16 - (16 / 100 * scrPerc);
    mainScrn.style.borderTopLeftRadius=newbRadius+'px';
    mainScrn.style.borderTopRightRadius=newbRadius+'px';
    list.style.borderTopLeftRadius=newbRadius+'px';
    list.style.borderTopRightRadius=newbRadius+'px';
  };
}
document.getElementById('list-search').addEventListener("keyup", function(event) {
  if (event.keyCode===13) {
    showList('search', document.getElementById('list-search').value, true);
  }
});
function toggleSearch() {
  let searchBar=document.getElementById('list-search');
  if (searchBar.style.display=='none') {
    searchBar.style.display='block';
  } else {
    searchBar.style.display='none';
  }
}

/* БЛОК ПОЛЬЗОВАТЕЛЯ */
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
      ubObj.className='';
      ubObj.style.opacity='1';
      ubBgObj.style.opacity='1';
    }, 150);
    toggleScrolling('add');
    if (platform=='mobile') {
      ubObj.className='scale-phone-anim';
    } else if (platform=='pc') {
      ubObj.className='scale-pc-anim';
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
  if ((windowName=='logout-confirm')&&(localStorage.getItem('login')==null)&&(localStorage.getItem('debug')!='true')) {
    window.open('login', '_self');
  } else {
    document.getElementById('ub-main').style.display='none';
    document.getElementById('ub-logout-confirm').style.display='none';
    document.getElementById('ub-'+windowName).style.display='block';
  }
}
function setWindow(windowName) {
  document.getElementById('set-main').style.display='none';
  document.getElementById('set-platform').style.display='none';
  document.getElementById('set-phosphor-mit').style.display='none';
  document.getElementById('set-animate-mit').style.display='none';
  document.getElementById('set-'+windowName).style.display='block';
}
function toggleSettings(dontPushHistory) {
  if (setBgObj.style.display=='block') {
    setTimeout(function () {
      setObj.style.display="none";
      setBgObj.style.display="none";
      setObj.className='';
      setObj.style.opacity='1';
      setBgObj.style.opacity='1';
    }, 150);
    toggleScrolling('add');
    if (platform=='mobile') {
      setObj.className='scale-phone-anim';
    } else if (platform=='pc') {
      setObj.className='scale-pc-anim';
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
