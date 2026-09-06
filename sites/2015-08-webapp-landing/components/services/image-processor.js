'use strict';

/* jshint browser: true */
/*global angular */


angular.module('taskbaseApp').factory('ImageProcessor', ['$q', function($q) {
    return {
      resize: function ( file ) {

        var deferred = $q.defer();

        var fileType = file.type,
            reader = new FileReader();

        reader.onloadend = function() {

          var image = new Image();
              image.src = reader.result;

          image.onload = function() {
            var maxWidth = 100,
                maxHeight = 100,
                imageWidth = image.width,
                imageHeight = image.height;

            if (imageWidth > imageHeight) {
              if (imageWidth > maxWidth) {
                imageHeight *= maxWidth / imageWidth;
                imageWidth = maxWidth;
              }
            }
            else {
              if (imageHeight > maxHeight) {
                imageWidth *= maxHeight / imageHeight;
                imageHeight = maxHeight;
              }
            }

            var canvas = document.createElement('canvas');
            canvas.width = imageWidth;
            canvas.height = imageHeight;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0, imageWidth, imageHeight);

            // The resized file
            deferred.resolve(canvas.toDataURL(fileType));

            /*Business Logic
            var modelVal = {
              file: file,
              resized: finalFile
            };

            deferred.resolve(modelVal); // resolved value is appended to the model*/
          };
        };

        //reader.readAsDataURL(file);

        return deferred.promise;

      
      }
    };
  }]);
