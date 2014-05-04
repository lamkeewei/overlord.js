'use strict';

describe('Directive: ResumableBrowse', function () {

  // load the directive's module
  beforeEach(module('serverApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<resumable-browse></resumable-browse>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ResumableBrowse directive');
  }));
});
