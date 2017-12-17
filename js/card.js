'use strict';

(function () {

  var map = document.querySelector('.map');
  // Шаблон из которого будем копировать элементы
  var template = document.querySelector('template').content;
  // Элементы которые будем копировать
  var mapCardTemplate = template.querySelector('.map__card');
  var cardElement = mapCardTemplate.cloneNode(true);
  var filtersContainer = document.querySelector('map__filters-container');
  var adCard = null;

  /**
   * Возвращает номер аватара пользователя
   * @return {number}
   */
  var getAvatarNumber = function () {
    return (window.data.adsAmount.min <= window.data.adsAmount.max) ? window.data.adsAmount.min++ : 0;
  };

  /**
   * Возвращает случайный заголовок
   * @param {array} array - массив с заголовками
   * @return {string}
   */
  var getTitle = function (array) {
    var titleIndex = window.util.getRandomNumber(0, array.length - 1);
    return array.splice(titleIndex, 1);
  };

  /**
   * Возвращает массив строк случайной длины
   * @return {array}
   */
  var getFeatures = function () {
    var featuresArray = window.data.features.slice();
    var randomIndex = (window.util.getRandomNumber(0, window.data.features.length));
    for (var i = 0; i < randomIndex - 1; i++) {
      var deletedIndex = window.util.getRandomNumber(0, featuresArray.length - 1);
      featuresArray.splice(deletedIndex, 1);
    }
    return featuresArray;
  };

  /**
   * Возвращает объект описывающий объявление
   * @return {object}
   */
  var generateAd = function () {
    var locationX = window.util.getRandomNumber(window.data.pinPosition.x.min, window.data.pinPosition.x.max);
    var locationY = window.util.getRandomNumber(window.data.pinPosition.y.min, window.data.pinPosition.y.max);
    return {
      'author': {
        'avatar': 'img/avatars/user0' + getAvatarNumber() + '.png'
      },
      'offer': {
        'title': getTitle(window.data.titles),
        'address': locationX + ', ' + locationY,
        'price': window.util.getRandomNumber(window.data.price.min, window.data.price.max),
        'type': window.util.getRandomItem(window.data.TYPES),
        'rooms': window.util.getRandomNumber(window.data.rooms.min, window.data.rooms.max),
        'guests': window.util.getRandomNumber(window.data.guests.min, window.data.guests.max),
        'checkin': window.util.getRandomItem(window.data.TIMES),
        'checkout': window.util.getRandomItem(window.data.TIMES),
        'features': getFeatures(window.data.features),
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
   * Вставляет в разметку попап с информацией об объявлении
   * @param {object} ad - объявление
   * @return {element}
   */
  var insertRenderedCard = function (ad) {
    adCard = window.showCard(ad, cardElement);
    map.insertBefore(adCard, filtersContainer);
    return adCard;
  };

  /**
   * Деактивирует метку на карте и закрывает попап с информацией о ней
   * @param {event} event
   */
  var closePopup = function (event) {
    var activeElement = document.querySelector('.map__pin--active');
    var mainPin = map.querySelector('.map__pin--main');
    if (activeElement) {

      activeElement.classList.remove('map__pin--active');
    }

    if (event.currentTarget === mainPin) {
      event.currentTarget.classList.add('map__pin--active');
    }

    if (adCard) {
      // adCard.classList.add('hidden');
      map.removeChild(adCard);
      adCard = null;
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };

  /**
   * Закрывает попап при нажатии ESC
   * @param {object} event
   */
  var onPopupEscPress = function (event) {
    window.util.isEscEvent(event, function () {
      closePopup(event);
    });
  };

  window.card = {
    generateAd: generateAd,
    insertRenderedCard: insertRenderedCard,
    closePopup: closePopup,
    onPopupEscPress: onPopupEscPress
  };

}());
