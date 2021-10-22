if (platform=='pc') {

  let banner=document.getElementById('banner_search');
  banner.innerHTML=`
    <style>
      #banner_search {
        padding: 16px;
        background-image: url(https://tstore.space/images/banners/tenstore_console-banner_search.jpg);
        background-position: center;
        background-size: cover;
        cursor: pointer;
      }
      #banner_search > h1 {
        color: white;
        margin: 0;
        font-weight: bold;
        user-select: none;
      }
      #banner_search > button {
        background: #275efe;
        padding: none;
        width: 200px;
        height: 40px;
        font-weight: bold;
        font-size: 16px;
        margin: 16px 0 0 0;
        border-radius: 1000px;
      }
    </style>
    <h1>Станьте разработчиком<br>TenStore. <b style="color: gray; font-weight: bold">Бесплатно.<br>За пару кликов.</b></h1>
    <button>Открыть консоль</button>
  `;
  banner.setAttribute('onclick', `window.open('https://dev.tstore.space/become-dev?source=banner_search')`);

}
