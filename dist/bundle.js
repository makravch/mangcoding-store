/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/scripts/swiper.js
class Swiper {
  constructor(selector) {
    this.carousel = document.querySelector(selector);
    this.carouselInner = this.carousel.querySelector('.carousel__inner');
    this.carouselContainer = this.carousel.querySelector('.carousel__container');
    this.carouselItems = this.carousel.querySelectorAll('.carousel__item');
    this.carouselBtnPrev = this.carousel.querySelector('.carousel__btn_prev');
    this.carouselBtnNext = this.carousel.querySelector('.carousel__btn_next');
    
    this.xTouchLast = null;
    this.isSliding = false;

    this.setPositions();
    this.initEvents();
    this.handleActiveSlides();

    window.addEventListener('resize', () => {
      this.setPositions();
      this.handleActiveSlides();
    });
  }

  setPositions() {
    this.carouselInnerPosition = this.carouselInner.getBoundingClientRect();
    this.carouselContainerPosition = this.carouselContainer.getBoundingClientRect();
    this.position = this.carouselContainerPosition.left - this.carouselInnerPosition.left;
    this.lastItemPosition = this.carouselItems[this.carouselItems.length - 1].getBoundingClientRect();
  }

  initEvents() {
    this.handleBtnPrevClick = this.handleBtnPrevClick.bind(this);
    this.handleBtnNextClick = this.handleBtnNextClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.carouselBtnPrev.addEventListener('click', this.handleBtnPrevClick);
    this.carouselBtnNext.addEventListener('click', this.handleBtnNextClick);
    this.carouselContainer.addEventListener('transitionend', this.handleTransitionEnd);
    this.carousel.addEventListener('touchstart', this.handleTouchStart);
    this.carousel.addEventListener('touchmove', this.handleTouchMove);
    this.carousel.addEventListener('touchend', this.handleTouchEnd);
  }

  handleActiveSlides() {
    this.carouselItems.forEach(item => {
      const itemPosition = item.getBoundingClientRect();
      const flagLeft = (itemPosition.left < this.carouselInnerPosition.left) && (itemPosition.right < this.carouselInnerPosition.left);
      const flagRight = (itemPosition.left > this.carouselInnerPosition.right) && (itemPosition.right > this.carouselInnerPosition.right);
      
      if (!flagLeft && !flagRight) {
        item.classList.add('carousel__item_active');
      } else {
        item.classList.remove('carousel__item_active');
      }
    });
  }

  changePosition(position) {
    this.carouselContainer.style.transform = `translate3d(${position}px, 0px, 0px)`;
    this.setPositions();
  }

  changePositionWithTransition(position) {
    this.isSliding = true;
    this.carouselContainer.classList.add('carousel__container_transition');
    this.carouselContainer.style.transform = `translate3d(${position}px, 0px, 0px)`;
  }

  handleTransitionEnd() {
    this.carouselContainer.classList.remove('carousel__container_transition');
    this.isSliding = false;

    this.setPositions();
    this.handleActiveSlides();
  }

  handleBtnPrevClick() {
    if (this.isSliding) {
      return;
    }

    let position = this.position;
    const activeElements = this.carousel.querySelectorAll('.carousel__item_active');
    const prevItem = activeElements[0].previousElementSibling;
    const firstActivePosition = activeElements[0].getBoundingClientRect();
    const prevItemPosition = prevItem && prevItem.getBoundingClientRect();

    if (prevItem) {
      position += this.carouselInnerPosition.left - prevItemPosition.left;
    } else if (firstActivePosition.left < this.carouselInnerPosition.left) {
      position += this.carouselInnerPosition.left - firstActivePosition.left;
    } else {
      return;
    }

    this.changePositionWithTransition(position);
  }

  handleBtnNextClick() {
    if (this.isSliding) {
      return;
    }

    let position = this.position;
    const activeElements = this.carousel.querySelectorAll('.carousel__item_active');
    const nextItem = activeElements[activeElements.length - 1].nextElementSibling;
    const lastActivePosition = activeElements[activeElements.length - 1].getBoundingClientRect();
    const nextItemPosition = nextItem && nextItem.getBoundingClientRect();

    if (nextItem) {
      position -= nextItemPosition.right - this.carouselInnerPosition.right;
    } else if (lastActivePosition.right > this.carouselInnerPosition.right) {
      position -= lastActivePosition.right - this.carouselInnerPosition.right;
    } else {
      return;
    }

    this.changePositionWithTransition(position);
  }

  handleTouchStart(e) {
    if (this.isSliding) {
      this.carouselContainer.classList.remove('carousel__container_transition');
      this.setPositions();
      this.handleActiveSlides();
    }

    this.isSliding = false;
    this.xTouchLast = e.touches[0].clientX;
  }

  handleTouchMove(e) {
    if (!this.xTouchLast) {
      return;
    }
    
    const position = this.position;
    const xDiff = this.xTouchLast - e.touches[0].clientX;

    this.xTouchLast = e.touches[0].clientX;
    this.changePosition(position - xDiff);
  }

  handleTouchEnd() {
    let position = this.position;
    this.xTouchLast = null;

    if (this.carouselInnerPosition.left - this.carouselContainerPosition.left < 0) {
      position = 0;
      this.changePositionWithTransition(position);
    } else if (this.carouselInnerPosition.right - this.lastItemPosition.right > 0) {
      position += this.carouselInnerPosition.right - this.lastItemPosition.right;
      this.changePositionWithTransition(position);
    } else {
      this.handleActiveSlides();
    }
  }
}

/* harmony default export */ const swiper = (Swiper);
;// CONCATENATED MODULE: ./src/index.js



const _carousel = new swiper('.carousel');

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
/******/ })()
;