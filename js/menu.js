const openBtn = document.querySelector('#open-menu');
const menu = document.querySelector('#menu');
const closeBtn = document.querySelector('#close-menu');

openBtn.addEventListener('click', () => {
  menu.classList.add('active');
})

closeBtn.addEventListener('click', () => {
  menu.classList.remove('active');
})