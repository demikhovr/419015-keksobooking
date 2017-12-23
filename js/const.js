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

  var MIN_TITLE_LENGTH = 30;

  var pinPosition = {
    X_MIN: 300,
    X_MAX: 900,
    Y_MIN: 100,
    Y_MAX: 500
  };

  window.const = {
    TIMES: TIMES,
    TYPES: TYPES,
    PRICES: PRICES,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH,
    pinPosition: pinPosition
  };

}());
