function getUrlVars(key) {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
  }

let action = "4LlFCT";
let id = getUrlVars()["id"];

const request = new XMLHttpRequest();
const url = "api.php";
const params = "action=" + action + "&id=" + id;
request.responseType =	"json";
request.open("POST", url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.addEventListener("readystatechange", () => {
  if ((request.readyState === 4) && (request.status === 200)) {
    var obj = request.response;
    for(let i=0; i<obj.apps.length; i++) {
      let header = obj.apps[0].head_image;
      let pHeader = document.getElementById("appB");
      let pHeaderM = document.getElementById("appM");
      document.getElementById("ATIcon").src=obj.apps[0].icon;
      document.getElementById("ATName").innerHTML=obj.apps[0].appname;
      document.getElementById("ATIconM").src=obj.apps[0].icon;
      document.getElementById("ATNameM").innerHTML=obj.apps[0].appname;
      document.getElementById("rateCount").innerHTML=obj.apps[0].downloads + " загрузок";
      document.getElementById("ATIcon").style.padding = obj.apps[0].padding;
      document.getElementById("ATIcon").style.bg = obj.apps[0].bg;
      document.getElementById("ATIconM").style.bg = obj.apps[0].bg;
      let size = 0;
      if (obj.apps[0].padding == 15) {
        size = '150px';
      } else {
        size = '175px';
      }
      document.getElementById("ATIcon").style.width = size;
      document.getElementById("ATIcon").style.height = size;
      document.getElementById("ATIconM").style.width = size;
      document.getElementById("ATIconM").style.height = size;
      pHeader.style.background = "var(--gradient), url(" + header + ")";
      pHeader.style.objectFit = 'cover';
      pHeader.style.backgroundAttachment = 'fixed';
      pHeader.style.backgroundPosition = 'center';
      pHeader.style.backgroundRepeat = 'no-repeat';
      pHeader.style.backgroundSize = 'cover';
      pHeaderM.style.background = "var(--gradient), url(" + header + ")";
      pHeaderM.style.backgroundPosition = 'center';
      pHeaderM.style.backgroundRepeat = 'no-repeat';
      pHeaderM.style.backgroundSize = 'cover';
      document.getElementById('bScr').innerHTML = obj.apps[0].screenshots;
      if (obj.apps[0].padding == 0) {
        document.getElementById("ATIcon").style.width = '165px';
        document.getElementById("ATIcon").style.height = '165px';
      }
      if (obj.apps[0].windows == 0) {
        document.getElementById("windows").style.display = 'none';

      }
      if (obj.apps[0].android == 0) {
        document.getElementById("android").style.display = 'none';
        document.getElementById("windows").style.borderRadius = '0 0 10px 10px';
      }
      if ((obj.apps[0].android == 0) && (obj.apps[0].windows == 0)) {
        document.getElementById("downlBtn").style.display = 'none';
      }
      document.getElementById("downlWindows").href=obj.apps[0].windows;
      document.getElementById("downlAndroid").href=obj.apps[0].android;
      document.getElementById("desc").innerHTML=obj.apps[0].description;
      document.getElementById("changes").innerHTML=obj.apps[0].whatsNew;
    }
  }
});
request.send(params);

function bScr () {
  document.getElementById('bDesc').style.display = 'none';
  document.getElementById('whatsNew').style.display = 'none';
  document.getElementById('bScr').style.display = 'flex';
  document.getElementById('2').style.fontFamily = 'var(--bold-font)';
  document.getElementById('APFirst').style.fontFamily = '';
  document.getElementById('3').style.fontFamily = '';
}

function bDesc () {
  document.getElementById('bDesc').style.display = 'block';
  document.getElementById('whatsNew').style.display = 'none';
  document.getElementById('bScr').style.display = 'none';
  document.getElementById('APFirst').style.fontFamily = 'var(--bold-font)';
  document.getElementById('3').style.fontFamily = '';
  document.getElementById('2').style.fontFamily = '';
}

function whatsNew () {
  document.getElementById('bDesc').style.display = 'none';
  document.getElementById('whatsNew').style.display = 'block';
  document.getElementById('bScr').style.display = 'none';
  document.getElementById('3').style.fontFamily = 'var(--bold-font)';
  document.getElementById('APFirst').style.fontFamily = '';
  document.getElementById('2').style.fontFamily = '';
}
