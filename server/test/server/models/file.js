'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    File = mongoose.model('File');

var file;

describe('File Model', function(){
  beforeEach(function(done){
    file = new File({
      name: 'abc.png',
      identifier: 'abcpng'
    });

    File.remove().exec();
    done();
  });

  after(function(done){
    File.remove().exec();
    done();
  });

  it('should be able to add a file', function(done){
    file.save(function(err){
      should.not.exist(err);

      File.find({}, function(err, files){
        should.not.exist(err);

        files.should.have.length(1);
        done();
      });
    });
  });

  it('should be able to retrieve a file', function(done){
    file.save(function(err){
      should.not.exist(err);

      File.findOne({ name: file.name }, function(err, file){
        should.not.exist(err);
        should.exist(file);
        done();
      });
    });
  });

  it('should be able to remove file by id', function(done){
    file.save(function(err){
      should.not.exist(err);
      File.findByIdAndRemove(file._id, function(err, f){
        should.not.exist(err);
        should.exist(f);

        // Conversion to String for comparison
        var id_1 = f._id + '';
        var id_2 = file._id + '';

        id_1.should.be.equal(id_2);
        done();
      });
    });
  });

  it('should update the status of a file', function(done){
    file.save(function(err){
      should.not.exist(err);

      File.findByIdAndUpdate(file._id, { deployed: true }, function(err, f){
        should.not.exist(err);
        f.deployed.should.be.true;
        done();
      });
    });
  });
});