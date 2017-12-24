'use strict';

(function () {

  var template = document.querySelector('template').content;
  var mapPinTemplate = template.querySelector('.map__pin');
  var adCard = null;

  /**
   * Создает один DOM элемент button.map__pin на основе шаблона и данных объявления
   * @param {object} ad
   * @return {element}
   */
  var render = function (ad) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = (ad.location.y - window.const.userPinParams.offsetY()) + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.addEventListener('click', function (event) {
      pinElementClickHandler(event, ad);
    });
    return pinElement;
  };

  /**
   * Переключает активную метку на карте и показывает соответствующее ей объявление
   * @param {object} event
   * @param {object} ad
   */
  var pinElementClickHandler = function (event, ad) {
    window.card.closePopup();

    adCard = window.card.insertRenderedCard(ad);
    var adCloseBtn = adCard.querySelector('.popup__close');

    event.currentTarget.classList.add('map__pin--active');

    adCloseBtn.addEventListener('click', window.card.closePopup);
    document.addEventListener('keydown', window.card.popupEscPressHandler);
  };

  window.pin = {
    render: render
  };

}());
