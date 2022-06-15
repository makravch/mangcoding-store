import './styles/style.scss';
import Swiper from './scripts/swiper.js';

const _carousel = new Swiper('.carousel');

const body = document.querySelector('body');
const headerToggle = document.querySelector('.header__toggle');
const mobMenu = document.querySelector('.mob-menu');
const mobMenuToggle = document.querySelector('.mob-menu__toggle');

headerToggle.addEventListener('click', () => {
  mobMenu.classList.add('mob-menu_active');
  body.style.overflow = 'hidden';
});

mobMenuToggle.addEventListener('click', () => {
  mobMenu.classList.remove('mob-menu_active');
  body.style.overflow = 'auto';
});

mobMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('mob-menu_active')) {
    e.currentTarget.classList.remove('mob-menu_active');
    body.style.overflow = 'auto';
  }
});