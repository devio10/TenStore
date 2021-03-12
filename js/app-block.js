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
  if (dontPushHistory!=true) {
    window.history.pushState(null, null, '?id='+appid);
  }
  toggleAB();
  if (localStorage.getItem('debug')=='true') {
    loadScreen.style.display='none';
    indexScreen.style.display='block';
  }
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
        abIcon.src='https://thetenstore.ru/'+appData.apps[0].icon;
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
          abHeader.style.background="url(https://thetenstore.ru/"+appData.apps[0].bg+")";
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
            screenshot.setAttribute('onclick',"window.open('https://thetenstore.ru/"+screenshots.scr[s].image+"', '_self')");
            screenshot.src='https://thetenstore.ru/'+screenshots.scr[s].image;
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
              document.getElementById('ab-platform').innerText=psJson.files[i].platform+' ('+psJson.files[i].architecture+')';
            } else {
              psItem.className='platform-check';
            }
            psItem.innerText=psJson.files[i].platform+' ('+psJson.files[i].architecture+')';
            psItem.setAttribute('onclick','selectPlatform("'+psJson.files[i].platform+'", "'+psJson.files[i].file+'", "'+psJson.files[i].architecture+'")');
            psItem.id='ps-'+psJson.files[i].platform+'-'+psJson.files[i].architecture;
            document.getElementById('ab-platforms').appendChild(psItem);
          }
        } else {
          document.getElementById('ab-download').disabled=true;
          document.getElementById('ab-platform-select').style.display='none';
          document.getElementById('ab-platform').style.display='none';
        }
        document.getElementById('ab-download').setAttribute('onclick',"download("+appid+")");

        loadScreen.style.display='none';
        indexScreen.style.display='block';
      }
    }
  });
  appBlock.send(appId);
}
function selectPlatform(psName, fileName, psArc) {
  const highlightedItems=document.querySelectorAll(".platform-check");
  highlightedItems.forEach(function(userItem) {
    hiId=userItem.id;
    document.getElementById(hiId).className='platform-check';
  });
  document.getElementById('ps-'+psName+'-'+psArc).className='platform-check selected';
  selectedFile=fileName;
  document.getElementById('ab-platform').innerText=psName+' ('+psArc+')';

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
      ab.style.borderRadius='0';
      abIndex.style.borderRadius='0';
    } else {
      ab.style.borderTopLeftRadius='16px';
      ab.style.borderTopRightRadius='16px';
      abIndex.style.borderTopLeftRadius='16px';
      abIndex.style.borderTopRightRadius='16px';
    }
    let newTop=60 - positions;
    ab.style.height='calc(100% - '+newTop+'px)';
  };
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
