'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Image = mongoose.model('Image');

var image;

describe('Image Model', function(){
  beforeEach(function(done){
    image = new Image({
      name: 'LabTest1',
      files: [
        {
          name: 'Testfile.png',
          identifier: 'Testfilepng'
        }
      ]
    });

    Image.remove().exec();
    done();
  });

  after(function(done){
    Image.remove().exec();
    done();
  });

  it('should be able to save a properly formed image', function(done){
    image.save(function(err){
      should.not.exist(err);
      done();
    });
  });

  it('should not save where there is not image', function(done){
    image.files = [];
    image.save(function(err){
      should.exist(err);
      done();
    });
  });

  it('should be able to retrieve all the images', function(done){
    image.save(function(err){
      should.not.exist(err);
      Image.find({}, function(err, images){
        should.not.exist(err);
        images.should.have.length(1);
        done();
      });
    });
  });

  it('should be able to delete an image', function(done){
    image.save(function(err){
      should.not.exist(err);
      Image.findByIdAndRemove(image._id, function(err, im){
        should.not.exist(err);
        done();
      });
    });
  });
});