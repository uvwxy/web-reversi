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
    $scope.player = 1;

    $scope.resetField = function(){
      for (var row = 0; row < 8; row++){
        var newRow = [];
        for (var col = 0; col < 8; col++){
          newRow[col] = null;
        }
        $scope.field[row] = newRow;
      }

      $scope.field[3][3] = 1;
      $scope.field[4][4] = 1;
      $scope.field[3][4] = 2;
      $scope.field[4][3] = 2;

    }

    $scope.resetField();

    $scope.$on('reversiClickField', function(event, rowidx, colidx){
      console.log('reversiClickField', rowidx, colidx);
      $scope.field[rowidx][colidx] = $scope.player;

      $scope.player = $scope.player == 1 ? 2 : 1;
    });

    console.log($scope.field);
  });
