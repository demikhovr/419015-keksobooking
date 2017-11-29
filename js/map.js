'use strict';

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES = [
  'flat',
  'house',
  'bungalo'
];

var CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
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

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var filtersContainer = document.querySelector('map__filters-container');

// Шаблон из которого будем копировать элементы
var template = document.querySelector('template').content;
// Элементы которые будем копировать
var mapPinTemplate = template.querySelector('.map__pin');
var mapCardTemplate = template.querySelector('.map__card');

// Параметры элемента map__pin
var mapPinImageTemplate = mapPinTemplate.querySelector('img');
var needleHeight = 18; // px
var mapPinWidth = mapPinImageTemplate.getAttribute('width');
var mapPinHeight = +mapPinImageTemplate.getAttribute('height') + needleHeight;

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

/**
 * Возвращает номер аватара пользователя
 * @return {number}
 */
var getAvatarNumber = function () {
  return (adsAmount.min <= adsAmount.max) ? adsAmount.min++ : 0;
};

/**
 * Возвращает случайный заголовок
 * @param {array} array - массив с заголовками
 * @return {string}
 */
var getTitle = function (array) {
  var titleIndex = getRandomNumber(0, array.length - 1);
  return array.splice(titleIndex, 1);
};

/**
 * Возвращает массив строк случайной длины
 * @return {array}
 */
var getFeatures = function () {
  var featuresArray = FEATURES.slice();
  var randomIndex = (Math.round(getRandomNumber(0, FEATURES.length)));
  for (var i = 0; i < randomIndex - 1; i++) {
    var deletedIndex = Math.round(getRandomNumber(0, featuresArray.length - 1));
    featuresArray.splice(deletedIndex, 1);
  }
  return featuresArray;
};

/**
 * Возвращает объект описывающий объявление
 * @return {object}
 */
var generateAd = function () {
  var locationX = Math.round(getRandomNumber(pinPosition.x.min, pinPosition.x.max));
  var locationY = Math.round(getRandomNumber(pinPosition.y.min, pinPosition.y.max));
  return {
    'author': {
      'avatar': 'img/avatars/user0' + getAvatarNumber() + '.png'
    },
    'offer': {
      'title': getTitle(TITLES),
      'address': locationX + ', ' + locationY,
      'price': Math.round(getRandomNumber(price.min, price.max)),
      'type': getRandomItem(TYPES),
      'rooms': Math.round(getRandomNumber(rooms.min, rooms.max)),
      'guests': Math.round(getRandomNumber(guests.min, guests.max)),
      'checkin': getRandomItem(CHECKIN_TIMES),
      'checkout': getRandomItem(CHECKOUT_TIMES),
      'features': getFeatures(FEATURES),
      'description': '',
      'photos': []
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };
};

/**
 * Возвращает массив объявлений
 * @return {Array}
 */
var getAds = function () {
  var adsArray = [];
  for (var i = adsAmount.min; i <= adsAmount.max; i++) {
    adsArray.push(generateAd());
  }
  return adsArray;
};

// Карта на которую будем вставлять похожие метки

/**
 * Создает один DOM элемент button.map__pin на основе шаблона и данных объявления
 * @param {object} ad - объявление
 * @return {Node}
 */
var renderPin = function (ad) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style.left = (ad.location.x - (mapPinWidth / 2)) + 'px';
  pinElement.style.top = (ad.location.y + mapPinHeight) + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  return pinElement;
};

/**
 * Создаёт фрагмент с DOM элементами button.map__pin
 * @param {array} adsArray - массив с объявлениями
 * @return {DocumentFragment}
 */
var renderAllPins = function (adsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsArray.length; i++) {
    fragment.appendChild(renderPin(adsArray[i]));
  }
  return fragment;
};

/**
 * Создаёт один DOM элемент на основе шаблона и данных из объявления ad
 * @param {object} ad - объявление
 * @return {Node}
 */
var renderMapCard = function (ad) {
  var cardElement = mapCardTemplate.cloneNode(true);

  var cardElementTitle = cardElement.querySelector('h3');
  var cardElementAddress = cardElement.querySelector('p small');
  var cardElementPrice = cardElement.querySelector('.popup__price');
  var cardElementType = cardElement.querySelector('h4');
  var cardElementRoomsAndGuests = cardElement.querySelector('h4 + p');
  var cardElementTime = cardElement.querySelector('h4 + p + p');
  var cardElementFeatures = cardElement.querySelector('.popup__features');
  var cardElementFeaturesItems = cardElement.querySelectorAll('.feature');
  var cardElementDescription = cardElement.querySelector('ul + p');
  var cardElementAvatar = cardElement.querySelector('.popup__avatar');

  cardElementTitle.textContent = ad.offer.title;
  cardElementAddress.textContent = ad.offer.address;
  cardElementPrice.textContent = ad.offer.price + '\u20BD/ночь';

  switch (ad.offer.type) {
    case 'flat':
      cardElementType.textContent = 'Квартира';
      break;
    case 'bungalo':
      cardElementType.textContent = 'Бунгало';
      break;
    case 'house':
      cardElementType.textContent = 'Дом';
      break;
    default:
      cardElementType.textContent = '';
      break;
  }

  var endingForRooms = '';
  var endingForGuests = '';

  switch (ad.offer.rooms) {
    case 1:
      endingForRooms = 'комната';
      break;
    case 5:
      endingForRooms = 'комнат';
      break;
    default:
      endingForRooms = 'комнаты';
      break;
  }

  switch (ad.offer.guests) {
    case 1:
      endingForGuests = 'гостя';
      break;
    default:
      endingForGuests = 'гостей';
      break;
  }

  cardElementRoomsAndGuests.textContent = ad.offer.rooms + ' ' + endingForRooms + ' для ' + ad.offer.guests + ' ' + endingForGuests;
  cardElementTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до' + ad.offer.checkout;

  cardElementFeaturesItems.forEach(function (item) {
    cardElementFeatures.removeChild(item);
  });

  ad.offer.features.forEach(function (featureItem) {
    var featuresItem = document.createElement('li');
    featuresItem.classList.add('feature', 'feature--' + featureItem);
    cardElementFeatures.appendChild(featuresItem);
  });

  cardElementDescription.textContent = ad.offer.description;
  cardElementAvatar.src = ad.author.avatar;

  return cardElement;
};

var ads = getAds();
map.classList.remove('map--faded');
mapPins.appendChild(renderAllPins(ads));
var adCard = renderMapCard(ads[0]);
map.insertBefore(adCard, filtersContainer);
