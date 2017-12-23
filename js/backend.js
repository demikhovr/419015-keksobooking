'use strict';

(function () {

  var LOAD_URL = 'https://1510.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://1510.dump.academy/keksobooking';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;
  var Statuses = {
    '200': 'OK',
    '400': 'Неверный запрос',
    '401': 'Пользователь не авторизован',
    '403': 'Доступ запрещен',
    '404': 'Ничего не найдено',
    '405': 'Внутренняя ошибка сервера'
  };

  /**
   * Создаёт и возвращает объект XMLHttpRequest
   * @param {function} onLoad - функция обратного вызова, которая срабатывает при успешном выполнении запроса
   * @param {function} onError - функция обратного вызова, которая срабатывает при неуспешном выполнении запроса
   * @return {object} xhr
   */
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(Statuses[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  /**
   * Функция, загружающая данные по сети
   * @param {function} onLoad
   * @param {function} onError
   */
  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  /**
   * Функция, загружающая данные на сервер
   * @param {object} data - данные
   * @param {function} onLoad
   * @param {function} onError
   */
  var save = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

}());
