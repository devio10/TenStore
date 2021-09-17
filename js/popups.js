function popup(text, icon, type) {
  let popup_obj=document.getElementById('pop_up');
  if (text!='hide') {
    document.getElementById('pop_up-icon').className='ph-'+icon;
    document.getElementById('pop_up-text').innerText=text;
    popup_obj.style.display='flex';
    if (type!='small') {
      setTimeout(function () {
        popup_obj.style.opacity='0';
        popup_obj.className='pop_up scale-down-anim';
      }, 2750);
    } else {
      popup_obj.className='pop_up small';
      setTimeout(function () {
        popup_obj.style.opacity='0';
        popup_obj.className='pop_up small translate-y-hide-anim';
      }, 2750);
    }
    setTimeout(function () {
      popup_obj.style.display='none';
      document.getElementById('pop_up-icon').className='ph-warning';
      document.getElementById('pop_up-text').innerText='Ошибка на стороне сайта';
      popup_obj.className='pop_up';
      popup_obj.style.opacity='1';
    }, 3000);
  } else {
    popup_obj.style.opacity='0';
    popup_obj.className='pop_up small translate-y-hide-anim';
    setTimeout(function () {
      popup_obj.style.display='none';
      document.getElementById('pop_up-icon').className='ph-warning';
      document.getElementById('pop_up-text').innerText='Ошибка на стороне сайта';
      popup_obj.className='pop_up';
      popup_obj.style.opacity='1';
    }, 3000);
  }
}
function loadbox(state, timeout, text) {
  let loadbox_obj=document.getElementById('load_box');
  if (state=='begin') {

    if (text!=null) {
      document.getElementById('load_box-text').style.display='block';
      document.getElementById('load_box-text').innerText=text;
    } else {
      document.getElementById('load_box-text').style.display='none';
    }
    loadbox_obj.style.display='flex';
    if (timeout!=null) {
      setTimeout(function () {
        if (loadbox_obj.style.display=='flex') {
          loadbox('end');
          popup('Превышено время ожидания', 'clock');
        }
      }, timeout);
    }

  } else if (state=='end') {
    document.getElementById('load_box-text').style.display='none';
    document.getElementById('load_box-text').innerText='';
    loadbox_obj.style.opacity='0';
    setTimeout(function () {
      loadbox_obj.style.display='none';
      loadbox_obj.style.opacity='1';
    }, 250);
  }
}
