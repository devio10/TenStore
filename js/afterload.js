checkTheme();
checkPlatform();
var body=document.getElementsByTagName('body')[0];

const swiper=new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.swiper-pagination',
  },
});
