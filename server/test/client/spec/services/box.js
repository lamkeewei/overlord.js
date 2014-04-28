'use strict';

describe('Service: Box', function () {

  // load the service's module
  beforeEach(module('serverApp'));

  // instantiate service
  var Box;
  beforeEach(inject(function (_Box_) {
    Box = _Box_;
  }));

  it('should do something', function () {
    expect(!!Box).toBe(true);
  });

});
