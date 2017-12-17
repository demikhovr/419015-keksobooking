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
   * Вставляет в разметку попап с информацией об объявлении
   * @param {object} ad - объявление
   * @return {node}
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
    insertRenderedCard: insertRenderedCard,
    closePopup: closePopup,
    onPopupEscPress: onPopupEscPress
  };

}());
