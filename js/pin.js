'use strict';

(function () {

  // Шаблон из которого будем копировать элементы
  var template = document.querySelector('template').content;
  // Элементы которые будем копировать
  var mapPinTemplate = template.querySelector('.map__pin');
  // Параметры элемента map__pin
  var needleHeight = 18; // px
  var mapPinHeight = (+mapPinTemplate.getAttribute('height') / 2) + needleHeight;
  var adCard = null;

  /**
   * Создает один DOM элемент button.map__pin на основе шаблона и данных объявления
   * @param {object} ad - объявление
   * @return {Node}
   */
  var renderPin = function (ad) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = (ad.location.y - mapPinHeight) + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.addEventListener('click', function (event) {
      pinElementClickHandler(event, ad);
    });
    return pinElement;
  };

  /**
   * Переключает активную метку на карте и показывает соответствующее ей объявление
   * @param {object} event
   * @param {object} ad - объявление
   */
  var pinElementClickHandler = function (event, ad) {
    window.card.closePopup(event);

    adCard = window.card.insertRenderedCard(ad);

    event.currentTarget.classList.add('map__pin--active');

    adCard.addEventListener('click', window.card.closePopup);
    document.addEventListener('keydown', window.card.onPopupEscPress);
  };

  window.pin = {
    renderPin: renderPin
  };

}());
