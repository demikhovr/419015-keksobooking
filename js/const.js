'use strict';

(function () {

  var CASES = [2, 0, 1, 1, 1, 2];

  var DEBOUNCE_INTERVAL = 500;

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

  var mainPinParams = {
    NEEDLE_HEIGHT: 22,
    WIDTH: 64,
    HEIGHT: 64,
    offsetX: function () {
      return (this.WIDTH / 2);
    },
    offsetY: function () {
      return (this.HEIGHT / 2 + this.NEEDLE_HEIGHT);
    }
  };

  var userPinParams = {
    NEEDLE_HEIGHT: 18,
    WIDTH: 40,
    HEIGHT: 40,
    offsetY: function () {
      return (this.HEIGHT / 2 + this.NEEDLE_HEIGHT);
    }
  };

  var ADS_AMOUNT = 5;

  var LOW_PRICE = 10000;
  var MIDDLE_PRICE = 50000;

  var LOAD_URL = 'https://1510.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://1510.dump.academy/keksobooking';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

  var ZERO_VALUE = '0';
  var DEFAULT_VALUE = 'any';

  window.const = {
    CASES: CASES,
    DEFAULT_VALUE: DEFAULT_VALUE,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    TIMES: TIMES,
    TYPES: TYPES,
    PRICES: PRICES,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH,
    pinPosition: pinPosition,
    mainPinParams: mainPinParams,
    userPinParams: userPinParams,
    ADS_AMOUNT: ADS_AMOUNT,
    LOW_PRICE: LOW_PRICE,
    MIDDLE_PRICE: MIDDLE_PRICE,
    LOAD_URL: LOAD_URL,
    SAVE_URL: SAVE_URL,
    STATUS_OK: STATUS_OK,
    TIMEOUT: TIMEOUT,
    FILE_TYPES: FILE_TYPES,
    ZERO_VALUE: ZERO_VALUE
  };

}());
