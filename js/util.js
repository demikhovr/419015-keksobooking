'use strict';

(function () {

  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  var lastTimeout;

  /**
   * Действие при нажатии ESC
   * @param {object} event
   * @param {function} action
   */
  var isEscEvent = function (event, action) {
    if (event.keyCode === KeyCodes.ESC) {
      action();
    }
  };

  /**
   * Действие при нажатии ENTER
   * @param {object} event
   * @param {function} action
   */
  var isEnterEvent = function (event, action) {
    if (event.keyCode === KeyCodes.ENTER) {
      action();
    }
  };

  /**
   * Возвращает правильное окончание для существительного после числительных
   * @param {Number} number - число
   * @param {array} titles - массив заголовков, среди которых будет выбрана правильная форма
   * @return {string} string
   */
  var getWordEnding = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  /**
   * Функция, устраняющая дребезг при частом вызове функции, которую ей передают
   * @param {function} fun - функция
   */
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun,
        window.const.DEBOUNCE_INTERVAL);
  };

  /**
   * Создаёт попап, показывающий сообщение об ошибках, произошедших по ходу загрузки данных
   * @param {string} errorMessage
   */
  var createPopup = function (errorMessage) {
    var popup = document.createElement('div');
    var headingElement = document.createElement('h2');
    var paragraphElement = document.createElement('p');
    var popupCloseBtn = document.querySelector('template').content.querySelector('.popup__close').cloneNode(true);

    popup.style = 'position: fixed; z-index: 100; top: 30%; left: 50%; transform: translate(-50%, -50%);' +
      ' width: 400px; height: 100px; padding: 40px 20px; border-radius: 10px; box-shadow: 0 10px 15px 10px rgba(0, 0, 0, 0.4)';
    headingElement.style = 'margin: 0; margin-bottom: 20px; font-size: 24px; color: #ffffff; text-align: center;';
    paragraphElement.style = 'margin: 0; font-size: 22px; color: #ffffff; text-align: center;';

    popup.appendChild(headingElement);
    popup.appendChild(paragraphElement);
    popup.appendChild(popupCloseBtn);

    if (errorMessage) {
      popup.style.backgroundColor = '#ff6d51';
      headingElement.textContent = errorMessage;
      paragraphElement.textContent = 'Упс! Кажется что-то сломалось!';
    } else {
      popup.style.backgroundColor = '#4658AE';
      headingElement.textContent = 'Спасибо!';
      paragraphElement.textContent = 'Ваши данные успешно отправлены!';
    }

    var btnClose = popup.querySelector('.popup__close');

    /**
     * Закрывает попап
     */
    var closeFormPopup = function () {
      if (popup) {
        popup.remove();
      }

      document.removeEventListener('keydown', formPopupEscPressHandler);
    };

    /**
     * Закрывает попап при нажатии ESC
     * @param {object} event
     */
    var formPopupEscPressHandler = function (event) {
      window.util.isEscEvent(event, function () {
        closeFormPopup(event);
      });
    };

    btnClose.addEventListener('click', closeFormPopup);
    document.addEventListener('keydown', formPopupEscPressHandler);

    document.body.insertAdjacentElement('afterbegin', popup);
  };

  window.util = {
    getWordEnding: getWordEnding,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    debounce: debounce,
    createPopup: createPopup
  };

}());
