'use strict';

(function () {

  var map = document.querySelector('.map');
  // Шаблон из которого будем копировать элементы
  var template = document.querySelector('template').content;
  // Элементы которые будем копировать
  var mapCardTemplate = template.querySelector('.map__card');
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
        'type': window.util.getRandomItem(window.data.types),
        'rooms': window.util.getRandomNumber(window.data.rooms.min, window.data.rooms.max),
        'guests': window.util.getRandomNumber(window.data.guests.min, window.data.guests.max),
        'checkin': window.util.getRandomItem(window.data.checkinTimes),
        'checkout': window.util.getRandomItem(window.data.checkoutTimes),
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
      case 'palace':
        cardElementType.textContent = 'Дворец';
        break;
      default:
        cardElementType.textContent = '';
        break;
    }

    var endingForRooms = window.util.getWordEnding(ad.offer.rooms, ['комната', 'комнаты', 'комнат']);
    var endingForGuests = window.util.getWordEnding(ad.offer.guests, ['гостя', 'гостей', 'гостей']);

    cardElementRoomsAndGuests.textContent = ad.offer.rooms + ' ' + endingForRooms + ' для ' + ad.offer.guests + ' ' + endingForGuests;
    cardElementTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

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

  /**
   * Вставляет в разметку попап с информацией об объявлении
   * @param {object} ad - объявление
   * @return {node}
   */
  var insertRenderedCard = function (ad) {
    adCard = window.card.renderMapCard(ad);
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
    renderMapCard: renderMapCard,
    insertRenderedCard: insertRenderedCard,
    closePopup: closePopup,
    onPopupEscPress: onPopupEscPress
  };

}());
