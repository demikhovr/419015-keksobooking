'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var noticeForm = notice.querySelector('.notice__form');
  var noticeFieldsets = noticeForm.querySelectorAll('.notice__form fieldset');
  var inputAddress = notice.querySelector('#address');
  var ads = null;
  var mainPinStartCoords = {
    x: null,
    y: null
  };

  var filtersForm = document.querySelector('.map__filters');
  var featuresFilter = filtersForm.querySelector('#housing-features');
  var filters = filtersForm.querySelectorAll('.map__filter');
  var filteredAds;
  /**
   * Устанавливает адрес по умолчанию
   */
  var setDefaultAddress = function () {
    if (mainPin) {
      var x = mainPin.offsetLeft;
      var y = mainPin.offsetTop + window.const.mainPinParams.offsetY();
      inputAddress.value = 'x: ' + x + ', y: ' + y;
    }
  };

  setDefaultAddress();

  /**
   * Создаёт DOM фрагмент с пинами
   * @param {array} adsArray
   */
  var renderPins = function (adsArray) {
    var fragment = document.createDocumentFragment();

    adsArray.slice(0, window.const.ADS_AMOUNT).forEach(function (item) {
      fragment.appendChild(window.pin.render(item));
    });

    mapPins.appendChild(fragment);
  };

  /**
   * Функция обратного вызова, которая срабатывает при успешном выполнении запроса
   * @param {object} data
   */
  var successHandler = function (data) {
    ads = data.slice();
  };

  /**
   * функция обратного вызова, которая срабатывает при неуспешном выполнении запроса
   * @param {object} errorMessage
   */
  var errorHandler = function (errorMessage) {
    window.util.createPopup(errorMessage);
  };

  /**
   * Добавляет/удаляет атрибут disabled
   * @param {elements} elements
   * @param {boolean} state
   */
  var disableElements = function (elements, state) {
    Array.from(elements).forEach(function (element) {
      element.disabled = state;
    });
  };

  /**
   * Обработчик нажатия клавиши ENTER на главный пин
   * @param {object} event
   */
  var mainPinEnterPressHandler = function (event) {
    window.util.isEnterEvent(event, activateSite);
  };

  /**
   * Активирует основные функции элементов страницы
   */
  var activateSite = function () {
    mainPin.removeEventListener('click', mainPinClickHandler);
    map.classList.remove('map--faded');

    if (ads) {
      renderPins(ads);
    }

    noticeForm.classList.remove('notice__form--disabled');
    disableElements(noticeFieldsets, false);
    window.card.closePopup();
  };

  /**
   * Обработчик клика на главном пине
   * @param {object} event
   */
  var mainPinClickHandler = function (event) {
    event.preventDefault();
    activateSite();
  };

  /**
   * Обработчик опускания кнопки мыши
   * @param {object} event
   */
  var mainPinMouseDownHandler = function (event) {
    event.preventDefault();

    mainPinStartCoords = {
      x: event.clientX,
      y: event.clientY
    };

    document.addEventListener('mousemove', mainPinMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  };

  /**
   * Обработчик движения мыши
   * @param {object} moveEvent
   */
  var mainPinMoveHandler = function (moveEvent) {
    moveEvent.preventDefault();

    var shift = {
      x: mainPinStartCoords.x - moveEvent.clientX,
      y: mainPinStartCoords.y - moveEvent.clientY
    };

    mainPinStartCoords = {
      x: moveEvent.clientX,
      y: moveEvent.clientY
    };

    var currentCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    if (currentCoords.x < window.const.pinPosition.X_MIN - window.const.mainPinParams.offsetX()) {
      currentCoords.x = window.const.pinPosition.X_MIN - window.const.mainPinParams.offsetX();
    }

    if (currentCoords.x > window.const.pinPosition.X_MAX - window.const.mainPinParams.offsetX()) {
      currentCoords.x = window.const.pinPosition.X_MAX - window.const.mainPinParams.offsetX();
    }

    if (currentCoords.y < window.const.pinPosition.Y_MIN - window.const.mainPinParams.offsetY()) {
      currentCoords.y = window.const.pinPosition.Y_MIN - window.const.mainPinParams.offsetY();
    }

    if (currentCoords.y > window.const.pinPosition.Y_MAX - window.const.mainPinParams.offsetY()) {
      currentCoords.y = window.const.pinPosition.Y_MAX - window.const.mainPinParams.offsetY();
    }

    inputAddress.value = 'x: ' + (currentCoords.x + window.const.mainPinParams.offsetX()) + ', y: ' + (currentCoords.y + window.const.mainPinParams.offsetY());

    mainPin.style.left = currentCoords.x + 'px';
    mainPin.style.top = currentCoords.y + 'px';
  };

  /**
   * Обработчик отпускания кнопки мыши
   * @param {object} upEvent
   */
  var mainPinMouseUpHandler = function (upEvent) {
    upEvent.preventDefault();
    document.removeEventListener('mousemove', mainPinMoveHandler);
    document.removeEventListener('mouseup', mainPinMouseUpHandler);
  };

  /**
   * Фильтрует массив объектов по значению
   * @param {array} array
   * @param {element} element
   * @param {object.type} type
   * @return {array}
   */
  var filterArrayByValue = function (array, element, type) {
    return array.filter(function (item) {
      return item.offer[type].toString() === element.value;
    });
  };

  /**
   * Фильтрует массив объектов по цене
   * @param {array} array
   * @param {element} element
   * @param {object.type} type
   * @return {array}
   */
  var filterArrayByPrice = function (array, element, type) {
    return array.filter(function (item) {
      var result;
      switch (element.value) {
        case ('low'):
          result = item.offer[type] < window.const.LOW_PRICE;
          break;
        case ('middle'):
          result = window.const.LOW_PRICE <= item.offer[type] && item.offer[type] <= window.const.MIDDLE_PRICE;
          break;
        case ('high'):
          result = item.offer[type] > window.const.MIDDLE_PRICE;
          break;
      }
      return result;
    });
  };

  /**
   * Фильтрует массив объектов по особенностям
   * @param {array} array
   * @param {array} featureValue
   * @return {array}
   */
  var filterArrayByFeatures = function (array, featureValue) {
    return array.filter(function (item) {
      return item.offer.features.indexOf(featureValue) !== -1;
    });
  };

  /**
   * Удаляет все пины, кроме главного
   */
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.from(pins).forEach(function (item) {
      mapPins.removeChild(item);
    });
  };

  /**
   * Функция обновления пинов при фильтрации
   */
  var updatePins = function () {
    filteredAds = ads;
    removePins();
    window.card.closePopup();
    var checkedFeatures = Array.from(featuresFilter.querySelectorAll('input[type=checkbox]:checked'));

    var appliedFilters = Array.from(filters).filter(function (filter) {
      return filter.value !== 'any';
    });

    appliedFilters.forEach(function (filter) {
      var name = filter.name.replace('housing-', '');
      filteredAds = name === 'price' ? filterArrayByPrice(filteredAds, filter, name) : filterArrayByValue(filteredAds, filter, name);
    });

    checkedFeatures.forEach(function (feature) {
      filteredAds = filterArrayByFeatures(filteredAds, feature.value);
    });

    renderPins(filteredAds);
  };

  filtersForm.addEventListener('change', function () {
    window.util.debounce(updatePins);
  });

  window.backend.load(successHandler, errorHandler);
  mainPin.addEventListener('click', mainPinClickHandler);
  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
  mainPin.addEventListener('keydown', mainPinEnterPressHandler);
  disableElements(noticeFieldsets, true);

  window.map = {
    setDefaultAddress: setDefaultAddress
  };

}());
