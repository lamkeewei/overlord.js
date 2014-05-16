'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Box = mongoose.model('Box'),
    boxCtrl = require('../../../lib/controllers/boxes');

var box;

describe('Box Controller',function(){
  beforeEach(function(done){
    box = new Box({
        'address' : '10.20.5.23',
        'name' : 'SIS01',
        'port' : 1667,
        'status' : 'Online'
    });

    Box.remove().exec();
    done();
  });

  afterEach(function(done){
    Box.remove().exec();
    done();
  });

  it('should be able to retrieve all active boxes', function(done){
    box.save(function(err){
      should.not.exist(err);
      boxCtrl.getAllActive(function(err, boxes){
        should.not.exist(err);
        boxes.should.be.instanceOf(Array).and.have.length(1);
        done();
      });
    });
  });
});