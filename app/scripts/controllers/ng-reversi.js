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
    $scope.hintsEnabled = true;
    $scope.showOptions = false;

    $scope.hasHint = function (row, col) {
      return $scope.hintsEnabled && $scope.state.isMoveValid(row, col, $scope.state.player) ? 'hint' + $scope.state.player : '';
    };

    $scope.$on('reversiClickField', function (event, row, col) {
      if (!$scope.isGameOver) {
        ReversiLogicHelper.move($scope.state, row, col);
        $scope.isGameOver = $scope.state.isGameOver();
        $scope.score1 = ReversiLogicHelper.countPieces($scope.state, 1);
        $scope.score2 = ReversiLogicHelper.countPieces($scope.state, 2);
      }
    });

    $scope.newGame = function () {
      $scope.game = new ABPrune.Game(ReversiLogic);
      $scope.state = $scope.game.initialize();
      $scope.isGameOver = false;
      $scope.score1 = 2;
      $scope.score2 = 2;
    };


    $scope.newGame();
  });
