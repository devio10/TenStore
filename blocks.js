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
function toggleAB (dontPushHistory) {
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
   if (dontPushHistory!=true) {
     window.history.pushState(null, '', 'https://tstore.space/3rd/');
   }
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

    document.getElementById('above_reviews').innerHTML=`
      <div class="ab-review" style="border: 1px solid rgba(67,160,71, 0.5)">
        <div class="abb">
          <i class="review_icon ph-thumbs-up green"></i>
          <h3 class='rev-title'>Feels good</h3>
        </div>
        <h5 class='rev-text'>Example review. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
        <div class="agg">
          <h5 class='rev-author'>Debug_User, 7 августа</h5>
        </div>
        <div class="review_btns">
          <button onclick="removeReview(${appid})"><i class="ph-trash"></i><p>Удалить</p></button>
          <button onclick="editReview()"><i class="ph-pencil-bold"></i><p>Редактировать</p></button>
        </div>
      </div>
    `;

  } else {
    document.getElementById('above_reviews').innerHTML=`
      <button onclick="newReview()" class="big_btn">
        <i class="ph-chats-teardrop-bold ub-openbtn new_review-anim"></i>
        <h4 class="ub-btn-txt focus new_review-anim">Поделитесь мнением</h4>
      </button>
    `;
  }
  document.getElementById('ab-platform-select').style.display='none';

  /* обращение к серверу */
  var appBlock=new XMLHttpRequest();
  var abPars='action=4LlFCT&id='+appid;
  appBlock.responseType = "json";
  if (localStorage.getItem('ef-api2')=='true') {
    abPars=`id=${appid}`;
    appBlock.open("POST", api2_app, true);
  } else {
    appBlock.open("POST", api, true);
  }
  appBlock.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  appBlock.addEventListener("readystatechange", () => {


    if ((appBlock.readyState===4)&&(appBlock.status===200)) {
      var appData=appBlock.response;
      if (appData!=0) {

        if (loggedIn==true) {
          document.getElementById('ab-no_account').style.display='none';
        }

        let abIcon=document.getElementById('ab-icon');
        if (appData.apps[0].icon!='') {
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
        } else {
          abIcon.src='img/prohibit.svg';
        }

        shortDescription=appData.apps[0].descr.split('<p>');
        longDescription=appData.apps[0].descr;
        if (shortDescription[0]==longDescription) {
          document.getElementById('ab-desc').innerHTML=shortDescription[0];
        } else {
          document.getElementById('ab-desc').innerHTML=shortDescription[0]+showFull;
        }
        document.title=appData.apps[0].name+' — TenStore';
        document.getElementById('ab-name').innerText=appData.apps[0].name;
        if (appData.apps[0].sh_desc!='') {
          document.getElementById('ab-short-desc').innerText=appData.apps[0].sh_desc;
        } else {
          let appdev=appData.apps[0].dev;
          if (appData.apps[0].pub!='') {
            appdev=appData.apps[0].pub;
          }
          document.getElementById('ab-short-desc').innerText=appdev;
        }

        let abHeader=document.getElementById('ab-header');
        if (appData.apps[0].bg!=0) {
          abHeader.style.background="url(https://tstore.space/"+appData.apps[0].bg+")";
          abHeader.style.backgroundPosition='center';
          abHeader.style.backgroundRepeat='no-repeat';
          abHeader.style.backgroundSize='cover';
          abHeader.style.display='block';
        } else {
          abHeader.style.display='none';
          document.getElementById('topcontent').style.marginTop='-18px';
        }
        document.getElementById('ab-scrs').innerHTML='';
        document.getElementById('scrs-pag').innerHTML='';
        document.getElementById('scrs-block').style.display='none';
        document.getElementById('nav-prev').disabled=false;
        document.getElementById('nav-next').disabled=false;
        document.getElementById('ab-share_btn').setAttribute('onclick', `abShare(${appid}, '${appData.apps[0].name}')`);
        curscr=0;
        let scrsData=appData.apps[0].screenshots;
        if (localStorage.getItem('ef-api2')=='true') {
          scrsData='[]';
        }
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
            screenshot.setAttribute('onclick',"openScreenshot('https://tstore.space/"+screenshots.scr[s].image+"')");
            screenshot.src='https://tstore.space/'+screenshots.scr[s].image;
            document.getElementById('ab-scrs').appendChild(screenshot);
            document.getElementById('scrs-pag').appendChild(scrDot);
            document.getElementById('scrs-block').style.display='block';
          }
        }

        document.getElementById('ab-reviews').innerHTML='';
        let revJson=appData.apps[0].comments;
        if (localStorage.getItem('ef-api2')=='true') {
          revJson=0;
        }
        if (revJson!=0) {
        const revs=JSON.parse(revJson);
        for(let c in revs.comments) {

          if (c==2) {

            let showFull = document.createElement('button');
            showFull.id = 'ab-reviews-btn';
            showFull.setAttribute('onclick', 'toggleReviews()');
            showFull.innerHTML = `<i class="ph-caret-down-bold"></i><p>Показать полностью</p>`;
            document.getElementById('ab-reviews').appendChild(showFull);

          }

          let currentTime=new Date();
          let revDate=revs.comments[c].date;
          let clearRevDate=revDate.substr(revDate.length - 6);
          if (currentTime.getFullYear() == clearRevDate.substring(0, clearRevDate.length - 2)) {
            revDate=', '+revDate.slice(0, - 7);
          } else {
            revDate=', '+revDate;
          }

          var reviewObj=document.createElement('div');
          reviewObj.className='ab-review';

          let revType='down red';
          if (revs.comments[c].isLiked=='1') {
            revType='up green';
            reviewObj.style.border='1px solid rgba(67,160,71, 0.5)';
          }


          if (revs.comments[c].login!=localStorage.getItem('login')) {

            reviewObj.innerHTML= `
              <div class="abb">
                <i class="review_icon ph-thumbs-${revType}"></i>
                <h3 class='rev-title'>${revs.comments[c].title}</h3>
              </div>
              <h5 class='rev-text'>${revs.comments[c].comment}</h5>
              <div class="agg">
                <h5 class='rev-author'>${revs.comments[c].login}${revDate}</h5>
                <i onclick='reportReview()' class="ph-flag-bold"></i>
              </div>
            `;

            document.getElementById('ab-reviews').appendChild(reviewObj);

          } else {

            reviewObj.innerHTML= `
              <div class="abb">
                <i id='my_rev_rate' class="review_icon ph-thumbs-${revType}"></i>
                <h3 id='my_rev_title' class='rev-title'>${revs.comments[c].title}</h3>
              </div>
              <h5 id='my_rev_text' class='rev-text'>${revs.comments[c].comment}</h5>
              <div class="agg">
                <h5 class='rev-author'>${revs.comments[c].login}${revDate}</h5>
              </div>
              <div class="review_btns">
                <button onclick="removeReview(${appid})"><i class="ph-trash"></i><p>Удалить</p></button>
                <button onclick="editReview()"><i class="ph-pencil-bold"></i><p>Редактировать</p></button>
              </div>
            `;

            document.getElementById('above_reviews').innerHTML='';
            document.getElementById('above_reviews').appendChild(reviewObj);

          }

          document.getElementById('ab-no-reviews').style.display='none';
        }
        }

        selectedPlatform=localStorage.getItem('platform');
        document.getElementById('ab-platforms').innerHTML='';
        let filesjson=appData.apps[0].files;
        if (localStorage.getItem('ef-api2')=='true') {
          filesjson='{}';
        }
        if (filesjson!='{}') {
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
              document.getElementById('ab-platform-info').innerText=psJson.files[i].size+' МБ, '+psJson.files[i].published;
            } else {
              psItem.className='platform-check';
            }
            if (psJson.files[i].architecture!='') {
              psItem.innerText=psJson.files[i].platform+' ('+psJson.files[i].architecture+')';
            } else {
              psItem.innerText=psJson.files[i].platform;
            }
            psItem.setAttribute('onclick',`selectPlatform("${psJson.files[i].platform}", "${psJson.files[i].file}", "${psJson.files[i].architecture}", "${psJson.files[i].size}", "${psJson.files[i].published}")`);
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
        document.getElementById('send-review').setAttribute('onclick',"sendReview("+appid+")");

        loadScreen.style.display='none';
        indexScreen.style.display='block';
      }
    } else if (appBlock.status===0) {

      document.getElementById('ab-loading').style.display='none';
      document.getElementById('ab-error').style.display='flex';

    }


  });

  appBlock.send(abPars);
}
function selectPlatform(psName, fileName, psArc, psSize, psDate) {
  const highlightedItems=document.querySelectorAll(".platform-check");
  highlightedItems.forEach(function(userItem) {
    hiId=userItem.id;
    document.getElementById(hiId).className='platform-check';
  });
  document.getElementById('ps-'+psName+'-'+psArc).className='platform-check selected';
  selectedFile=fileName;
  if (psArc!='') { document.getElementById('ab-platform').innerText=psName+' ('+psArc+')'; } else { document.getElementById('ab-platform').innerText=psName; }
  document.getElementById('ab-platform-info').innerText=psSize+' МБ, '+psDate;
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
  /*
  if ((currentAppScreen==null)||(currentAppScreen=='index')) {
    toggleAB();
  }
  */
  history.back();
}
var positions=0;
var nrpositions=0;

