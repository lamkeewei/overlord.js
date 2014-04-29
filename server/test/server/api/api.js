'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('GET /api/awesomeThings', function() {
  
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/awesomeThings')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('/api/boxes', function(){
  it('should respond with a JSON array of boxes', function(done){
    request(app)
      .get('/api/boxes')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should be able to retrieve one instance of a box', function(done){
    request(app)
      .get('/api/boxes/SIS01')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if (err) return done(err);
        var box = res.body;
        should.exist(box);
        box.name.should.be.equal('SIS01');
        done();
      });
  });

  it('should be able to add an instance of a box', function(done){
    var box = {
      name: 'TestBox',
      address: '10.2.5.23',
      port: '1667'
    };

    request(app)
      .post('/api/boxes')
      .send(box)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });

  it('should update a box', function(done){
    var box = {
      address: 'changed'
    };

    request(app)
      .put('/api/boxes/SIS02')
        .send(box)
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);

          request(app)
            .get('/api/boxes/SIS02')
              .expect(200)
              .end(function(err, res){
                var found = res.body;
                found.address.should.be.equal('changed');
                done();
              });
        });
  });
});