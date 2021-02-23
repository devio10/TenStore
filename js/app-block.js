let currentAppScreen;
var ab=document.getElementById('app-block');
var loadScreen=document.getElementById('ab-loading');
var indexScreen=document.getElementById('ab-index');
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
 } else {
   loadScreen.style.display='flex';
   indexScreen.style.display='none';
   toggleScrolling('remove');
   abBg.style.display='block';
   ab.style.display='block';
   body.style.overflow='none';
 }
}
function showAB(appid) {
  toggleAB();
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
        }
        let abIconBg;
        if (appData.apps[0].icon_bg==0) {
          abIconBg='white';
        } else {
          abIconBg=appData.apps[0].icon_bg;
        }
        abIcon.style.background=abIconBg;
        let shortDescription=appData.apps[0].descr.split('<p>');
        document.getElementById('ab-desc').innerHTML=shortDescription[0]+'...';
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
        let scrsData=appData.apps[0].screenshots;
        if ((scrsData!='[]')||(scrsData!=0)) {
          var screenshots=JSON.parse(scrsData);
          for(let s in screenshots.scr) {
            var screenshot=document.createElement('img');
            var scrDot=document.createElement('div');
            if (s==0) {
              scrDot.className='scr-dot scr-dot-active';
            } else {
              scrDot.className='scr-dot';
            }
            scrDot.setAttribute('onclick', 'switchScreenshot('+s+')');
            scrDot.id='scr-'+s;
            screenshot.className='ab-scr';
            screenshot.setAttribute('onclick',"window.open('https://thetenstore.ru/"+screenshots.scr[s].image+"', '_self')");
            screenshot.src='https://thetenstore.ru/'+screenshots.scr[s].image;
            document.getElementById('ab-scrs').appendChild(screenshot);
            document.getElementById('scrs-pag').appendChild(scrDot);

            document.getElementById('scrs-block').style.display='block';
          }
        }

        loadScreen.style.display='none';
        indexScreen.style.display='block';
      }
    }
  });
  appBlock.send(appId);
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