function newReview() {
  if (loggedIn==true) {
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
  } else {
    popup('Войдите в аккаунт', 'sign-in');
  }
}
function abShare(appid, name) {
  document.getElementById('ab-main_content').style.display='none';
  document.getElementById('ab-share').style.display='block';

  let color = getAverageRGB(document.getElementById('ab-icon'));
  let color1 = `rgb(${color.r}, ${color.g}, ${color.b})`
  let color2 = `rgb(${color.r + 10}, ${color.g + 10}, ${color.b + 10})`
  document.getElementById('share-block').style.background=`linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;

  if (lightOrDark(color1)=='dark') {

    document.getElementById('share-name').style.color='white';
    document.getElementById('share-link').style.background='rgba(255, 255, 255, 0.5)';

  } else {

    document.getElementById('share-name').style.color='black';
    document.getElementById('share-link').style.background='rgba(0, 0, 0, 0.75)';

  }

  document.getElementById('share-link').style.color=color1;
  /*
  var vibrant = new Vibrant(document.getElementById('ab-icon'));
  var swatches = vibrant.swatches()
  for (var swatch in swatches) {
    if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
      let vaaa=swatches[swatch].getRgb();
      console.log(vaaa);

    }
  }
  */
     /*
      * Results into:
      * Vibrant #7a4426
      * Muted #7b9eae
      * DarkVibrant #348945
      * DarkMuted #141414
      * LightVibrant #f3ccb4
      */


  /* QR CODE */
  document.getElementById('share-qr_code').src=`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=https://tstore.space/3rd/?id=${appid}`;
  document.getElementById('share-name').innerText=name;
  document.getElementById('share-link').value='https://tstore.space/3rd/?id='+appid;

  document.getElementById('twitter').setAttribute('onclick', `window.open('https://twitter.com/intent/tweet?text=https://tstore.space/3rd/?id=${appid}', '_blank')`);
  document.getElementById('viber').setAttribute('onclick', `window.open('viber://forward?text=https://tstore.space/3rd/?id=${appid}')`);
  document.getElementById('telegram').setAttribute('onclick', `window.open('https://t.me/share/url?url=https://tstore.space/3rd/?id=${appid}', '_blank')`);
  document.getElementById('vk').setAttribute('onclick', `window.open('https://vk.com/share.php?url=https://tstore.space/3rd/?id=${appid}', '_blank')`);

  if (platform=='mobile') {
    positions=0;
    ab.style.height='calc(100% - 60px)';
    abIndex.style.borderTopLeftRadius='16px';
    abIndex.style.borderTopRightRadius='16px';
    ab.style.borderTopLeftRadius='16px';
    ab.style.borderTopRightRadius='16px';
  }
}
function abHome() {
  let tabs=document.getElementById('app-block').children;
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.display='none';
  }
  document.getElementById('ab-main_content').style.display='block';
}

