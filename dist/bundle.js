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
		
		let position = this.position;
		const xDiff = this.xTouchLast - e.touches[0].clientX;

		if (xDiff > 0) {
			position -= 5;
		} else {
			position += 5;
		}

		this.xTouchLast = e.touches[0].clientX;
		this.changePosition(position);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxTQUFTO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxTQUFTO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsTUFBTTs7Ozs7O1VDdktyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ042QjtBQUNZO0FBQ3pDO0FBQ0Esc0JBQXNCLDBEQUFNO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5nY29kaW5nLXN0b3JlLy4vc3JjL3N0eWxlcy9zdHlsZS5zY3NzP2E1YjQiLCJ3ZWJwYWNrOi8vbWFuZ2NvZGluZy1zdG9yZS8uL3NyYy9zY3JpcHRzL3N3aXBlci5qcyIsIndlYnBhY2s6Ly9tYW5nY29kaW5nLXN0b3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21hbmdjb2Rpbmctc3RvcmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hbmdjb2Rpbmctc3RvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYW5nY29kaW5nLXN0b3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFuZ2NvZGluZy1zdG9yZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJjbGFzcyBTd2lwZXIge1xyXG5cdGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcblx0XHR0aGlzLmNhcm91c2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcblx0XHR0aGlzLmNhcm91c2VsSW5uZXIgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbF9faW5uZXInKTtcclxuXHRcdHRoaXMuY2Fyb3VzZWxDb250YWluZXIgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbF9fY29udGFpbmVyJyk7XHJcblx0XHR0aGlzLmNhcm91c2VsSXRlbXMgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbF9faXRlbScpO1xyXG5cdFx0dGhpcy5jYXJvdXNlbEJ0blByZXYgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbF9fYnRuX3ByZXYnKTtcclxuXHRcdHRoaXMuY2Fyb3VzZWxCdG5OZXh0ID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWxfX2J0bl9uZXh0Jyk7XHJcblx0XHRcclxuXHRcdHRoaXMueFRvdWNoTGFzdCA9IG51bGw7XHJcblx0XHR0aGlzLmlzU2xpZGluZyA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuc2V0UG9zaXRpb25zKCk7XHJcblx0XHR0aGlzLmluaXRFdmVudHMoKTtcclxuXHRcdHRoaXMuaGFuZGxlQWN0aXZlU2xpZGVzKCk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuXHRcdFx0dGhpcy5zZXRQb3NpdGlvbnMoKTtcclxuXHRcdFx0dGhpcy5oYW5kbGVBY3RpdmVTbGlkZXMoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0c2V0UG9zaXRpb25zKCkge1xyXG5cdFx0dGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24gPSB0aGlzLmNhcm91c2VsSW5uZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHR0aGlzLmNhcm91c2VsQ29udGFpbmVyUG9zaXRpb24gPSB0aGlzLmNhcm91c2VsQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0dGhpcy5wb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxDb250YWluZXJQb3NpdGlvbi5sZWZ0IC0gdGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24ubGVmdDtcclxuXHRcdHRoaXMubGFzdEl0ZW1Qb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxJdGVtc1t0aGlzLmNhcm91c2VsSXRlbXMubGVuZ3RoIC0gMV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0fVxyXG5cclxuXHRpbml0RXZlbnRzKCkge1xyXG5cdFx0dGhpcy5oYW5kbGVCdG5QcmV2Q2xpY2sgPSB0aGlzLmhhbmRsZUJ0blByZXZDbGljay5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5oYW5kbGVCdG5OZXh0Q2xpY2sgPSB0aGlzLmhhbmRsZUJ0bk5leHRDbGljay5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5oYW5kbGVUcmFuc2l0aW9uRW5kID0gdGhpcy5oYW5kbGVUcmFuc2l0aW9uRW5kLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmhhbmRsZVRvdWNoU3RhcnQgPSB0aGlzLmhhbmRsZVRvdWNoU3RhcnQuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuaGFuZGxlVG91Y2hNb3ZlID0gdGhpcy5oYW5kbGVUb3VjaE1vdmUuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuaGFuZGxlVG91Y2hFbmQgPSB0aGlzLmhhbmRsZVRvdWNoRW5kLmJpbmQodGhpcyk7XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbEJ0blByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUJ0blByZXZDbGljayk7XHJcblx0XHR0aGlzLmNhcm91c2VsQnRuTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQnRuTmV4dENsaWNrKTtcclxuXHRcdHRoaXMuY2Fyb3VzZWxDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMuaGFuZGxlVHJhbnNpdGlvbkVuZCk7XHJcblx0XHR0aGlzLmNhcm91c2VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xyXG5cdFx0dGhpcy5jYXJvdXNlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XHJcblx0XHR0aGlzLmNhcm91c2VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVUb3VjaEVuZCk7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVBY3RpdmVTbGlkZXMoKSB7XHJcblx0XHR0aGlzLmNhcm91c2VsSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0Y29uc3QgaXRlbVBvc2l0aW9uID0gaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdFx0Y29uc3QgZmxhZ0xlZnQgPSAoaXRlbVBvc2l0aW9uLmxlZnQgPCB0aGlzLmNhcm91c2VsSW5uZXJQb3NpdGlvbi5sZWZ0KSAmJiAoaXRlbVBvc2l0aW9uLnJpZ2h0IDwgdGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24ubGVmdCk7XHJcblx0XHRcdGNvbnN0IGZsYWdSaWdodCA9IChpdGVtUG9zaXRpb24ubGVmdCA+IHRoaXMuY2Fyb3VzZWxJbm5lclBvc2l0aW9uLnJpZ2h0KSAmJiAoaXRlbVBvc2l0aW9uLnJpZ2h0ID4gdGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24ucmlnaHQpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKCFmbGFnTGVmdCAmJiAhZmxhZ1JpZ2h0KSB7XHJcblx0XHRcdFx0aXRlbS5jbGFzc0xpc3QuYWRkKCdjYXJvdXNlbF9faXRlbV9hY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhcm91c2VsX19pdGVtX2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNoYW5nZVBvc2l0aW9uKHBvc2l0aW9uKSB7XHJcblx0XHR0aGlzLmNhcm91c2VsQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3Bvc2l0aW9ufXB4LCAwcHgsIDBweClgO1xyXG5cdFx0dGhpcy5zZXRQb3NpdGlvbnMoKTtcclxuXHR9XHJcblxyXG5cdGNoYW5nZVBvc2l0aW9uV2l0aFRyYW5zaXRpb24ocG9zaXRpb24pIHtcclxuXHRcdHRoaXMuaXNTbGlkaW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuY2Fyb3VzZWxDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY2Fyb3VzZWxfX2NvbnRhaW5lcl90cmFuc2l0aW9uJyk7XHJcblx0XHR0aGlzLmNhcm91c2VsQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3Bvc2l0aW9ufXB4LCAwcHgsIDBweClgO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlVHJhbnNpdGlvbkVuZCgpIHtcclxuXHRcdHRoaXMuY2Fyb3VzZWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnY2Fyb3VzZWxfX2NvbnRhaW5lcl90cmFuc2l0aW9uJyk7XHJcblx0XHR0aGlzLmlzU2xpZGluZyA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuc2V0UG9zaXRpb25zKCk7XHJcblx0XHR0aGlzLmhhbmRsZUFjdGl2ZVNsaWRlcygpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlQnRuUHJldkNsaWNrKCkge1xyXG5cdFx0aWYgKHRoaXMuaXNTbGlkaW5nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xyXG5cdFx0Y29uc3QgYWN0aXZlRWxlbWVudHMgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbF9faXRlbV9hY3RpdmUnKTtcclxuXHRcdGNvbnN0IHByZXZJdGVtID0gYWN0aXZlRWxlbWVudHNbMF0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuXHRcdGNvbnN0IGZpcnN0QWN0aXZlUG9zaXRpb24gPSBhY3RpdmVFbGVtZW50c1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdGNvbnN0IHByZXZJdGVtUG9zaXRpb24gPSBwcmV2SXRlbSAmJiBwcmV2SXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRpZiAocHJldkl0ZW0pIHtcclxuXHRcdFx0cG9zaXRpb24gKz0gdGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24ubGVmdCAtIHByZXZJdGVtUG9zaXRpb24ubGVmdDtcclxuXHRcdH0gZWxzZSBpZiAoZmlyc3RBY3RpdmVQb3NpdGlvbi5sZWZ0IDwgdGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24ubGVmdCkge1xyXG5cdFx0XHRwb3NpdGlvbiArPSB0aGlzLmNhcm91c2VsSW5uZXJQb3NpdGlvbi5sZWZ0IC0gZmlyc3RBY3RpdmVQb3NpdGlvbi5sZWZ0O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2hhbmdlUG9zaXRpb25XaXRoVHJhbnNpdGlvbihwb3NpdGlvbik7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVCdG5OZXh0Q2xpY2soKSB7XHJcblx0XHRpZiAodGhpcy5pc1NsaWRpbmcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XHJcblx0XHRjb25zdCBhY3RpdmVFbGVtZW50cyA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvckFsbCgnLmNhcm91c2VsX19pdGVtX2FjdGl2ZScpO1xyXG5cdFx0Y29uc3QgbmV4dEl0ZW0gPSBhY3RpdmVFbGVtZW50c1thY3RpdmVFbGVtZW50cy5sZW5ndGggLSAxXS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcblx0XHRjb25zdCBsYXN0QWN0aXZlUG9zaXRpb24gPSBhY3RpdmVFbGVtZW50c1thY3RpdmVFbGVtZW50cy5sZW5ndGggLSAxXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdGNvbnN0IG5leHRJdGVtUG9zaXRpb24gPSBuZXh0SXRlbSAmJiBuZXh0SXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRpZiAobmV4dEl0ZW0pIHtcclxuXHRcdFx0cG9zaXRpb24gLT0gbmV4dEl0ZW1Qb3NpdGlvbi5yaWdodCAtIHRoaXMuY2Fyb3VzZWxJbm5lclBvc2l0aW9uLnJpZ2h0O1xyXG5cdFx0fSBlbHNlIGlmIChsYXN0QWN0aXZlUG9zaXRpb24ucmlnaHQgPiB0aGlzLmNhcm91c2VsSW5uZXJQb3NpdGlvbi5yaWdodCkge1xyXG5cdFx0XHRwb3NpdGlvbiAtPSBsYXN0QWN0aXZlUG9zaXRpb24ucmlnaHQgLSB0aGlzLmNhcm91c2VsSW5uZXJQb3NpdGlvbi5yaWdodDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNoYW5nZVBvc2l0aW9uV2l0aFRyYW5zaXRpb24ocG9zaXRpb24pO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlVG91Y2hTdGFydChlKSB7XHJcblx0XHRpZiAodGhpcy5pc1NsaWRpbmcpIHtcclxuXHRcdFx0dGhpcy5jYXJvdXNlbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdjYXJvdXNlbF9fY29udGFpbmVyX3RyYW5zaXRpb24nKTtcclxuXHRcdFx0dGhpcy5zZXRQb3NpdGlvbnMoKTtcclxuXHRcdFx0dGhpcy5oYW5kbGVBY3RpdmVTbGlkZXMoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmlzU2xpZGluZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy54VG91Y2hMYXN0ID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVUb3VjaE1vdmUoZSkge1xyXG5cdFx0aWYgKCF0aGlzLnhUb3VjaExhc3QpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRsZXQgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xyXG5cdFx0Y29uc3QgeERpZmYgPSB0aGlzLnhUb3VjaExhc3QgLSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcclxuXHJcblx0XHRpZiAoeERpZmYgPiAwKSB7XHJcblx0XHRcdHBvc2l0aW9uIC09IDU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwb3NpdGlvbiArPSA1O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMueFRvdWNoTGFzdCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xyXG5cdFx0dGhpcy5jaGFuZ2VQb3NpdGlvbihwb3NpdGlvbik7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVUb3VjaEVuZCgpIHtcclxuXHRcdGxldCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XHJcblx0XHR0aGlzLnhUb3VjaExhc3QgPSBudWxsO1xyXG5cclxuXHRcdGlmICh0aGlzLmNhcm91c2VsSW5uZXJQb3NpdGlvbi5sZWZ0IC0gdGhpcy5jYXJvdXNlbENvbnRhaW5lclBvc2l0aW9uLmxlZnQgPCAwKSB7XHJcblx0XHRcdHBvc2l0aW9uID0gMDtcclxuXHRcdFx0dGhpcy5jaGFuZ2VQb3NpdGlvbldpdGhUcmFuc2l0aW9uKHBvc2l0aW9uKTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5jYXJvdXNlbElubmVyUG9zaXRpb24ucmlnaHQgLSB0aGlzLmxhc3RJdGVtUG9zaXRpb24ucmlnaHQgPiAwKSB7XHJcblx0XHRcdHBvc2l0aW9uICs9IHRoaXMuY2Fyb3VzZWxJbm5lclBvc2l0aW9uLnJpZ2h0IC0gdGhpcy5sYXN0SXRlbVBvc2l0aW9uLnJpZ2h0O1xyXG5cdFx0XHR0aGlzLmNoYW5nZVBvc2l0aW9uV2l0aFRyYW5zaXRpb24ocG9zaXRpb24pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5oYW5kbGVBY3RpdmVTbGlkZXMoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN3aXBlcjsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZXMvc3R5bGUuc2Nzcyc7XHJcbmltcG9ydCBTd2lwZXIgZnJvbSAnLi9zY3JpcHRzL3N3aXBlci5qcyc7XHJcblxyXG5jb25zdCBfY2Fyb3VzZWwgPSBuZXcgU3dpcGVyKCcuY2Fyb3VzZWwnKTtcclxuXHJcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbmNvbnN0IGhlYWRlclRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3RvZ2dsZScpO1xyXG5jb25zdCBtb2JNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYi1tZW51Jyk7XHJcbmNvbnN0IG1vYk1lbnVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9iLW1lbnVfX3RvZ2dsZScpO1xyXG5cclxuaGVhZGVyVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdG1vYk1lbnUuY2xhc3NMaXN0LmFkZCgnbW9iLW1lbnVfYWN0aXZlJyk7XHJcblx0Ym9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG59KTtcclxuXHJcbm1vYk1lbnVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblx0bW9iTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdtb2ItbWVudV9hY3RpdmUnKTtcclxuXHRib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xyXG59KTtcclxuXHJcbm1vYk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG5cdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vYi1tZW51X2FjdGl2ZScpKSB7XHJcblx0XHRlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbW9iLW1lbnVfYWN0aXZlJyk7XHJcblx0XHRib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xyXG5cdH1cclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9