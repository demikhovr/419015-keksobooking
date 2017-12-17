'use strict';

(function () {

  var notice = document.querySelector('.notice');
  var noticeForm = notice.querySelector('.notice__form');
  var selectCheckin = noticeForm.querySelector('#timein');
  var selectCheckout = noticeForm.querySelector('#timeout');
  var selectType = noticeForm.querySelector('#type');
  var inputPrice = noticeForm.querySelector('#price');
  var selectRooms = noticeForm.querySelector('#room_number');
  var selectGuests = noticeForm.querySelector('#capacity');
  var inputTitle = noticeForm.querySelector('#title');

  /**
   * Синхронизирует значения двух элементов
   * @param {element} element
   * @param {element} value
   */
  var syncValues = function (element, value) {
    element.value = value;
  };

  /**
   * Синхронизирует значения селекта с минимальным значением инпута
   * @param {element} element
   * @param {number} value - селект
   */
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  /**
   * Синхронизирует значения двух селектов
   * @param {Element} element
   * @param {number} value
   */
  var syncRoomsWithGuests = function (element, value) {
    syncValues(element, value);

    var currentValue = selectGuests.value;

    for (var i = 0; i < selectGuests.options.length; i++) {
      if (selectGuests.value !== '0') {
        selectGuests.options[i].disabled = selectGuests.options[i].value > currentValue || selectGuests.options[i].value === '0';
      } else {
        selectGuests.options[i].disabled = selectGuests.options[i].value !== currentValue;
      }
    }
  };

  /**
   * Устанавливает кастомные сообщения при некорректном вводе данных в поле 'Заголовок объявления'
   * @param {object} event
   */
  var titleValidityHandler = function (event) {
    window.validity(event, window.data.getCustomTitleValidityMessage(window.data.minTitleLength, event.target.value.length));
  };

  /**
   * Устанавливает кастомные сообщения при некорректном вводе данных в поле 'Цена за ночь'
   * @param {object} event
   */
  var priceValidityHandler = function (event) {
    window.validity(event, window.data.getCustomPriceValidityMessage(event.target.min, event.target.max));
  };

  /**
   * Меняет цвет границ невалидных полей
   * @param {object} event
   */
  var fieldsInvalidHandler = function (event) {
    event.target.style.border = '1px solid red';
  };

  /**
   * Обработчик изменения состояния селекта checkin
   */
  var checkinChangeHandler = function () {
    window.synchronizeFields(selectCheckin, selectCheckout, window.data.TIMES, window.data.TIMES, syncValues);
  };

  /**
   * Обработчик изменения состояния селекта checkout
   */
  var checkoutChangeHandler = function () {
    window.synchronizeFields(selectCheckout, selectCheckin, window.data.TIMES, window.data.TIMES, syncValues);
  };

  /**
   * Обработчик изменения состояния селекта type
   */
  var typeChangeHandler = function () {
    window.synchronizeFields(selectType, inputPrice, window.data.TYPES, window.data.PRICES, syncValueWithMin);
  };

  /**
   * Обработчик изменения состояния селекта rooms
   */
  var roomsChangeHandler = function () {
    window.synchronizeFields(selectRooms, selectGuests, window.data.ROOMS, window.data.GUESTS, syncRoomsWithGuests);
  };

  /**
   * Обработчик отправки формы с невалидным содержимым
   * @param {object} event
   */
  var formInvalidHandler = function (event) {
    fieldsInvalidHandler(event);

    inputTitle.addEventListener('input', titleValidityHandler);
    inputPrice.addEventListener('input', priceValidityHandler);
  };

  /**
   * Обработчик отправки формы с валидным содержимым
   */
  var formValidHandler = function () {
    noticeForm.removeEventListener('invalid', formInvalidHandler, true);
  };


  selectCheckin.addEventListener('change', checkinChangeHandler);

  selectCheckout.addEventListener('change', checkoutChangeHandler);

  selectType.addEventListener('change', typeChangeHandler);

  selectRooms.addEventListener('change', roomsChangeHandler);

  noticeForm.addEventListener('invalid', formInvalidHandler, true);

  noticeForm.addEventListener('valid', formValidHandler);
}());
