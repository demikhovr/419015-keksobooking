'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  /**
   * Возвращает массив объявлений
   * @param {object} data - данные
   * @return {Array}
   */
  var getAds = function (data) {
    var adsArray = [];

    for (var i = 0; i < data.length; i++) {
      adsArray.push(data[i]);
    }

    return adsArray;
  };

  /**
   * Создаёт DOM фрагмент с пинами
   * @param {array} adsArray
   * @return {DocumentFragment}
   */
  var renderAllPins = function (adsArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adsArray.length; i++) {
      fragment.appendChild(window.pin.render(adsArray[i]));
    }

    return fragment;
  };

  var mainPin = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var noticeForm = notice.querySelector('.notice__form');
  var noticeFieldsets = noticeForm.querySelectorAll('.notice__form fieldset');
  var inputAddress = notice.querySelector('#address');
  var renderedPins = null;

  var mainPinStartCoords = {
    x: null,
    y: null
  };

  /**
   * Функция обратного вызова, которая срабатывает при успешном выполнении запроса
   * @param {object} data
   */
  var successHandler = function (data) {
    var ads = getAds(data);
    renderedPins = renderAllPins(ads);
  };

  /**
   * функция обратного вызова, которая срабатывает при неуспешном выполнении запроса
   * @param {object} errorMessage
   */
  var errorHandler = function (errorMessage) {
    window.util.createPopup(errorMessage);
  };


  /**
   * Добавляет/удаляет атрибут disabled
   * @param {elements} elements
   * @param {boolean} state
   */
  var disableElements = function (elements, state) {
    elements.forEach(function (element) {
      element.disabled = state;
    });
  };

  /**
   * Обработчик нажатия клавиши ENTER на главный пин
   * @param {object} event
   */
  var mainPinEnterPressHandler = function (event) {
    window.util.isEnterEvent(event, activateSite);
  };

  /**
   * Активирует основные функции элементов страницы
   */
  var activateSite = function () {
    map.classList.remove('map--faded');

    setTimeout(function () {
      mapPins.appendChild(renderedPins);
    }, 100);

    noticeForm.classList.remove('notice__form--disabled');
    disableElements(noticeFieldsets, false);
    window.card.closePopup(event);
  };

  /**
   * Обработчик опускания кнопки мыши
   * @param {object} event
   */
  var mainPinMouseDownHandler = function (event) {
    event.preventDefault();
    activateSite();

    mainPinStartCoords = {
      x: event.clientX,
      y: event.clientY
    };

    document.addEventListener('mousemove', mainPinMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  };

  /**
   * Обработчик движения мыши
   * @param {object} moveEvent
   */
  var mainPinMoveHandler = function (moveEvent) {
    moveEvent.preventDefault();

    var shift = {
      x: mainPinStartCoords.x - moveEvent.clientX,
      y: mainPinStartCoords.y - moveEvent.clientY
    };

    mainPinStartCoords = {
      x: moveEvent.clientX,
      y: moveEvent.clientY
    };

    var currentCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    if (currentCoords.x < window.data.pinPosition.x.min - window.pin.pinParams.mainPin.offsetX()) {
      currentCoords.x = window.data.pinPosition.x.min - window.pin.pinParams.mainPin.offsetX();
    }

    if (currentCoords.x > window.data.pinPosition.x.max - window.pin.pinParams.mainPin.offsetX()) {
      currentCoords.x = window.data.pinPosition.x.max - window.pin.pinParams.mainPin.offsetX();
    }

    if (currentCoords.y < window.data.pinPosition.y.min - window.pin.pinParams.mainPin.offsetY()) {
      currentCoords.y = window.data.pinPosition.y.min - window.pin.pinParams.mainPin.offsetY();
    }

    if (currentCoords.y > window.data.pinPosition.y.max - window.pin.pinParams.mainPin.offsetY()) {
      currentCoords.y = window.data.pinPosition.y.max - window.pin.pinParams.mainPin.offsetY();
    }

    inputAddress.value = 'x: ' + (currentCoords.x + window.pin.pinParams.mainPin.offsetX()) + ', y: ' + (currentCoords.y + window.pin.pinParams.mainPin.offsetY());

    mainPin.style.left = currentCoords.x + 'px';
    mainPin.style.top = currentCoords.y + 'px';
  };

  /**
   * Обработчик отпускания кнопки мыши
   * @param {object} upEvent
   */
  var mainPinMouseUpHandler = function (upEvent) {
    upEvent.preventDefault();
    document.removeEventListener('mousemove', mainPinMoveHandler);
    document.removeEventListener('mouseup', mainPinMouseUpHandler);
  };

  window.backend.load(successHandler, errorHandler);

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);

  disableElements(noticeFieldsets, true);

  mainPin.addEventListener('keydown', mainPinEnterPressHandler);
}());
