'use strict';

(function () {

  /**
   * Устанавливает кастомные сообщения при некорректном вводе данных в форму
   * @param {object} event
   * @param {object} customValidityObject
   * */
  var changeDefaultValidity = function (event, customValidityObject) {
    if ((event.target.value.length < customValidityObject.tooShortCondition) && customValidityObject.tooShortMessage) {
      event.target.setCustomValidity(customValidityObject.tooShortMessage);
    } else if (event.target.validity.tooLong && customValidityObject.tooShortMessage) {
      event.target.setCustomValidity(customValidityObject.tooLongMessage);
    } else if (event.target.validity.valueMissing && customValidityObject.tooLongMessage) {
      event.target.setCustomValidity(customValidityObject.valueMissingMessage);
    } else if (event.target.validity.rangeUnderflow && customValidityObject.rangeUnderflowMessage) {
      event.target.setCustomValidity(customValidityObject.rangeUnderflowMessage);
    } else if (event.target.validity.rangeOverflow && customValidityObject.rangeOverflowMessage) {
      event.target.setCustomValidity(customValidityObject.rangeOverflowMessage);
    } else {
      event.target.setCustomValidity(customValidityObject.defaultMessage);
    }
  };

  window.validity = changeDefaultValidity;
}());
