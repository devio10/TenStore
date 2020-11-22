if (localStorage.getItem('client-ad')!='closed') {
  document.getElementById('client-ad').style.display='flex';
}
function closeAd () {
  localStorage.setItem('client-ad', 'closed');
  document.getElementById('client-ad').style.display='none';
}
