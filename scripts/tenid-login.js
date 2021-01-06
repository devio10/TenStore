
function closePromo (adId) {
  if (localStorage.getItem('login')!='animeda') {
    localStorage.setItem(adId, 'closed');
    document.getElementById(adId).style.display='none';
  } else {
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
    alert('succ');
  }

}
function showPromo(page) {
  if (page=='homepage') {
    if ((localStorage.getItem('google-apps-promo')!='closed')||(localStorage.getItem('login')=='animeda')) {
      document.getElementById('google-apps-promo').style.display='flex';
    }
    if ((localStorage.getItem('save-traffic-info')!='closed')&&(localStorage.getItem('save-traffic')=='true')) {
      document.getElementById('save-traffic-info').style.display='flex';
    }
  }
}
