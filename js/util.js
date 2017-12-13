'use strict';

(function () {

  var keyCodes = {
    ESC: 27,
    ENTER: 13
  };

  /**
   * Действие при нажатии ESC
   * @param {object} event
   * @param {function} action
   */
  var isEscEvent = function (event, action) {
    if (event.keyCode === keyCodes.ESC) {
      action();
    }
  };

  /**
   * Действие при нажатии ENTER
   * @param {object} event
   * @param {function} action
   */
  var isEnterEvent = function (event, action) {
    if (event.keyCode === keyCodes.ENTER) {
      action();
    }
  };

  /**
   * Возвращает случайное число в заданном пределе
   * @param {number} min - минимальное значение в пределе
   * @param {number} max - максимальное значение в пределе
   * @return {number}
   */
  var getRandomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  /**
   * Возвращает случайный элемент массива
   * @param {Array.<string>} array - массив
   * @return {string}
   */
  var getRandomItem = function (array) {
    return array[Math.round((getRandomNumber(0, array.length - 1)))];
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    keyCodes: keyCodes
  };

}());
