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
    $scope.game = new ReversiGame();

    $scope.game.initialize();
    $scope.$on('reversiClickField', function (event, row, col) {
      $scope.game.move(row, col);
    });
  });
