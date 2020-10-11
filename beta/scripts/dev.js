function changeTab(tab, tabName) {
  document.getElementById('dev-myapps').style.display='none';
  document.getElementById('dev-mygames').style.display='none';
  document.getElementById('dev-publish').style.display='none';
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
  document.getElementById('item-'+tab).style.fontFamily='var(--bold)';
  document.getElementById('dev-title').innerHTML=tabName;
}
