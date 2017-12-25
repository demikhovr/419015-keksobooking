'use strict';

(function () {

  var map = document.querySelector('.map');
  var template = document.querySelector('template').content;
  var mapCardTemplate = template.querySelector('.map__card');
  var cardElement = mapCardTemplate.cloneNode(true);
  var filtersContainer = document.querySelector('map__filters-container');
  var adCard = null;
  var Types = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  /**
   * Создаёт один DOM элемент на основе шаблона и данных из объявления ad
   * @param {object} ad - объявление
   * @param {element} templateElement - элемент, куда будем вставлять данные
   * @return {element}
   */
  var fillCard = function (ad, templateElement) {
    var cardElementTitle = templateElement.querySelector('h3');
    var cardElementAddress = templateElement.querySelector('p small');
    var cardElementPrice = templateElement.querySelector('.popup__price');
    var cardElementType = templateElement.querySelector('h4');
    var cardElementRoomsAndGuests = templateElement.querySelector('h4 + p');
    var cardElementTime = templateElement.querySelector('h4 + p + p');
    var cardElementFeatures = templateElement.querySelector('.popup__features');
    var cardElementFeaturesItems = templateElement.querySelectorAll('.feature');
    var cardElementDescription = templateElement.querySelector('ul + p');
    var cardElementAvatar = templateElement.querySelector('.popup__avatar');
    var cardElementPhotos = templateElement.querySelector('.popup__pictures');

    var endingForRooms = window.util.getWordEnding(ad.offer.rooms, ['комната', 'комнаты', 'комнат']);
    var endingForGuests = window.util.getWordEnding(ad.offer.guests, ['гостя', 'гостей', 'гостей']);

    cardElementTitle.textContent = ad.offer.title;
    cardElementAddress.textContent = ad.offer.address;
    cardElementPrice.textContent = ad.offer.price + ' \u20BD/ночь';

    cardElementType.textContent = Types[ad.offer.type];

    cardElementRoomsAndGuests.textContent = ad.offer.rooms + ' ' + endingForRooms + ' для ' + ad.offer.guests + ' ' + endingForGuests;
    cardElementTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    Array.from(cardElementFeaturesItems).forEach(function (item) {
      cardElementFeatures.removeChild(item);
    });

    ad.offer.features.forEach(function (featureItem) {
      var featuresItem = document.createElement('li');
      featuresItem.classList.add('feature', 'feature--' + featureItem);
      cardElementFeatures.appendChild(featuresItem);
    });

    cardElementDescription.textContent = ad.offer.description;
    cardElementAvatar.src = ad.author.avatar;

    Array.from(cardElementPhotos.children).forEach(function (item) {
      cardElementPhotos.removeChild(item);
    });

    ad.offer.photos.forEach(function (item) {
      var image = document.createElement('img');
      image.style.width = '40px';
      image.style.height = 'auto';
      image.style.marginRight = '5px';
      image.src = item;
      cardElementPhotos.appendChild(image);
    });

    return templateElement;
  };

  /**
   * Вставляет в разметку попап с информацией об объявлении
   * @param {object} ad - объявление
   * @return {node}
   */
  var insertRenderedCard = function (ad) {
    adCard = fillCard(ad, cardElement);
    map.insertBefore(adCard, filtersContainer);
    return adCard;
  };

  /**
   * Деактивирует метку на карте и закрывает попап с информацией о ней
   */
  var closePopup = function () {
    var activeElement = document.querySelector('.map__pin--active');

    if (activeElement) {
      activeElement.classList.remove('map__pin--active');
    }

    if (adCard) {
      map.removeChild(adCard);
      adCard = null;
    }
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  /**
   * Закрывает попап при нажатии ESC
   * @param {object} event
   */
  var popupEscPressHandler = function (event) {
    window.util.isEscEvent(event, function () {
      closePopup();
    });
  };

  window.card = {
    insertRenderedCard: insertRenderedCard,
    closePopup: closePopup,
    popupEscPressHandler: popupEscPressHandler
  };

}());
