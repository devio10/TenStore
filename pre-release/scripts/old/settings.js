function getDefault (dSetting) {
  if (dSetting == 'newFont') {
    return "false";
  } else {
    return "true";
  }
}

function changeSetting (parameter) {
  let current = localStorage.getItem(parameter);
  let choice;
  if (current == "t") {
    localStorage.setItem(parameter, "f");
    choice = "false";
  } else if (current == "f") {
    localStorage.setItem(parameter, "t");
    choice = "true";
  } else {
    localStorage.setItem(parameter, "t");
    choice = "true";
  }
  document.getElementById('refreshButton').style.display = "block";
  if (parameter == "newFont") {
    document.documentElement.setAttribute('data-oldFont', choice);
  }
}

function checkSwitches() {
  let betaTest = localStorage.getItem('betaTest');
  let newFont = localStorage.getItem('newFont');
  let nameDisplay = localStorage.getItem('nameDisplay');
  let alUpdates = localStorage.getItem('alUpdates');
  let alUpdates2 = localStorage.getItem('alUpdates2');
  let mailSpam = localStorage.getItem('mailSpam');
  let altDesign = localStorage.getItem('altDesign');
  let analytics = localStorage.getItem('analytics');
  let appsListSort = localStorage.getItem('appsListSort');

  if (betaTest == "t") {
    document.getElementById('s-betaTest').checked = true;
  }
  if (newFont == "t") {
    document.getElementById('s-newFont').checked = true;
  }
  if (nameDisplay == "t") {
    document.getElementById('s-nameDisplay').checked = true;
  }
  if (alUpdates == "t") {
    document.getElementById('s-alUpdates').checked = true;
  }
  if (alUpdates2 == "t") {
    document.getElementById('s-alUpdates2').checked = true;
  }
  if (mailSpam == "t") {
    document.getElementById('s-mailSpam').checked = true;
  }
  if (altDesign == "t") {
    document.getElementById('s-altDesign').checked = true;
  }
  if (analytics == "t") {
    document.getElementById('s-analytics').checked = true;
  }
  if (appsListSort == "t") {
    document.getElementById('s-appsListSort').checked = true;
  }
}
