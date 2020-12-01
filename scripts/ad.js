/*
if (localStorage.getItem('client-ad')!='closed') {
  document.getElementById('client-ad').style.display='flex';
}
*/
function closeAd (adId) {
  localStorage.setItem(adId, 'closed');
  document.getElementById(adId).style.display='none';
}
function showAds(page) {
  if (page=='homepage') {
    if (localStorage.getItem('google-apps-ad')!='closed') {
      document.getElementById('google-apps-ad').style.display='flex';
    }
  }
}
