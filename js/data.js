'use strict';

(function () {

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

  var types = [
    'flat',
    'house',
    'bungalo',
    'palace'
  ];

  var checkinTimes = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var checkoutTimes = [
    '12:00',
    '13:00',
    '14:00'
  ];

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
    types: types,
    checkinTimes: checkinTimes,
    checkoutTimes: checkoutTimes,
    features: features,
    adsAmount: adsAmount,
    price: price,
    rooms: rooms,
    guests: guests,
    pinPosition: pinPosition
  };
}());
