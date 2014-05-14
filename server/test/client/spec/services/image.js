'use strict';

describe('Service: Image', function () {

  // load the service's module
  beforeEach(module('serverApp'));

  // instantiate service
  var Image;
  beforeEach(inject(function (_Image_) {
    Image = _Image_;
  }));

  it('should do something', function () {
    expect(!!Image).toBe(true);
  });

});
