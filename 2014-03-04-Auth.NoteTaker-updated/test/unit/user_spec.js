/* jshint expr: true */

'use strict';

process.env.DBNAME = 'note2-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var u1;
var u2;
var u3;
var User;

describe('User', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
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

  describe('new', function(){
    it('should create a new User object', function(){
      var u1 = new User({email: 'bob@aol.com', password: '1234'});
      expect(u1).to.be.instanceof(User);
      expect(u1.email).to.equal('bob@aol.com');
      expect(u1.password).to.equal('1234');
    });
  });

  describe('#hashPassword', function(){
    it('should hash a pword with salt', function(done){
      expect(u1.password).to.not.equal('1234');
      done();
    });
  });

  describe('#insert', function(){
    it('should insert a new user into the database', function(done){
      expect(u1.email).to.equal('bob@aol.com');
      expect(u1.password).to.not.equal('1234');
      expect(u1._id).to.be.instanceof(Mongo.ObjectID);
      done();
    });

    it('should prevent duplicate emails from being inserted', function(done){
      var u1 = new User({email: 'bob@aol.com', password: '1234'});
      var u2 = new User({email: 'bob@aol.com', password: '1234'});
      u1.hashPassword(function(){
        u2.hashPassword(function(){
          u1.insert(function(){
            u2.insert(function(user){
              expect(user).to.equal(null);
              expect(u2._id).to.be.undefined;
              done();
            });
          });
        });
      });
    });
  });

  describe('.findById', function(){
    it('should find user by id', function(done){
      User.findById(u2._id.toString(), function(user){
        expect(user._id.toString()).to.have.length(24);
        expect(u2._id).to.deep.equal(user._id);
        expect(user.email).to.equal('sue@aol.com');
        done();
      });
    });
  });

  describe('.findByEmailAndPassword', function(){
    it('should find user by email and password', function(done){
      User.findByEmailAndPassword('sue@aol.com', '4567', function(user){
        expect(user.email).to.equal('sue@aol.com');
        expect(u2._id).to.deep.equal(user._id);
        done();
      });
    });

    it('should return err', function(done){
      User.findByEmailAndPassword('bad@aol.com', '4567', function(user){
        expect(user).to.be.null;
        done();
      });
    });
    
    it('should return err', function(done){
      User.findByEmailAndPassword('sue@aol.com', 'wrong', function(user){
        expect(user).to.be.null;
        done();
      });
    });
  });

});
