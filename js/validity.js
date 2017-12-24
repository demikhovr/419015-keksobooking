'use strict';

(function () {

  /**
   * Устанавливает кастомные сообщения при некорректном вводе данных в форму
   * @param {object} event
   * @param {object} customValidityObject
   * */
  var changeDefaultValidity = function (event, customValidityObject) {
    if ((event.target.value.length !== 0 && event.target.value.length < customValidityObject.tooShortCondition) && customValidityObject.tooShortMessage) {
      event.target.setCustomValidity(customValidityObject.tooShortMessage);
    } else if (event.target.validity.tooLong && customValidityObject.tooLongMessage) {
      event.target.setCustomValidity(customValidityObject.tooLongMessage);
    } else if (event.target.validity.valueMissing && customValidityObject.valueMissingMessage) {
      event.target.setCustomValidity(customValidityObject.valueMissingMessage);
    } else if (event.target.validity.rangeUnderflow && customValidityObject.rangeUnderflowMessage) {
      event.target.setCustomValidity(customValidityObject.rangeUnderflowMessage);
    } else if (event.target.validity.rangeOverflow && customValidityObject.rangeOverflowMessage) {
      event.target.setCustomValidity(customValidityObject.rangeOverflowMessage);
    } else {
      event.target.setCustomValidity(customValidityObject.defaultMessage);
    }
  };

  /**
   * Возвращает объект с набором кастомных сообщений и параметров для поля title
   * @param {number} minLength
   * @param {number} maxLength
   * @return {object} validityMessagesObject
   */
  var getCustomTitleValidityMessage = function (minLength, maxLength) {
    return {
      tooShortCondition: minLength,
      tooShortMessage: 'Минимальное допустимое количество символов: ' + minLength + '. Введено сейчас : ' + maxLength,
      tooLongMessage: 'Имя не должно превышать ' + maxLength + ' символов',
      valueMissingMessage: 'Поле обязательно для заполнения!',
      defaultMessage: ''
    };
  };

  /**
   * Возвращает объект с набором кастомных сообщений и параметров для поля price
   * @param {number} minValue
   * @param {number} maxValue
   * @return {object} validityMessagesObject
   */
  var getCustomPriceValidityMessage = function (minValue, maxValue) {
    return {
      rangeUnderflowMessage: 'Значение должно быть больше или равно ' + minValue + '.',
      rangeOverflowMessage: 'Значение должно быть меньше или равно ' + maxValue + '.',
      valueMissingMessage: 'Вам необходимо заполнить это поле!',
      defaultMessage: ''
    };
  };

  window.validity = {
    changeDefaultValidity: changeDefaultValidity,
    getCustomTitleValidityMessage: getCustomTitleValidityMessage,
    getCustomPriceValidityMessage: getCustomPriceValidityMessage
  };

}());
