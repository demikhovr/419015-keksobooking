'use strict';

(function () {

  /**
   *  Функция связывающая поля между собой таким образом,
   *  чтобы логика изменения значения зависимого поля находилась в функции обратного вызова
   * @param {element} firstField - первое поле
   * @param {element} secondField - второе поле
   * @param {array} firstValues - массив возможных значений первого поля
   * @param {array} secondValues - массив возможных значений второго поля
   * @param {function} callback - callback-функция
   */
  var synchronizeFields = function (firstField, secondField, firstValues, secondValues, callback) {
    var index = firstValues.indexOf(firstField.value);

    callback(secondField, secondValues[index]);
  };

  window.synchronizeFields = synchronizeFields;

}());
