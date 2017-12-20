'use strict';

(function () {

  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var Errors = {
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
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(Errors[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  /**
   * Функция, загружающая данные по сети
   * @param {function} onLoad
   * @param {function} onError
   */
  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', SERVER_URL + '/data');
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
    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

}());
