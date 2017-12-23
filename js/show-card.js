'use strict';

(function () {

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
  var showCard = function (ad, templateElement) {
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

    cardElementTitle.textContent = ad.offer.title;
    cardElementAddress.textContent = ad.offer.address;
    cardElementPrice.textContent = ad.offer.price + ' \u20BD/ночь';

    cardElementType.textContent = Types[ad.offer.type];

    var endingForRooms = window.util.getWordEnding(ad.offer.rooms, ['комната', 'комнаты', 'комнат']);
    var endingForGuests = window.util.getWordEnding(ad.offer.guests, ['гостя', 'гостей', 'гостей']);

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

    return templateElement;
  };

  window.showCard = showCard;
}());
