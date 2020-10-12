function changeTab(tab, tabName, isStep) {
  document.getElementById('dev-myapps').style.display='none';
  document.getElementById('dev-mygames').style.display='none';
  document.getElementById('dev-publish').style.display='none';
  document.getElementById('dev-publish2').style.display='none';
  document.getElementById('dev-news').style.display='none';
  document.getElementById('dev-tenstoreapi').style.display='none';
  document.getElementById('dev-tenidapi').style.display='none';
  document.getElementById('item-myapps').style.fontFamily='var(--regular)';
  document.getElementById('item-mygames').style.fontFamily='var(--regular)';
  document.getElementById('item-publish').style.fontFamily='var(--regular)';
  document.getElementById('item-news').style.fontFamily='var(--regular)';
  document.getElementById('item-tenstoreapi').style.fontFamily='var(--regular)';
  document.getElementById('item-tenidapi').style.fontFamily='var(--regular)';
  document.getElementById('dev-'+tab).style.display='block';
  console.log('dev-'+tab);
  if (isStep!='true') {
    document.getElementById('item-'+tab).style.fontFamily='var(--bold)';
  } else {
    document.getElementById('item-publish').style.fontFamily='var(--bold)';
  }
  document.getElementById('dev-title').innerHTML=tabName;
}
function platform(type, block) {
  if (document.getElementById(block).style.display=='none') {
    document.getElementById(block).style.display='block';
    document.getElementById(type+'-'+block+'-check').src='images/radio/checked.svg';
  } else {
    document.getElementById(block).style.display='none';
    document.getElementById(type+'-'+block+'-check').src='images/radio/unchecked.svg';
  }
}
var appCategory;
function category(type, name) {
  document.getElementById('app-communication-check').src='images/radio/unchecked.svg';
  document.getElementById('app-media-check').src='images/radio/unchecked.svg';
  document.getElementById('app-news-check').src='images/radio/unchecked.svg';
  document.getElementById('app-productivity-check').src='images/radio/unchecked.svg';
  document.getElementById('app-health-check').src='images/radio/unchecked.svg';
  document.getElementById('app-shopping-check').src='images/radio/unchecked.svg';
  document.getElementById('app-videocommunication-check').src='images/radio/unchecked.svg';
  document.getElementById('app-social-check').src='images/radio/unchecked.svg';
  document.getElementById('app-utilities-check').src='images/radio/unchecked.svg';
  document.getElementById('app-vpn-check').src='images/radio/unchecked.svg';
  document.getElementById(type+'-'+name+'-check').src='images/radio/checked.svg';
  appCategory=name;
  console.log(appCategory);
}

$("#dev-app-name").change(function() {
  document.getElementById('dev-aCard-app-name').innerHTML=document.getElementById('dev-app-name').value;
  if (document.getElementById('dev-app-name').value==0) {
    document.getElementById('dev-aCard-name').innerHTML='Название приложения';
  }
});
$("#dev-app-iconbg").change(function() {
  document.getElementById('dev-aCard-app-icon').style.background=document.getElementById('dev-app-iconbg').value;
  if (document.getElementById('dev-app-iconbg').value==0) {
    document.getElementById('dev-aCard-app-icon').style.background='var(--bg)';
  }
});

function padding(type) {
  if (document.getElementById('dev-'+type+'-padding').checked==false) {
    document.getElementById('dev-aCard-'+type+'-icon').style.padding='0';
    document.getElementById('dev-aCard-'+type+'-icon').style.width='150px';
  } else {
    document.getElementById('dev-aCard-'+type+'-icon').style.width='120px';
    document.getElementById('dev-aCard-'+type+'-icon').style.padding='15px';
  }
}

function readAsDataByURL(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

var isNewPhoto = false;
var isPicChanged = false;
let done = false;
let didReadText = false;

var picFile;
var bgFile;
async function readURL(input) {
  if (input.files && input.files[0]) {
    const picture = await readAsDataByURL(input.files[0]);
    $('#dev-aCard-app-icon').attr('src', picture);
    picFile = input.files[0];
    console.log(input.files[0]);
  }
}
$("#app-icon-fileInput").change(function(){
  readURL(this);
  isPicChanged = true;
});