function shareCopy() {
  var copyText=document.querySelector("#share-link");
  copyText.select();
  document.execCommand("copy");
  popup('Скопировано в буфер обмена', 'clipboard-text', 'small');
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
    psIcon.className='hm-card-compatibility ph-caret-down-bold anim-down';
  } else {
    psBlock.style.display='flex';
    psIcon.className='hm-card-compatibility ph-caret-up-bold anim-up';
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
    isLiked='1';
  } else {
    rateObj='disliked';
    isLiked='-1';
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
function openScreenshot(src) {

  let tabs=document.getElementById('app-block').children;
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.display='none';
  }
  document.getElementById('ab-screenshot').style.display='block';
  document.getElementById('ab_scr_img').src=src;

}
function editReview() {

  newReview();

  document.getElementById('nr-title').value=document.getElementById('my_rev_title').innerText;
  document.getElementById('nr-text').value=document.getElementById('my_rev_text').innerText;

  if (document.getElementById('my_rev_rate').className=='review_icon ph-thumbs-down red') {
    nrRate(0);
  } else {
    nrRate(1);
  }

}
function removeReview(appid, confirmed) {

  if (confirmed==null) {

    dialogBox('app-block', 'Удалить комментарий?', 'Отменить это действие будет невозможно.', 'Отмена', 'Удалить', `removeReview(${appid}, 'cancel')`, `removeReview(${appid}, 'confirm')`, 'arrow-arc-left', 'trash', null, 'red_focus');

  } else if (confirmed=='cancel') {

    document.getElementById('dialog_box').style.display='none';
    document.getElementById('app-block').style.display='block';

  } else if (confirmed=='confirm') {

    loadbox('begin', 10000);
    document.getElementById('nr-text').value='$%delete%$';
    document.getElementById('nr-title').value='$%delete%$';
    nrRate(0);
    sendReview(appid, 0);

  }

}
function sendReview(appid, remove) {
  if (isLiked!=null) {
    let reviewtext=document.getElementById('nr-text').value;
    let reviewtitle=document.getElementById('nr-title').value;
    var sendreview=getXMLHTTP();
    sendreview.responseType="json";
    sendreview.open('POST', 'https://tstore.space/api.php', true);
    sendreview.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    sendreview.send("action=DF7dcbw"+"&login="+localStorage.getItem('login')+"&password="+localStorage.getItem('password')+"&isLiked="+isLiked+"&comment="+reviewtext+"&title="+reviewtitle+"&id="+appid);
    sendreview.onreadystatechange = function() {
      abHome();
      let appBlock=new XMLHttpRequest();
      let appId='action=4LlFCT&id='+appid;
      appBlock.responseType = "json";
      appBlock.open("POST", api, true);
      appBlock.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      appBlock.addEventListener("readystatechange", () => {
        if ((appBlock.readyState===4)&&(appBlock.status===200)) {
          let appData=appBlock.response;
          if (appData!=0) {
            document.getElementById('ab-reviews').innerHTML='';
            let revJson=appData.apps[0].comments;
            if (revJson!=0) {
              const revs=JSON.parse(revJson);
              for(let c in revs.comments) {

                if (c==3) {

                  let showFull = document.createElement('button');
                  showFull.id = 'ab-reviews-btn';
                  showFull.setAttribute('onclick', 'toggleReviews()');
                  showFull.innerHTML = `<i class="ph-caret-down-bold"></i><p>Показать полностью</p>`;
                  document.getElementById('ab-reviews').appendChild(showFull);

                }

                let currentTime=new Date();
                let revDate=revs.comments[c].date;
                let clearRevDate=revDate.substr(revDate.length - 6);
                if (currentTime.getFullYear() == clearRevDate.substring(0, clearRevDate.length - 2)) {
                  revDate=', '+revDate.slice(0, - 7);
                } else {
                  revDate=', '+revDate;
                }

                var reviewObj=document.createElement('div');
                reviewObj.className='ab-review';

                let revType='down red';
                if (revs.comments[c].isLiked=='1') {
                  revType='up green';
                  reviewObj.style.border='1px solid rgba(67,160,71, 0.5)';
                }


                if (revs.comments[c].login!=localStorage.getItem('login')) {

                  reviewObj.innerHTML= `
                    <div class="abb">
                      <i class="review_icon ph-thumbs-${revType}"></i>
                      <h3 class='rev-title'>${revs.comments[c].title}</h3>
                    </div>
                    <h5 class='rev-text'>${revs.comments[c].comment}</h5>
                    <div class="agg">
                      <h5 class='rev-author'>${revs.comments[c].login}${revDate}</h5>
                      <i onclick='reportReview()' class="ph-flag-bold"></i>
                    </div>
                  `;

                  document.getElementById('ab-reviews').appendChild(reviewObj);

                } else {

                  reviewObj.innerHTML= `
                    <div class="abb">
                      <i id='my_rev_rate' class="review_icon ph-thumbs-${revType}"></i>
                      <h3 id='my_rev_title' class='rev-title'>${revs.comments[c].title}</h3>
                    </div>
                    <h5 id='my_rev_text' class='rev-text'>${revs.comments[c].comment}</h5>
                    <div class="agg">
                      <h5 class='rev-author'>${revs.comments[c].login}${revDate}</h5>
                    </div>
                    <div class="review_btns">
                      <button onclick="removeReview(${appid})"><i class="ph-trash"></i><p>Удалить</p></button>
                      <button onclick="editReview()"><i class="ph-pencil-bold"></i><p>Редактировать</p></button>
                    </div>
                  `;

                  document.getElementById('above_reviews').innerHTML='';
                  document.getElementById('above_reviews').appendChild(reviewObj);

                }

                document.getElementById('ab-no-reviews').style.display='none';

              }
          };
        };
        }
      });
      appBlock.send(appId);
      if (remove!=0) {
        popup('Комментарий опубликован', 'check');
      } else {
        popup('Комментарий удалён', 'trash');
        removeReview(0, 'cancel');
        loadbox('end');
      }
    };
  } else {
    popup('Поставьте оценку приложению', 'star-half');
  }
}

