'use strict';

(function () {

  var TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var TYPES = [
    'bungalo',
    'flat',
    'house',
    'palace'
  ];

  var PRICES = [
    0,
    1000,
    5000,
    10000
  ];

  var ROOMS = [
    '1',
    '2',
    '3',
    '100'
  ];
  var GUESTS = [
    '1',
    '2',
    '3',
    '0'
  ];

  var minTitleLength = 30;

  var getCustomTitleValidityMessage = function (minLength, maxLength) {
    var validityMessagesObject = {
      tooShortCondition: minLength,
      tooShortMessage: 'Минимальное допустимое количество символов: ' + minLength + '. Введено сейчас : ' + maxLength,
      tooLongMessage: 'Имя не должно превышать ' + maxLength + ' символов',
      valueMissingMessage: 'Поле обязательно для заполнения!',
      defaultMessage: ''
    };

    return validityMessagesObject;
  };

  var getCustomPriceValidityMessage = function (minValue, maxValue) {
    var validityMessagesObject = {
      rangeUnderflowMessage: 'Значение должно быть больше или равно ' + minValue + '.',
      rangeOverflowMessage: 'Значение должно быть меньше или равно ' + maxValue + '.',
      valueMissingMessage: 'Вам необходимо заполнить это поле!',
      defaultMessage: ''
    };

    return validityMessagesObject;
  };

  var pinPosition = {
    'x': {
      'min': 300,
      'max': 900
    },
    'y': {
      'min': 100,
      'max': 500
    }
  };

  window.data = {
    TIMES: TIMES,
    TYPES: TYPES,
    PRICES: PRICES,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    minTitleLength: minTitleLength,
    getCustomTitleValidityMessage: getCustomTitleValidityMessage,
    getCustomPriceValidityMessage: getCustomPriceValidityMessage,
    pinPosition: pinPosition
  };
}());
