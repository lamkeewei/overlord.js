'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Thing = mongoose.model('Thing'),
  Box = mongoose.model('Box'),
  File = mongoose.model('File');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function() {
  Thing.create({
    name : 'HTML5 Boilerplate',
    info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    awesomeness: 10
  }, {
    name : 'AngularJS',
    info : 'AngularJS is a toolset for building the framework most suited to your application development.',
    awesomeness: 10
  }, {
    name : 'Karma',
    info : 'Spectacular Test Runner for JavaScript.',
    awesomeness: 10
  }, {
    name : 'Express',
    info : 'Flexible and minimalist web application framework for node.js.',
    awesomeness: 10
  }, {
    name : 'MongoDB + Mongoose',
    info : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
    awesomeness: 10
  }, function() {
      console.log('finished populating things');
    }
  );
});

// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, function() {
      console.log('finished populating users');
    }
  );
});

// Clear old boxes, then add new ones
Box.find({}).remove(function(){
  Box.create({
    name: 'SIS01',
    address: '10.20.5.23',
    port: '1667',
    status: 'Offline'
  }, {
    name: 'SIS02',
    address: '10.20.5.24',
    port: '1667',
    status: 'Offline'
  }, function(){
    console.log('finished populating boxes');
  }, {
    name: 'SIS03',
    address: '10.20.5.23',
    port: '1667',
    status: 'Offline'
  }, {
    name: 'SIS04',
    address: '10.20.5.24',
    port: '1667',
    status: 'Offline'
  }, function(){
    console.log('finished populating boxes');
  }, {
    name: 'SIS05',
    address: '10.20.5.23',
    port: '1667',
    status: 'Offline'
  }, {
    name: 'SIS06',
    address: '10.20.5.24',
    port: '1667',
    status: 'Offline'
  }, function(){
    console.log('finished populating boxes');
  } ,{
    name: 'SIS07',
    address: '10.20.5.23',
    port: '1667',
    status: 'Offline'
  }, {
    name: 'SIS08',
    address: '10.20.5.24',
    port: '1667',
    status: 'Offline'
  }, function(){
    console.log('finished populating boxes');
  }, {
    name: 'SIS01',
    address: '10.20.5.23',
    port: '1667',
    status: 'Offline'
  }, {
    name: 'SIS02',
    address: '10.20.5.24',
    port: '1667',
    status: 'Offline'
  }, function(){
    console.log('finished populating boxes');
  }, {
    name: 'SIS01',
    address: '10.20.5.23',
    port: '1667',
    status: 'Offline'
  }, {
    name: 'SIS02',
    address: '10.20.5.24',
    port: '1667',
    status: 'Offline'
  }, function(){
    console.log('finished populating boxes');
  });
});