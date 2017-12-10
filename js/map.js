'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  /**
   * Возвращает массив объявлений
   * @return {Array}
   * @return {Array}
   */
  var getAds = function () {
    var adsArray = [];
    for (var i = window.data.adsAmount.min; i <= window.data.adsAmount.max; i++) {
      adsArray.push(window.card.generateAd());
    }
    return adsArray;
  };

  /**
   * Создаёт фрагмент с DOM элементами button.map__pin
   * @param {array} adsArray - массив с объявлениями
   * @return {DocumentFragment}
   */
  var renderAllPins = function (adsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adsArray.length; i++) {
      fragment.appendChild(window.pin.renderPin(adsArray[i]));
    }
    return fragment;
  };

  var ads = getAds();

  var mainPin = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var noticeForm = notice.querySelector('.notice__form');
  var noticeFieldsets = noticeForm.querySelectorAll('.notice__form fieldset');
  var renderedPins = renderAllPins(ads);

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
   * Обработчик при нажатии клавиши ENTER на главный пин
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
    mapPins.appendChild(renderedPins);
    noticeForm.classList.remove('notice__form--disabled');
    disableElements(noticeFieldsets, false);
    window.card.closePopup(event);
  };

  disableElements(noticeFieldsets, true);

  mainPin.addEventListener('mouseup', activateSite);
  mainPin.addEventListener('mouseup', activateSite);

  mainPin.addEventListener('keydown', mainPinEnterPressHandler);

}());
