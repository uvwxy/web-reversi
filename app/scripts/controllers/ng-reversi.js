'use strict';

/**
 * @ngdoc function
 * @name webReversiApp.controller:NgReversiCtrl
 * @description
 * # NgReversiCtrl
 * Controller of the webReversiApp
 */
angular.module('webReversiApp')
  .controller('NgReversiCtrl', function ($scope, $timeout) {
    $scope.hintsEnabled = true;
    $scope.showOptions = false;
    $scope.ai1Enabled = false;
    $scope.ai2Enabled = true;
    $scope.minDelay = 1000;
    $scope.player = 1;


    $scope.hasHint = function (row, col) {
      return $scope.hintsEnabled && $scope.state.isMoveValid(row, col, $scope.player) ? 'hint' + $scope.player : '';
    };

    $scope.$on('reversiClickField', function (event, row, col) {
      if ($scope.isProcFieldClick) {
        return;
      }
      $scope.isProcFieldClick = true;

      if (!$scope.isGameOver) {
        var nextPlayer = ReversiLogicHelper.move($scope.state, row, col, $scope.player)
        if (nextPlayer == -1){
          // invalid move, don't do anything
          $scope.isProcFieldClick = false;
          return;
        }
        $scope.player = nextPlayer;
        $scope.isGameOver = $scope.state.isGameOver();
        $scope.score1 = ReversiLogicHelper.countPieces($scope.state, 1);
        $scope.score2 = ReversiLogicHelper.countPieces($scope.state, 2);

        // check if other opponent needs to move
        if ($scope.ai1Enabled && $scope.player === 1) {
          $timeout(function () {
            var move = new ABPrune.AlphaBeta(6, $scope.state).search().move;

            $scope.isProcFieldClick = false;
            if (move){
              $scope.$emit('reversiClickField', move.row, move.col);
            }
          }, $scope.minDelay);

        } else if ($scope.ai2Enabled && $scope.player === 2) {
          $timeout(function () {
            var copiedState = {data: ReversiLogicHelper.invert($scope.state.data)};
            $scope.state._copyFunctions(copiedState);
            var result = new ABPrune.AlphaBeta(6, copiedState).search();

            $scope.isProcFieldClick = false;

            if (result.move){
              $scope.$emit('reversiClickField', result.move.row, result.move.col);
            }
          }, $scope.minDelay);
        } else {
          // no other ai moved, enable click
          $scope.isProcFieldClick = false;
        }
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
