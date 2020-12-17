document.getElementById('siteSearch').addEventListener("keyup", function(event) {
  if (event.keyCode===13) {
    window.open('appsList?search='+document.getElementById('siteSearch').value, '_self');
  }
});
function toggleSearchBar () {
  let searchBar=document.getElementById('mobile-search-block');
  let searchButton=document.getElementById('mobileSearch');
  let darkBg=document.getElementById('search-dark-bg');
  if (searchBar.style.display=='block') {

    setTimeout(function () {
      searchBar.style.display='none';
      darkBg.style.display="none";

      searchBar.style.transform='scale(1)';
      searchBar.style.opacity='1';
      darkBg.style.opacity='1';
    }, 200);

    searchBar.style.transform='translateY(70px)';
    searchBar.style.opacity='0';
    darkBg.style.opacity='.1';

    searchButton.innerHTML="<i class='ph-magnifying-glass-bold floatButton-icon'></i>";
  } else {
    searchBar.style.display='block';
    darkBg.style.display="block";
    searchButton.innerHTML="<i class='ph-x-bold floatButton-icon'></i>";
  }
}
function mobileSearch () {
  window.open('appsList?search='+document.getElementById('siteSearch-mobile').value, '_self');
}
