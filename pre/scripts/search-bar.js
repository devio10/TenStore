document.getElementById('siteSearch').addEventListener("keyup", function(event) {
  if (event.keyCode===13) {
    window.open('appsList?search='+document.getElementById('siteSearch').value, '_self');
  }
});
function toggleSearchBar () {
  let searchBar=document.getElementById('mobile-search-block');
  let searchButton=document.getElementById('mobileSearch');
  if (searchBar.style.display=='flex') {
    searchBar.style.display='none';
    searchButton.innerHTML="<i class='ph-magnifying-glass-bold floatButton-icon'></i>";
  } else {
    searchBar.style.display='flex';
    searchButton.innerHTML="<i class='ph-x-bold floatButton-icon'></i>";
  }
}
function mobileSearch () {
  window.open('appsList?search='+document.getElementById('siteSearch-mobile').value, '_self');
}
