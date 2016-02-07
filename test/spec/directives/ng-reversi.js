'use strict';

describe('Directive: ngReversi', function () {

  // load the directive's module
  beforeEach(module('webReversiApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-reversi></ng-reversi>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the ngReversi directive');
  }));
});
