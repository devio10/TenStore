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

function dialogBox(curWindow, title, text, btn1_text, btn2_text, onclick1, onclick2, btn1_icon, btn2_icon, btn1_type, btn2_type) {

  document.getElementById(curWindow).style.display='none';
  document.getElementById('dialog_box').style.display='block';

  let btns_inner=[document.getElementById('db_btn1').children, document.getElementById('db_btn2').children];
  let btns_icons=[btn1_icon, btn2_icon];
  let btns_texts=[btn1_text, btn2_text];
  let btns_types=[btn1_type, btn2_type];

  document.getElementById('db_title').innerText=title;
  document.getElementById('db_text').innerText=text;

  for (var i = 0; i < btns_inner.length; i++) {

    btns_inner[i][1].innerText=btns_texts[i];
    btns_inner[i][0].className=`ph-${btns_icons[i]}`;
    if (btns_types[i]=='red') {
      btns_inner[i][0].className=`ph-${btns_icons[i]} red`;
      btns_inner[i][1].className='red';
    } else if (btns_types[i]=='focus') {
      btns_inner[i][0].className=`ph-${btns_icons[i]}-bold`;
      btns_inner[i][1].className='focus';
    } else if (btns_types[i]=='red_focus') {
      btns_inner[i][0].className=`ph-${btns_icons[i]}-bold red`;
      btns_inner[i][1].className='red focus';
    }

  }

  document.getElementById('db_btn1').setAttribute('onclick', onclick1);
  document.getElementById('db_btn2').setAttribute('onclick', onclick2);

}
