'use strict';

/**
 * @ngdoc directive
 * @name webReversiApp.directive:ngReversi
 * @description
 * # ngReversi
 */
angular.module('webReversiApp')
  .directive('ngReversi', function () {
    return {
      templateUrl: 'views/ng-reversi.html',
      restrict: 'A'
    };
  });
