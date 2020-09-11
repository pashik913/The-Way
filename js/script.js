'use strict';

var MIN_TEL_LENGTH = 10;
var MAX_TEL_LENGTH = 11;
var pageHeader = document.querySelector('.page-header');
var headerToggle = document.querySelector('.page-header__toggle');
var tabs = document.querySelector('.countrys');
var buttons = tabs.querySelectorAll('.countrys__tab-item');
var items = tabs.querySelectorAll('.countrys__item');
var modalButton = document.querySelectorAll('.modal-button');
var modal = document.querySelector('.modal');
var modalCloseButton = document.querySelector('.modal__close');
var overlay = document.createElement('div');

overlay.className = 'overlay';

pageHeader.classList.remove('page-header--nojs');

headerToggle.addEventListener('click', function () {
  if (pageHeader.classList.contains('page-header--closed')) {
    pageHeader.classList.remove('page-header--closed');
    pageHeader.classList.add('page-header--opened');
  } else {
    pageHeader.classList.add('page-header--closed');
    pageHeader.classList.remove('page-header--opened');
  }
});

function change(arr, i) {
  arr.forEach(function (item) {
    item.forEach(function (k) {
      k.classList.remove('is-active');
    });
    item[i].classList.add('is-active');
  });
}

var onTabClick = function onTabClick(i) {
  buttons[i].addEventListener('click', function () {
    change([buttons, items], i);
  });
};

for (var i = 0; i < buttons.length; i++) {
  onTabClick(i);
}

var onModalButtonClick = function () {
  if (modal.classList.contains('modal-show') === true) {
    modal.classList.remove('modal-show');
    document.body.removeChild(overlay);
  } else {
    document.body.appendChild(overlay);
    parent.className = 'overlay';
    modal.classList.add('modal-show');
  }

  if (storage) {
    tel.value = storage;
    email.focus();
  } else {
    tel.focus();
  }
};

for (var j = 0; j < modalButton.length; j++) {
  modalButton[j].addEventListener('click', function (evt) {
    evt.preventDefault();
    onModalButtonClick();
  });
}

overlay.addEventListener('click', function (evt) {
  evt.preventDefault();
  document.body.removeChild(overlay);
  modal.classList.remove('modal-show');
});

modalCloseButton.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (modal.classList.contains('modal-show')) {
    modal.classList.remove('modal-show');
    document.body.removeChild(overlay);
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modal.classList.contains('modal-show')) {
      modal.classList.remove('modal-show');
      modal.classList.remove('modal-error');
      popupSuccessClose.classList.remove('popup-succes-show');
      document.body.removeChild(overlay);
    }
  }
});

var form = modal.querySelector('.modal__form');
var tel = modal.querySelector('#modal-tel');
var email = modal.querySelector('#modal-email');
var popupSucces = document.querySelector('.popup-success');
var popupSuccessClose = document.querySelector('.popup-success__close');

var isStorageSupport = true;
var storage = '';

try {
  storage = localStorage.getItem('tel');
} catch (err) {
  isStorageSupport = false;
}

form.addEventListener('submit', function (evt) {
  popupSucces.classList.add('popup-success-show');

  if (!tel.value) {
    evt.preventDefault();
    modal.classList.remove('modal-error');
    modal.offsetWidth = modal.offsetWidth;
    modal.classList.add('modal-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('tel', tel.value);
    }
  }
});

tel.addEventListener('invalid', function () {
  if (tel.validity.valueMissing) {
    tel.setCustomValidity('Данные не верны');
  } else {
    tel.setCustomValidity('');
  }
});

tel.addEventListener('input', function () {
  var valueLength = tel.value.length;

  if (valueLength < MIN_TEL_LENGTH) {
    tel.setCustomValidity('Вам нужно ввести ещё ' + (MIN_TEL_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TEL_LENGTH) {
    tel.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TEL_LENGTH) + ' симв.');
  } else {
    tel.setCustomValidity('');
  }
});

overlay.addEventListener('click', function (evt) {
  evt.preventDefault();
  document.body.removeChild(overlay);
  modal.classList.remove('modal-show');
});

popupSuccessClose.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (popupSucces.classList.contains('popup-succes-show')) {
    popupSuccessClose.classList.remove('popup-succes-show');
    document.body.removeChild(overlay);
  }
});
