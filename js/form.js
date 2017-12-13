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
  var minTitleLength = 30;

  var housingType = {
    'bungalo': {
      'name': 'Лачуга',
      'price': 0
    },
    'flat': {
      'name': 'Квартира',
      'price': 1000
    },
    'house': {
      'name': 'Дом',
      'price': 5000
    },
    'palace': {
      'name': 'Дворец',
      'price': 10000
    }
  };

  /**
   * Синхронизирует значения двух селектов
   * @param {node} selectOne
   * @param {node} selectTwo
   */
  var synchronizeSelectIndex = function (selectOne, selectTwo) {
    selectOne.selectedIndex = selectTwo.selectedIndex;
  };

  /**
   * Создаёт опции селекта по данным из объекта
   * @param {node} select
   * @param {object} selectParams
   * @return {node}
   */
  var createOptions = function (select, selectParams) {
    var selectFragment = document.createDocumentFragment();
    var options = select.querySelectorAll('option');

    options.forEach(function (item) {
      select.removeChild(item);
    });

    for (var key in selectParams) {
      if (selectParams) {
        var option = document.createElement('option');
        option.value = key;
        option.textContent = selectParams[key].name;
        selectFragment.appendChild(option);
      }
    }
    select.appendChild(selectFragment);
    return select;
  };

  /**
   * Синхронизирует значения селекта с минимальным значением инпута
   * @param {node} input - поле
   * @param {node} select - селект
   * @param {object} selectParams - свойства селекта
   */
  var synchronizeSelectWithInput = function (input, select, selectParams) {
    inputPrice.min = selectParams[select.value].price;
  };

  /**
   * Синхронизирует значения двух селектов
   * @param {node} selectOne
   * @param {node} selectTwo
   */
  var selectValueSynchronizeHandler = function (selectOne, selectTwo) {
    selectOne.value = (selectTwo.value === '100') ? '0' : selectTwo.value;

    var currentValue = selectOne.value;

    for (var i = 0; i < selectOne.options.length; i++) {
      if (selectOne.value !== '0') {
        selectOne.options[i].disabled = selectOne.options[i].value > currentValue || selectOne.options[i].value === '0';
      } else {
        selectOne.options[i].disabled = selectOne.options[i].value !== currentValue;
      }
    }
  };

  /**
   * Устанавливает кастомные сообщения при некорректном вводе данных в поле 'Заголовок объявления'
   * @param {object} event
   */
  var titleValidityHandler = function (event) {
    var customTitleValidity = {
      tooShortCondition: minTitleLength,
      tooShortMessage: 'Минимальное допустимое количество символов: ' + minTitleLength + '. Введено сейчас : ' + event.target.value.length,
      tooLongMessage: 'Имя не должно превышать ' + event.target.maxLength + ' символов',
      valueMissingMessage: 'Поле обязательно для заполнения!',
      defaultMessage: ''
    };

    window.validity(event, customTitleValidity);
  };

  /**
   * Устанавливает кастомные сообщения при некорректном вводе данных в поле 'Цена за ночь'
   * @param {object} event
   */
  var priceValidityHandler = function (event) {
    var customPriceValidity = {
      rangeUnderflowMessage: 'Значение должно быть больше или равно ' + event.target.min + '.',
      rangeOverflowMessage: 'Значение должно быть меньше или равно ' + event.target.max + '.',
      valueMissingMessage: 'Вам необходимо заполнить это поле!',
      defaultMessage: ''
    };

    window.validity(event, customPriceValidity);
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
    synchronizeSelectIndex(selectCheckout, selectCheckin);
  };

  /**
   * Обработчик изменения состояния селекта checkout
   */
  var checkoutChangeHandler = function () {
    synchronizeSelectIndex(selectCheckin, selectCheckout);
  };

  /**
   * Обработчик изменения состояния селекта type
   */
  var typeChangeHandler = function () {
    synchronizeSelectWithInput(inputPrice, selectType, housingType);
  };

  /**
   * Обработчик изменения состояния селекта rooms
   */
  var roomsChangeHandler = function () {
    selectValueSynchronizeHandler(selectGuests, selectRooms);
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

  selectType = createOptions(selectType, housingType);
  selectType.addEventListener('change', typeChangeHandler);

  selectRooms.addEventListener('change', roomsChangeHandler);

  selectValueSynchronizeHandler(selectGuests, selectRooms);

  noticeForm.addEventListener('invalid', formInvalidHandler, true);
  noticeForm.addEventListener('valid', formValidHandler);
}());
