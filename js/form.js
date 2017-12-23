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
    window.validity.changeDefaultValidity(event, window.validity.getCustomTitleValidityMessage(window.const.MIN_TITLE_LENGTH, event.target.value.length));
  };

  /**
   * Устанавливает кастомные сообщения при некорректном вводе данных в поле 'Цена за ночь'
   * @param {object} event
   */
  var priceValidityHandler = function (event) {
    window.validity.changeDefaultValidity(event, window.validity.getCustomPriceValidityMessage(event.target.min, event.target.max));
  };

  /**
   * Меняет цвет границ невалидных полей
   * @param {object} event
   */
  var fieldsInvalidHandler = function (event) {
    event.target.style.border = '1px solid red';
  };

  /**
   * Функция инициализирующая форму при открытии сайта
   */
  var initializeForm = function () {
    window.synchronizeFields(selectCheckin, selectCheckout, window.const.TIMES, window.const.TIMES, syncValues);
    window.synchronizeFields(selectCheckout, selectCheckin, window.const.TIMES, window.const.TIMES, syncValues);
    window.synchronizeFields(selectType, inputPrice, window.const.TYPES, window.const.PRICES, syncValueWithMin);
    window.synchronizeFields(selectRooms, selectGuests, window.const.ROOMS, window.const.GUESTS, syncRoomsWithGuests);
  };

  /**
   * Обработчик изменения состояния селекта checkin
   */
  var checkinChangeHandler = function () {
    window.synchronizeFields(selectCheckin, selectCheckout, window.const.TIMES, window.const.TIMES, syncValues);
  };

  /**
   * Обработчик изменения состояния селекта checkout
   */
  var checkoutChangeHandler = function () {
    window.synchronizeFields(selectCheckout, selectCheckin, window.const.TIMES, window.const.TIMES, syncValues);
  };

  /**
   * Обработчик изменения состояния селекта type
   */
  var typeChangeHandler = function () {
    window.synchronizeFields(selectType, inputPrice, window.const.TYPES, window.const.PRICES, syncValueWithMin);
  };

  /**
   * Обработчик изменения состояния селекта rooms
   */
  var roomsChangeHandler = function () {
    window.synchronizeFields(selectRooms, selectGuests, window.const.ROOMS, window.const.GUESTS, syncRoomsWithGuests);
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
   *  Функция обратного вызова, которая срабатывает при успешном выполнении запроса
   */
  var successHandler = function () {
    window.util.createPopup();
    noticeForm.reset();
    initializeForm();
  };

  /**
   * Функция обратного вызова, которая срабатывает при неуспешном выполнении запроса
   * @param {string} errorMessage
   */
  var errorHandler = function (errorMessage) {
    window.util.createPopup(errorMessage);
  };

  /**
   * Обработчик отправки формы
   * @param {object} event
   */
  var formSubmitHandler = function (event) {
    event.preventDefault();

    window.backend.save(new FormData(noticeForm), successHandler, errorHandler);
  };

  selectCheckin.addEventListener('change', checkinChangeHandler);

  selectCheckout.addEventListener('change', checkoutChangeHandler);

  selectType.addEventListener('change', typeChangeHandler);

  selectRooms.addEventListener('change', roomsChangeHandler);

  noticeForm.addEventListener('invalid', formInvalidHandler, true);

  noticeForm.addEventListener('submit', formSubmitHandler);

  initializeForm();

}());
