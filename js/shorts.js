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

            if (ddFiles.files[i].platform==selectedPlatform) {
              if (ddFiles.files[i].file.includes('http')==true) {
                window.open(ddFiles.files[i].file);
              } else {
                window.open('https://thetenstore.ru/'+ddFiles.files[i].file);
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
