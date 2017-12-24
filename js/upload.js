'use strict';

(function () {

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview img');
  var housingPhotosChooser = document.querySelector('#images');
  var housingPhotosPreview = document.querySelector('.form__photo-container');
  housingPhotosPreview.querySelector('.upload').style.width = '140px';
  housingPhotosPreview.style.width = '100%';

  /**
   * Функция, обрабатывающая файл, загруженный пользователем
   * @param {object} file
   * @param {array} typesArray - массив с типами данных
   * @param {function} callback
   */
  var uploadFile = function (file, typesArray, callback) {
    var fileName = file.name.toLowerCase();

    var matches = typesArray.some(function (typeItem) {
      return fileName.endsWith(typeItem);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        callback(reader);
      });

      reader.readAsDataURL(file);
    }
  };

  /**
   * Обработчик изменения состояния поля загрузки аватара
   */
  var avatarChangeHandler = function () {
    var file = avatarChooser.files[0];

    uploadFile(file, window.const.FILE_TYPES, function (reader) {
      avatarPreview.src = reader.result;
    });
  };

  /**
   * Обработчик изменения состояния поля загрузки фотографий жилья
   */
  var housingPhotosChangeHandler = function () {
    var photos = Array.from(housingPhotosChooser.files);
    photos.forEach(function (item) {
      uploadFile(item, window.const.FILE_TYPES, function (reader) {
        var image = document.createElement('img');
        image.src = reader.result;
        image.style.width = '140px';
        image.style.height = '70px';
        image.style.marginTop = '10px';
        image.style.marginRight = '10px';

        housingPhotosPreview.appendChild(image);
      });
    });
  };

  avatarChooser.addEventListener('change', avatarChangeHandler);
  housingPhotosChooser.addEventListener('change', housingPhotosChangeHandler);
}());
