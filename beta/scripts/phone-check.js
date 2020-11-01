if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))||(localStorage.getItem('mobileVersion')=='true')){
  var head=document.getElementsByTagName('HEAD')[0];
  var link=document.createElement('link');
  link.rel='stylesheet';
  link.type='text/css';
  link.href='styles/phones.css';
  head.appendChild(link);

  var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
  navItems.forEach(function(e, i) {
  	e.addEventListener("click", function(e) {
  		navItems.forEach(function(e2, i2) {
  			e2.classList.remove("mobile-bottom-nav__item--active");
  		})
  		this.classList.add("mobile-bottom-nav__item--active");
  	});
  });
}
