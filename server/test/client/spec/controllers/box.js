'use strict';

describe('Controller: BoxCtrl', function () {

  // load the controller's module
  beforeEach(module('serverApp'));

  var BoxCtrl,
    scope,
    $httpBackend,
    boxesList = [
      {
        name: 'SIS01',
        address: '10.20.5.23',
        port: '1223',
        status: 'Offline'
      }, {
        name: 'SIS02',
        address: '10.20.5.23',
        port: '1223',
        status: 'Offline'
      },
    ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    BoxCtrl = $controller('BoxCtrl', {
      $scope: scope
    });
  }));

  it('should initialize with a list of boxes to the scope', function () {
    $httpBackend.expectGET('/api/boxes')
      .respond(boxesList);
    expect(scope.awesomeThings).toBeUndefined();
    $httpBackend.flush();
    expect(scope.boxes.length).toBe(2);
  });
});
