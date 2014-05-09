'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    boxes = require('./controllers/boxes.js'),
    file = require('./controllers/files.js'),
    middleware = require('./middleware'),
    upload = require('./controllers/upload.js'),
    multiparty = require('connect-multiparty')();

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);
  
  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  app.route('/api/boxes')
    .post(boxes.create)
    .get(boxes.getAll);

  app.route('/api/boxes/:name')
    .get(boxes.getOne)
    .put(boxes.update)
    .delete(boxes.deleteBox);

  app.route('/api/files')
    .post(file.create)
    .get(file.getAllFiles);

  app.route('/api/files/:id')
    .delete(file.delete);

  app.route('/api/files/deploy/:id')
    .get(file.deploy);

  app.route('/api/files/upload')
    .post(multiparty, upload.uploadFile)
    .get(upload.statusCheck);

  app.route('/api/files/download/:identifier')
    .get(upload.downloadFile);
    
  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};