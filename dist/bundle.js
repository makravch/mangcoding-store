/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/swiper.js":
/*!*******************************!*\
  !*** ./src/scripts/swiper.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Swiper);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.scss */ "./src/styles/style.scss");
/* harmony import */ var _scripts_swiper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/swiper.js */ "./src/scripts/swiper.js");



const _carousel = new _scripts_swiper_js__WEBPACK_IMPORTED_MODULE_1__["default"]('.carousel');

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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxTQUFTO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxTQUFTO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLE1BQU07Ozs7OztVQ2pLckI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONkI7QUFDWTtBQUN6QztBQUNBLHNCQUFzQiwwREFBTTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFuZ2NvZGluZy1zdG9yZS8uL3NyYy9zdHlsZXMvc3R5bGUuc2Nzcz9hNWI0Iiwid2VicGFjazovL21hbmdjb2Rpbmctc3RvcmUvLi9zcmMvc2NyaXB0cy9zd2lwZXIuanMiLCJ3ZWJwYWNrOi8vbWFuZ2NvZGluZy1zdG9yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYW5nY29kaW5nLXN0b3JlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYW5nY29kaW5nLXN0b3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFuZ2NvZGluZy1zdG9yZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21hbmdjb2Rpbmctc3RvcmUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY2xhc3MgU3dpcGVyIHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xyXG4gICAgdGhpcy5jYXJvdXNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgdGhpcy5jYXJvdXNlbElubmVyID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWxfX2lubmVyJyk7XHJcbiAgICB0aGlzLmNhcm91c2VsQ29udGFpbmVyID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWxfX2NvbnRhaW5lcicpO1xyXG4gICAgdGhpcy5jYXJvdXNlbEl0ZW1zID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWxfX2l0ZW0nKTtcclxuICAgIHRoaXMuY2Fyb3VzZWxCdG5QcmV2ID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWxfX2J0bl9wcmV2Jyk7XHJcbiAgICB0aGlzLmNhcm91c2VsQnRuTmV4dCA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcignLmNhcm91c2VsX19idG5fbmV4dCcpO1xyXG4gICAgXHJcbiAgICB0aGlzLnhUb3VjaExhc3QgPSBudWxsO1xyXG4gICAgdGhpcy5pc1NsaWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldFBvc2l0aW9ucygpO1xyXG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgICB0aGlzLmhhbmRsZUFjdGl2ZVNsaWRlcygpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0UG9zaXRpb25zKCk7XHJcbiAgICAgIHRoaXMuaGFuZGxlQWN0aXZlU2xpZGVzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFBvc2l0aW9ucygpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxJbm5lclBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbElubmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgdGhpcy5jYXJvdXNlbENvbnRhaW5lclBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmNhcm91c2VsQ29udGFpbmVyUG9zaXRpb24ubGVmdCAtIHRoaXMuY2Fyb3VzZWxJbm5lclBvc2l0aW9uLmxlZnQ7XHJcbiAgICB0aGlzLmxhc3RJdGVtUG9zaXRpb24gPSB0aGlzLmNhcm91c2VsSXRlbXNbdGhpcy5jYXJvdXNlbEl0ZW1zLmxlbmd0aCAtIDFdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdEV2ZW50cygpIHtcclxuICAgIHRoaXMuaGFuZGxlQnRuUHJldkNsaWNrID0gdGhpcy5oYW5kbGVCdG5QcmV2Q2xpY2suYmluZCh0aGlzKTtcclxuICAgIHRoaXMuaGFuZGxlQnRuTmV4dENsaWNrID0gdGhpcy5oYW5kbGVCdG5OZXh0Q2xpY2suYmluZCh0aGlzKTtcclxuICAgIHRoaXMuaGFuZGxlVHJhbnNpdGlvbkVuZCA9IHRoaXMuaGFuZGxlVHJhbnNpdGlvbkVuZC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0ID0gdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmhhbmRsZVRvdWNoTW92ZSA9IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmhhbmRsZVRvdWNoRW5kID0gdGhpcy5oYW5kbGVUb3VjaEVuZC5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxCdG5QcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVCdG5QcmV2Q2xpY2spO1xyXG4gICAgdGhpcy5jYXJvdXNlbEJ0bk5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUJ0bk5leHRDbGljayk7XHJcbiAgICB0aGlzLmNhcm91c2VsQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmQpO1xyXG4gICAgdGhpcy5jYXJvdXNlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcclxuICAgIHRoaXMuY2Fyb3VzZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xyXG4gICAgdGhpcy5jYXJvdXNlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlVG91Y2hFbmQpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlQWN0aXZlU2xpZGVzKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGNvbnN0IGl0ZW1Qb3NpdGlvbiA9IGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGNvbnN0IGZsYWdMZWZ0ID0gKGl0ZW1Qb3NpdGlvbi5sZWZ0IDwgdGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24ubGVmdCkgJiYgKGl0ZW1Qb3NpdGlvbi5yaWdodCA8IHRoaXMuY2Fyb3VzZWxJbm5lclBvc2l0aW9uLmxlZnQpO1xyXG4gICAgICBjb25zdCBmbGFnUmlnaHQgPSAoaXRlbVBvc2l0aW9uLmxlZnQgPiB0aGlzLmNhcm91c2VsSW5uZXJQb3NpdGlvbi5yaWdodCkgJiYgKGl0ZW1Qb3NpdGlvbi5yaWdodCA+IHRoaXMuY2Fyb3VzZWxJbm5lclBvc2l0aW9uLnJpZ2h0KTtcclxuICAgICAgXHJcbiAgICAgIGlmICghZmxhZ0xlZnQgJiYgIWZsYWdSaWdodCkge1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnY2Fyb3VzZWxfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjYXJvdXNlbF9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VQb3NpdGlvbihwb3NpdGlvbikge1xyXG4gICAgdGhpcy5jYXJvdXNlbENvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtwb3NpdGlvbn1weCwgMHB4LCAwcHgpYDtcclxuICAgIHRoaXMuc2V0UG9zaXRpb25zKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VQb3NpdGlvbldpdGhUcmFuc2l0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICB0aGlzLmlzU2xpZGluZyA9IHRydWU7XHJcbiAgICB0aGlzLmNhcm91c2VsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Nhcm91c2VsX19jb250YWluZXJfdHJhbnNpdGlvbicpO1xyXG4gICAgdGhpcy5jYXJvdXNlbENvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtwb3NpdGlvbn1weCwgMHB4LCAwcHgpYDtcclxuICB9XHJcblxyXG4gIGhhbmRsZVRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhcm91c2VsX19jb250YWluZXJfdHJhbnNpdGlvbicpO1xyXG4gICAgdGhpcy5pc1NsaWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNldFBvc2l0aW9ucygpO1xyXG4gICAgdGhpcy5oYW5kbGVBY3RpdmVTbGlkZXMoKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUJ0blByZXZDbGljaygpIHtcclxuICAgIGlmICh0aGlzLmlzU2xpZGluZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnRzID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWxfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICBjb25zdCBwcmV2SXRlbSA9IGFjdGl2ZUVsZW1lbnRzWzBdLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICBjb25zdCBmaXJzdEFjdGl2ZVBvc2l0aW9uID0gYWN0aXZlRWxlbWVudHNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCBwcmV2SXRlbVBvc2l0aW9uID0gcHJldkl0ZW0gJiYgcHJldkl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgaWYgKHByZXZJdGVtKSB7XHJcbiAgICAgIHBvc2l0aW9uICs9IHRoaXMuY2Fyb3VzZWxJbm5lclBvc2l0aW9uLmxlZnQgLSBwcmV2SXRlbVBvc2l0aW9uLmxlZnQ7XHJcbiAgICB9IGVsc2UgaWYgKGZpcnN0QWN0aXZlUG9zaXRpb24ubGVmdCA8IHRoaXMuY2Fyb3VzZWxJbm5lclBvc2l0aW9uLmxlZnQpIHtcclxuICAgICAgcG9zaXRpb24gKz0gdGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24ubGVmdCAtIGZpcnN0QWN0aXZlUG9zaXRpb24ubGVmdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoYW5nZVBvc2l0aW9uV2l0aFRyYW5zaXRpb24ocG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlQnRuTmV4dENsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMuaXNTbGlkaW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xyXG4gICAgY29uc3QgYWN0aXZlRWxlbWVudHMgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbF9faXRlbV9hY3RpdmUnKTtcclxuICAgIGNvbnN0IG5leHRJdGVtID0gYWN0aXZlRWxlbWVudHNbYWN0aXZlRWxlbWVudHMubGVuZ3RoIC0gMV0ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgY29uc3QgbGFzdEFjdGl2ZVBvc2l0aW9uID0gYWN0aXZlRWxlbWVudHNbYWN0aXZlRWxlbWVudHMubGVuZ3RoIC0gMV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCBuZXh0SXRlbVBvc2l0aW9uID0gbmV4dEl0ZW0gJiYgbmV4dEl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgaWYgKG5leHRJdGVtKSB7XHJcbiAgICAgIHBvc2l0aW9uIC09IG5leHRJdGVtUG9zaXRpb24ucmlnaHQgLSB0aGlzLmNhcm91c2VsSW5uZXJQb3NpdGlvbi5yaWdodDtcclxuICAgIH0gZWxzZSBpZiAobGFzdEFjdGl2ZVBvc2l0aW9uLnJpZ2h0ID4gdGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24ucmlnaHQpIHtcclxuICAgICAgcG9zaXRpb24gLT0gbGFzdEFjdGl2ZVBvc2l0aW9uLnJpZ2h0IC0gdGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24ucmlnaHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VQb3NpdGlvbldpdGhUcmFuc2l0aW9uKHBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVRvdWNoU3RhcnQoZSkge1xyXG4gICAgaWYgKHRoaXMuaXNTbGlkaW5nKSB7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnY2Fyb3VzZWxfX2NvbnRhaW5lcl90cmFuc2l0aW9uJyk7XHJcbiAgICAgIHRoaXMuc2V0UG9zaXRpb25zKCk7XHJcbiAgICAgIHRoaXMuaGFuZGxlQWN0aXZlU2xpZGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc1NsaWRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMueFRvdWNoTGFzdCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlVG91Y2hNb3ZlKGUpIHtcclxuICAgIGlmICghdGhpcy54VG91Y2hMYXN0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xyXG4gICAgY29uc3QgeERpZmYgPSB0aGlzLnhUb3VjaExhc3QgLSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcclxuXHJcbiAgICB0aGlzLnhUb3VjaExhc3QgPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgIHRoaXMuY2hhbmdlUG9zaXRpb24ocG9zaXRpb24gLSB4RGlmZik7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVUb3VjaEVuZCgpIHtcclxuICAgIGxldCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XHJcbiAgICB0aGlzLnhUb3VjaExhc3QgPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLmNhcm91c2VsSW5uZXJQb3NpdGlvbi5sZWZ0IC0gdGhpcy5jYXJvdXNlbENvbnRhaW5lclBvc2l0aW9uLmxlZnQgPCAwKSB7XHJcbiAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgdGhpcy5jaGFuZ2VQb3NpdGlvbldpdGhUcmFuc2l0aW9uKHBvc2l0aW9uKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24ucmlnaHQgLSB0aGlzLmxhc3RJdGVtUG9zaXRpb24ucmlnaHQgPiAwKSB7XHJcbiAgICAgIHBvc2l0aW9uICs9IHRoaXMuY2Fyb3VzZWxJbm5lclBvc2l0aW9uLnJpZ2h0IC0gdGhpcy5sYXN0SXRlbVBvc2l0aW9uLnJpZ2h0O1xyXG4gICAgICB0aGlzLmNoYW5nZVBvc2l0aW9uV2l0aFRyYW5zaXRpb24ocG9zaXRpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oYW5kbGVBY3RpdmVTbGlkZXMoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN3aXBlcjsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZXMvc3R5bGUuc2Nzcyc7XHJcbmltcG9ydCBTd2lwZXIgZnJvbSAnLi9zY3JpcHRzL3N3aXBlci5qcyc7XHJcblxyXG5jb25zdCBfY2Fyb3VzZWwgPSBuZXcgU3dpcGVyKCcuY2Fyb3VzZWwnKTtcclxuXHJcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbmNvbnN0IGhlYWRlclRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3RvZ2dsZScpO1xyXG5jb25zdCBtb2JNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYi1tZW51Jyk7XHJcbmNvbnN0IG1vYk1lbnVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9iLW1lbnVfX3RvZ2dsZScpO1xyXG5cclxuaGVhZGVyVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1vYk1lbnUuY2xhc3NMaXN0LmFkZCgnbW9iLW1lbnVfYWN0aXZlJyk7XHJcbiAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG59KTtcclxuXHJcbm1vYk1lbnVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbW9iTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdtb2ItbWVudV9hY3RpdmUnKTtcclxuICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xyXG59KTtcclxuXHJcbm1vYk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vYi1tZW51X2FjdGl2ZScpKSB7XHJcbiAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbW9iLW1lbnVfYWN0aXZlJyk7XHJcbiAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xyXG4gIH1cclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9