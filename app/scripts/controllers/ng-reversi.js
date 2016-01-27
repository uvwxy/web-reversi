'use strict';

/**
 * @ngdoc function
 * @name webReversiApp.controller:NgReversiCtrl
 * @description
 * # NgReversiCtrl
 * Controller of the webReversiApp
 */
angular.module('webReversiApp')
  .controller('NgReversiCtrl', function ($scope) {
    $scope.field = [];
    $scope.dim = 8;

    for (var row = 0; row < 8; row++){
      var newRow = [];
      for (var col = 0; col < 8; col++){
        newRow[col] = Math.random() < 0.5 ? 0 : 1;
      }
      $scope.field[row] = newRow;
    }

    console.log($scope.field);
  });