function addToLibrary (appid) {

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
                addToLibrary(appid);
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

  let params = ['ef-redirect', 'top_navbar', 'debug', 'slow_network', 'ef-api2'];

  for (var i = 0; i < params.length; i++) {

    if (localStorage.getItem(params[i])=='true') {

      document.getElementById(`${params[i]}-sw`).checked=true;

    }

  }

  document.getElementById('cur-platform').innerText=localStorage.getItem('platform');
  document.getElementById('p-'+localStorage.getItem('platform')).checked=true;

  if (localStorage.getItem('ef-api2')=='true') {
    document.getElementById('api_version').innerText='API 2.0';
  }

}

function changePar(parName) {
  if (localStorage.getItem(parName)=='true') {
    localStorage.setItem(parName, 'false');
  } else {
    localStorage.setItem(parName, 'true');
  }
}

function efNavigationBar() {
  var prevScrollpos=window.pageYOffset;
  window.onscroll=function() {
    var currentScrollPos=window.pageYOffset;
    if (currentScrollPos < 0) {
      currentScrollPos=0;
    }
    if (prevScrollpos > currentScrollPos) {
      document.getElementById('nav-bar').style.bottom="var(--bottom)";
      document.getElementById('search-nav-bar').style.bottom="var(--bottom)";
      let iconId='house';
      if (selHC=='apps') { iconId='squares-four'; } else if (selHC=='games') { iconId='game-controller'; } else if (selHC=='search') { iconId='magnifying-glass'; }
      document.getElementById('nav-index').className='';
      document.getElementById('nav-apps').className='';
      document.getElementById('nav-games').className='';
      document.getElementById('nav-search').className='';

      document.getElementById('nav-index').className='ph-house-light ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-apps').className='ph-squares-four-light ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-search').className='ph-magnifying-glass-light ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-games').className='ph-game-controller ui-nav-icon ui-nav-icon-highlight';
      document.getElementById('nav-'+selHC).className='ph-'+iconId+'-fill ui-nav-icon ui-nav-icon-highlight';
    } else {
      document.getElementById('nav-bar').style.bottom="-70px";
      document.getElementById('search-nav-bar').style.bottom="-70px";
      document.getElementById('nav-index').className='';
      document.getElementById('nav-search').className='';
      document.getElementById('nav-apps').className='';
      document.getElementById('nav-games').className='';
    }
    prevScrollpos=currentScrollPos;
  }
}


