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
    $scope.game = new ABPrune.Game(ReversiLogic);
    $scope.state = $scope.game.initialize();;

    $scope.game.initialize();
    $scope.$on('reversiClickField', function (event, row, col) {
      ReversiLogicHelper.move($scope.state,row, col);
      $scope.isGameOver = $scope.state.isGameOver();
    });
  });
