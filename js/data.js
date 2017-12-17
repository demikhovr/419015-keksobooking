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

  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
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

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var adsAmount = {
    'min': 1,
    'max': 8
  };

  var price = {
    'min': 1000,
    'max': 1000000
  };

  var rooms = {
    'min': 1,
    'max': 5
  };

  var guests = {
    'min': 1,
    'max': 10
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
    titles: titles,
    TIMES: TIMES,
    TYPES: TYPES,
    PRICES: PRICES,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    minTitleLength: minTitleLength,
    getCustomTitleValidityMessage: getCustomTitleValidityMessage,
    getCustomPriceValidityMessage: getCustomPriceValidityMessage,
    features: features,
    adsAmount: adsAmount,
    price: price,
    rooms: rooms,
    guests: guests,
    pinPosition: pinPosition
  };
}());
