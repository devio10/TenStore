var isNotFound;

const libReq=new XMLHttpRequest();
const url="https://tstore.space/api.php";
let libPars=new FormData();
libPars.append("action", 'hgwea0756');
libPars.append("login", localStorage.getItem('login'));
libPars.append("password", localStorage.getItem('password'));
libReq.open("POST", url, true);
libReq.addEventListener("readystatechange", () => {
  if (libReq.readyState===4 && libReq.status===200) {
    let libObj=libReq.response;
    for(let i=0; i<libObj.apps.length; i++) {
      showAppCard('aCard-block', libObj.apps[i].icon, libObj.apps[i].icon_pad, libObj.apps[i].icon_bg, libObj.apps[i].id, libObj.apps[i].name, libObj.apps[i].dev);
    }
  }
});
libReq.send(libPars);

function ifNotFound () {
  document.getElementById('no-elements').style.display='none';
}
