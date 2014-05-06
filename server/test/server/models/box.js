'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Box = mongoose.model('Box');

var box;

describe('Box Model', function(){
  beforeEach(function(done){
    box = new Box({
      name: 'SIS01',
      address: '10.20.5.23',
      port: '1667',
      status: 'Offline'
    });

    Box.remove().exec();
    done();
  });

  after(function(done){
    Box.remove().exec();
    done();
  });

  it('should begin with no boxes', function(done){
    Box.find({}, function(err, boxes){
      boxes.should.have.length(0);
      done();
    });
  });

  it('should be able to save correctly', function(done){
    box.save(function(err){
      should.not.exist(err);

      Box.find({}, function(err, boxes){
        boxes.should.have.length(1);
        done();
      });
    });
  });

  it('should fail when saving a duplicate box', function(done){
    box.save(function(err){
      should.not.exist(err);
    });

    var dupBox = new Box(box);
    dupBox.save(function(err){
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without an address', function(done){
    var noAddress = new Box({
      name: box.name,
      port: box.port,
      status: box.status
    });

    noAddress.save(function(err){
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a port', function(done){
    var noPort = new Box({
      name: box.name,
      address: box.address,
      status: box.status
    });

    noPort.save(function(err){
      should.exist(err);
      done();
    });
  });

  it('should not fail when saving without a status', function(done){
    var noPort = new Box({
      name: box.name,
      address: box.address,
      port: box.port
    });

    noPort.save(function(err){
      should.not.exist(err);
      done();
    });
  });

  it('should update a box', function(done){
    box.save(function(err){
      if (err) return done(err);
      Box.findOne({ name: box.name }, function(err, found){
        if (err) return done(err);
        found.name.should.be.equal('SIS01');
        found.address = 'changed';
        found.save(function(err){
          should.not.exist(err);

          Box.findOne({ name: found.name }, function(err, changedBox){
            should.exist(changedBox);
            changedBox.address.should.be.eql('changed');
            done();
          });
        });
      });
    });
  });
});