function showList(list_name) {

  toggleList();
  sortby('date');

  loadScrn.style.display='none';
  mainScrn.style.display='block';

  if (list_name=='saved') {


    /* закладки */
    document.getElementById('btn_list_removeall').style.display='flex';
    document.getElementById('btn_list_checkupdates').style.display='none';
    document.getElementById('btn_list_downloadall').style.display='flex';

    document.getElementById('list_title').innerText='Закладки';
    document.getElementById('list-header').style.background='linear-gradient(135deg, rgb(229,57,53) 0%, #ff2824 100%)';
    document.getElementById('list_icon').src='img/icons/bookmarks.svg';
    document.getElementById('list_icon').style.boxShadow='0px 10px 29px 6px rgba(229, 57, 53, 0.15)';


  } else if (list_name=='library') {

    document.getElementById('btn_list_removeall').style.display='none';
    document.getElementById('btn_list_checkupdates').style.display='flex';
    document.getElementById('btn_list_downloadall').style.display='none';

    document.getElementById('list_title').innerText='Библиотека';
    document.getElementById('list-header').style.background='linear-gradient(135deg, #3f51b5 0%, #303f9f 100%)';
    document.getElementById('list_icon').src='img/icons/library.svg';
    document.getElementById('list_icon').style.boxShadow='0px 10px 29px 6px rgba(48, 63, 159, 0.15)';

  }

}
/* СПИСОК*/
function showListOld(par1, par2, donotToggle, par3, background, font, nameColor, subColor, nameSize, dontPushHistory) {
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
  document.getElementById('list-block').style.display='flex';
  document.getElementById('list-noitems').style.display='none';
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
    window.history.pushState(null, '', '?list=true&par1='+par1+'&par2='+par2+'&donotToggle='+donotToggle+'&par3='+par3+'&background='+background);
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
  var appsList=new XMLHttpRequest();
  var listId='action=KdSqSAOC&select='+par1+'&value='+par2;
    document.getElementById('list-name').innerHTML=par2;
  appsList.responseType='json';
  appsList.open('POST', api, true);
  appsList.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  appsList.addEventListener("readystatechange", () => {
    if ((appsList.readyState===4)&&(appsList.status===200)) {
      var listData=appsList.response;
      loadScrn.style.display='none';
      mainScrn.style.display='block';
      if (listData.apps!=undefined) {
        for (let i=0; i<listData.apps.length; i++) {
          let iconPadding='0';
          let iconBg='white';
          let iconSize='40px';
          let liIcon='https://tstore.space/'+listData.apps[i].icon;
          if (listData.apps[i].icon=='') {
            liIcon='img/prohibit.svg';
          }
          if (listData.apps[i].icon_bg!=0) {
            iconBg=listData.apps[i].icon_bg;
          }
          if (listData.apps[i].icon_pad!=0) {
            iconPadding='5px';
            iconSize='30px';
          }
          let appdev=listData.apps[i].dev;
          if (listData.apps[i].pub!='') {
            appdev=listData.apps[i].pub;
          }
          var listItem=document.createElement('div');
          listItem.className='app-item';
          listItem.innerHTML="<img class='ai-icon' onclick='toggleList(true, true); showAB("+listData.apps[i].id+")' style='background: "+iconBg+"; padding: "+iconPadding+"; width: "+iconSize+"; height: "+iconSize+"' src='"+liIcon+"'> \
          <div class='ai-text'> <h5 onclick='toggleList(true, true); showAB("+listData.apps[i].id+")' class='ai-name'>"+listData.apps[i].name+"</h5> <h5 onclick='toggleList(true, true); showAB("+listData.apps[i].id+")' class='ai-dev'>"+appdev+"</h5> </div> \
          <i onclick='toggleList(true, true); showAB("+listData.apps[i].id+")' class='ph-info ai-info'></i> <i onclick='download("+listData.apps[i].id+"); popup(`Скачивание началось`, `cloud-arrow-down`)' class='ph-cloud-arrow-down ai-down'></i>"
          document.getElementById('list-block').appendChild(listItem);
        }
      } else {
        document.getElementById('list-noitems').style.display='flex';
      }
    }
  });
  appsList.send(listId);
}
let currentListScreen;
var list=document.getElementById('list');
var loadScrn=document.getElementById('list-loading');
var mainScrn=document.getElementById('list-main');


