'use strict';

(function () {

  // Шаблон из которого будем копировать элементы
  var template = document.querySelector('template').content;
  // Элементы которые будем копировать
  var mapPinTemplate = template.querySelector('.map__pin');
  // Параметры элемента map__pin
  var pinParams = {
    mainPin: {
      NEEDLE_HEIGHT: 22,
      WIDTH: 64,
      HEIGHT: 64,
      offsetX: function () {
        return (pinParams.mainPin.WIDTH / 2);
      },
      offsetY: function () {
        return (pinParams.mainPin.HEIGHT / 2 + pinParams.mainPin.NEEDLE_HEIGHT);
      }
    },

    usersPin: {
      NEEDLE_HEIGHT: 18,
      WIDTH: 40,
      HEIGHT: 40,
      offsetY: function () {
        return (pinParams.usersPin.HEIGHT / 2 + pinParams.usersPin.NEEDLE_HEIGHT);
      }
    }
  };

  var adCard = null;

  /**
   * Создает один DOM элемент button.map__pin на основе шаблона и данных объявления
   * @param {object} ad - объявление
   * @return {Node}
   */
  var renderPin = function (ad) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = (ad.location.y - pinParams.usersPin.offsetY()) + 'px';
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
    var adCloseBtn = adCard.querySelector('.popup__close');

    event.currentTarget.classList.add('map__pin--active');

    adCloseBtn.addEventListener('click', window.card.closePopup);
    document.addEventListener('keydown', window.card.onPopupEscPress);
  };

  window.pin = {
    renderPin: renderPin,
    pinParams: pinParams
  };

}());
