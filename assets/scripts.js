"use strict";

var $accordionTitles;
document.addEventListener('DOMContentLoaded', function () {
  $accordionTitles = document.querySelectorAll('.ddb-accordion dt');
  $accordionTitles.forEach(function (v, i, a) {
    v.addEventListener('click', function (evt) {
      v.classList.toggle('ddb-accordion--active');
    });
  });
});
var $blackoutLayer;
var blackoutTimer;
var isBlackoutOpen;

function blackoutOpen() {
  $blackoutLayer.style.display = 'block';
  clearTimeout(blackoutTimer);
  blackoutTimer = setTimeout(function () {
    $blackoutLayer.classList.add('ddb-blackout--visible');
  }, 0);
  isBlackoutOpen = true;
}

function blackoutClose() {
  $blackoutLayer.classList.remove('ddb-blackout--visible');
  clearTimeout(blackoutTimer);
  blackoutTimer = setTimeout(function () {
    $blackoutLayer.style.display = 'none';
  }, 500);
  isBlackoutOpen = false;
}

document.addEventListener('DOMContentLoaded', function () {
  $blackoutLayer = document.querySelector('.ddb-blackout');
  $blackoutLayer.addEventListener('click', function (evt) {
    blackoutClose();
  });
});
var $menuTrigger;
var $menuWrapper;
var $menuBody;
var $menuClose;
var isMenuOpen;
var menuTimer;
var scrollTimer;

function menuClose() {
  $menuBody.classList.remove('ddb-nav__menu--visible');
  clearTimeout(modalTimer);
  menuTimer = setTimeout(function () {
    $menuWrapper.style.zIndex = null;
  }, 500);
  isMenuOpen = false;
}

function menuOpen() {
  $menuBody.classList.add('ddb-nav__menu--visible');
  $menuWrapper.style.zIndex = '200';
  isMenuOpen = true;
}

document.addEventListener('DOMContentLoaded', function () {
  $menuWrapper = document.querySelector('.ddb-nav');
  $menuTrigger = document.querySelector('.ddb-nav__hamburger');
  $menuBody = document.querySelector('.ddb-nav__menu');
  $menuClose = $menuBody.querySelector('.ddb-nav__menu__close');
  $menuTrigger.addEventListener('click', function (evt) {
    if (!isBlackoutOpen) blackoutOpen();
    menuOpen();
  });
  $menuClose.addEventListener('click', function (evt) {
    menuClose();
    if (isBlackoutOpen) blackoutClose();
  });
  $blackoutLayer.addEventListener('click', function (evt) {
    menuClose();
  });
  window.addEventListener('scroll', function (evt) {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      if (window.pageYOffset > 100) {
        $menuWrapper.classList.add('ddb-nav--fixed'); // $menuWrapper.style.transform = `translateY(${window.pageYOffset}px)`
        // document.body.style.paddingTop = $menuWrapper.getBoundingClientRect().height + 'px'

        document.body.style.paddingTop = $menuWrapper.getBoundingClientRect().height + 'px';
      } else {
        $menuWrapper.classList.remove('ddb-nav--fixed'); // $menuWrapper.style.transform = 'translateY(0)'

        document.body.style.paddingTop = 0;
      }
    }, 100);
  });
});
var $modalTriggers;
var $modals;
var modalTimer;
var isModalOpen;

function modalClose($m) {
  $m.classList.remove('ddb-modal--visible');
  clearTimeout(modalTimer);
  modalTimer = setTimeout(function () {
    $m.style.zIndex = null;
  }, 500);
  isModalOpen = false;
}

function modalOpen($m) {
  $m.classList.add('ddb-modal--visible');
  $m.style.zIndex = '200';
  isModalOpen = true;
}

document.addEventListener('DOMContentLoaded', function () {
  $modalTriggers = document.querySelectorAll('[ddb-modal]');
  $modals = document.querySelectorAll('.ddb-modal');
  $modalTriggers.forEach(function (v, i, a) {
    v.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalOpen(document.getElementById(v.getAttribute('ddb-modal')));
      if (isMenuOpen) menuClose();
      if (!isBlackoutOpen) blackoutOpen();
    });
  });
  $modals.forEach(function (v, i, a) {
    var $modalClose = v.querySelector('.ddb-modal__close');
    $modalClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalClose(v);
      if (isBlackoutOpen) blackoutClose();
    });
  });
  $blackoutLayer.addEventListener('click', function (evt) {
    evt.preventDefault();
    $modals.forEach(function (v, i, a) {
      v.classList.remove('ddb-modal--visible');
      clearTimeout(modalTimer);
      modalTimer = setTimeout(function () {
        v.style.zIndex = null;
      }, 500);
    });
  });
});
var $stories;
document.addEventListener('DOMContentLoaded', function () {
  $stories = document.querySelectorAll('.ddb-stories');
  $stories.forEach(function (v, i, a) {
    var $storiesWrapper = v.querySelector('.ddb-stories__wrapper');
    var $storiesImgs = v.querySelectorAll('.ddb-stories__slide');
    var $storiesNext = v.querySelector('.ddb-stories__next');
    var $storiesPrev = v.querySelector('.ddb-stories__prev');
    var currentStory = 0;

    function updateStories() {
      $storiesImgs.forEach(function (v, i, a) {
        if (v.classList.contains('ddb-stories__slide--active')) {
          v.classList.remove('ddb-stories__slide--active');
          v.classList.add('ddb-stories__slide--last-active');
        } else if (i == currentStory) {
          v.classList.remove('ddb-stories__slide--last-active');
          v.classList.add('ddb-stories__slide--active');
        } else {
          v.classList.remove('ddb-stories__slide--last-active');
          v.classList.remove('ddb-stories__slide--active');
        }
      });
    }

    updateStories();
    $storiesNext.addEventListener('click', function (evt) {
      v.classList.remove('ddb-stories--backwards');
      if (currentStory >= $storiesImgs.length - 1) currentStory = 0;else currentStory++;
      updateStories();
    });
    $storiesPrev.addEventListener('click', function (evt) {
      v.classList.add('ddb-stories--backwards');
      if (currentStory <= 0) currentStory = $storiesImgs.length - 1;else currentStory--;
      updateStories();
    });
  });
});
var $tabs;
document.addEventListener('DOMContentLoaded', function () {
  $tabs = document.querySelectorAll('.ddb-tabs');
  $tabs.forEach(function (v, i, a) {
    var currentTab = 0;
    var $tabsButtons = v.querySelectorAll('.ddb-tabs__tab');
    var $tabsContent = v.querySelectorAll('.ddb-tabs__content');

    function updateTabs() {
      $tabsButtons.forEach(function (vv, ii, aa) {
        if (ii == currentTab) {
          vv.classList.add('ddb-tabs__tab--active');
        } else {
          vv.classList.remove('ddb-tabs__tab--active');
        }
      });
      $tabsContent.forEach(function (vv, ii, aa) {
        if (ii == currentTab) {
          vv.classList.add('ddb-tabs__content--active');
        } else {
          vv.classList.remove('ddb-tabs__content--active');
        }
      });
    }

    $tabsButtons.forEach(function (vv, ii, aa) {
      vv.addEventListener('click', function () {
        currentTab = ii;
        updateTabs();
      });
    });
    updateTabs();
  });
});