function list_actions(isSort) {

  let obj=document.getElementById('list_actions');

  if (isSort==true) {
    obj=document.getElementById('list_sortby')
  }

  if (obj.style.display=='block') {

    setTimeout(function () {

      obj.style.display='none';
      obj.style.animationName='anim_showlistblock';

    }, 200);

    obj.style.animationName='anim_hidelistblock';

  } else {

    obj.style.display='block';

  }

}

var list_names=['Music X — Музыка ВК', 'TenStore для Android', 'Orpad — блокнот', 'Spotify', 'Telegram', 'Notepads App'];
var list_devs=['Fooxboy', 'Ten Software', 'Li_is', 'Spotify Ltd.', 'Telegram LLC', 'Jackie Liu'];
var list_dates=[1000, 19523, 23424, 1231231, 134, 999];
var list_downloads=[10, 0, 1, 5, 95, 11];
//var ids=[...];

var ulist_names=['Music X — Музыка ВК', 'TenStore для Android', 'Orpad — блокнот', 'Spotify', 'Telegram', 'Notepads App'];
var ulist_devs=['Fooxboy', 'Ten Software', 'Li_is', 'Spotify Ltd.', 'Telegram LLC', 'Jackie Liu'];
var ulist_dates=[1000, 19523, 23424, 1231231, 134, 999];
var ulist_downloads=[10, 0, 1, 5, 95, 11];

