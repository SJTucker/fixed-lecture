'use strict';

process.env.DBNAME = 'note2-test';
var app = require('../../app/app');
var expect = require('chai').expect;
var request = require('supertest');
var u1;
var u2;
var u3;
var User;

describe('users', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      u1 = new User({email: 'bob@aol.com', password: '1234'});
      u2 = new User({email: 'sue@aol.com', password: '4567'});
      u3 = new User({email: 'sam@aol.com', password: '7899'});
      u1.hashPassword(function(){
        u2.hashPassword(function(){
          u3.hashPassword(function(){
            u1.insert(function(){
              u2.insert(function(){
                u3.insert(function(){
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  describe('GET /', function(){
    it('should display the home page', function(done){
      request(app)
      .get('/')
      .expect(200, done);
    });
  });

  describe('GET /auth', function(){
    it('should respond to auth route', function(done){
      request(app)
      .get('/auth')
      .expect(200, done);
    });
  });

  describe('POST /register', function(){
    it('should register a user', function(done){
      request(app)
      .post('/register')
      .field('email', 'bob1@aol.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });

    it('should not register use due to duplicate', function(done){
      request(app)
      .post('/register')
      .field('email', 'bob@aol.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('User Authentication');
        done();
      });
    });
  });

  describe('POST /login', function(){
    it('should login a user', function(done){
      request(app)
      .post('/login')
      .field('email', 'bob@aol.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });

    it('should not login a user due to bad login', function(done){
      request(app)
      .post('/login')
      .field('email', 'sue@aol.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('User Authentication');
        done();
      });
    });
  });

});