var sort_method='name';
var sort_order='descending';

function sortby(criterion) {

  let list = document.getElementById('list-block');
  let sorted, unsorted, index;


  if (criterion=='name') {

    sorted = list_names.sort();
    unsorted = ulist_names;

  } else if (criterion=='date') {

    sorted = list_dates.sort(function(a, b) {
      return a - b;
    });
    unsorted = ulist_dates;

  } else if (criterion=='dev') {

    sorted = list_devs.sort();
    unsorted = ulist_devs;

  } else if (criterion=='downloads') {

    sorted = list_downloads.sort(function(a, b) {
      return a - b;
    });
    unsorted = ulist_downloads;

  }

  sort_method = criterion;

  if (sort_order=='descending') {

    sorted.reverse();

  }

  for (var i = 0; i < sorted.length; i++) {


    for (var j = 0; j < sorted.length; j++) {

      if (unsorted[j]==sorted[i]) {

        index=j;

      }

    }

    list.appendChild(document.getElementById(`el_${index}`));


  }

}

function list_order(direction) {

  sort_order = direction;
  sortby(sort_method);

}

function toggleList(isSearch, dontPushHistory) {
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
    if (dontPushHistory!=true) {
      window.history.pushState(null, '', 'https://tstore.space/3rd/');
    }
  } else {
    loadScrn.style.display='flex';
    mainScrn.style.display='none';
    toggleScrolling('remove');
    listBg.style.display='block';
    list.style.display='block';
    body.style.overflow='none';
  }
}

document.getElementById('hm-search-input').addEventListener("keyup", function(event) {
  if (event.keyCode===13) {
    goSearch();
  }
});

/* БЛОК ПОЛЬЗОВАТЕЛЯ */
var ubObj=document.getElementById('user-block');
var setBgObj=document.getElementById('set-block-bg');
var setObj=document.getElementById('settings-block');
function toggleUB(dontPushHistory) {

  let color = getAverageRGB(document.getElementById('ub-user'));
  let color1 = `rgb(${color.r}, ${color.g}, ${color.b})`;
  document.getElementById('ha_topblock').style.background = color1;
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
    if (dontPushHistory!=true) {
      window.history.pushState(null, '', 'https://tstore.space/3rd/');
    }
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
  document.getElementById('set-support').style.display='none';
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
    if (dontPushHistory!=true) {
      window.history.pushState(null, '', 'https://tstore.space/3rd/');
    }

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

function toggleScrolling(state) {
  if (state=='remove') {
    body.classList.add('no-scrolling');
  } else {
    body.classList.remove('no-scrolling');
  }
}

function toggleReviews(state) {

  if ((state=='off')||(document.documentElement.getAttribute('full-reviews')=='true')) {

    for (var i = 0; i < document.getElementsByClassName('ab-review').length; i++) {
      if (i < 2) {
        continue;
      }
      document.getElementsByClassName('ab-review')[i].style.animationName='review-hide';
    }
    document.getElementById('ab-reviews-btn').innerHTML=`<i class="ph-caret-down-bold"></i><p>Показать полностью</p>`;

    setTimeout(function () {

      document.documentElement.setAttribute('full-reviews', 'false');

    }, 500);

  } else {

    document.documentElement.setAttribute('full-reviews', 'true');
    document.getElementById('ab-reviews-btn').innerHTML=`<i class="ph-caret-up-bold"></i><p>Скрыть</p>`;

    for (var i = 0; i < document.getElementsByClassName('ab-review').length; i++) {
      document.getElementsByClassName('ab-review')[i].style.animationName='review-show';
    }

  }

}

function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    }
    else {

        return 'dark';
    }
}

function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}
