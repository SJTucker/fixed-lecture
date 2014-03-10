/* jshint expr: true */

'use strict';

process.env.DBNAME = 'note2-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var n1, n2, n3, n4, n5, n6;
var sue, bob, tyler;
var Note;
var User;

describe('Note', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Note = require('../../app/models/note');
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      sue = new User({email: 'sue@aol.com', password: '2222'});
      bob = new User({email: 'bob@aol.com', password: '2223'});
      tyler = new User({email: 'tyler@aol.com', password: '2224'});
      n1 = new Note({title:'Taking notes on notes', body:'Take some notes!', dateCreated:'03/05/2014', tags:'work, class'});
      n2 = new Note({title:'Homework', body:'Work on notes project', dateCreated:'03/07/2014', tags:'work, class'});
      n3 = new Note({title:'Store', body:'Buy groceries', dateCreated:'03/06/2014', tags:'home, food, shopping'});
      n4 = new Note({title:'Lift', body:'Get swolled up with weights', dateCreated:'03/06/2014', tags:'exercise, beauty'});
      n5 = new Note({title:'Haircut', body:'Get a haircut', dateCreated:'03/10/2014', tags:'beauty'});
      n6 = new Note({title:'Walk Dog', body:'Walk the dog', dateCreated:'03/06/2014', tags:'home, pets'});
      
      
      
      sue.hashPassword(function(){
        sue.insert(function(){
          n1.userId = sue._id;
          n2.userId = sue._id;
          n1.insert(function(){
            n2.insert(function(){
              bob.hashPassword(function(){
                bob.insert(function(){
                  n3.userId = bob._id;
                  n4.userId = bob._id;
                  n3.insert(function(){
                    n4.insert(function(){
                      tyler.hashPassword(function(){
                        tyler.insert(function(){
                          n5.userId = tyler._id;
                          n6.userId = tyler._id;
                          done();
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  describe('new', function(){
    it('should create a new Note object', function(){
      n1 = new Note({title:'Taking notes on notes', body:'Take some notes!', dateCreated:'03/05/2014', tags:'work, class', userId:sue._id.toString()});
      expect(n1).to.be.instanceof(Note);
      expect(n1.title).to.equal('Taking notes on notes');
      expect(n1.body).to.equal('Take some notes!');
      expect(n1.dateCreated.toDateString()).to.deep.equal(new Date('03/05/2014').toDateString());
      expect(n1.tags[0]).to.equal('work');
      expect(n1.userId).to.be.instanceof(Mongo.ObjectID);
    });

    it('should create a new Note obj with default date', function(){
      n1 = new Note({title:'Taking notes on notes', body:'Take some notes!', tags:'work, class', userId:sue._id.toString()});
      expect(n1.dateCreated.toDateString()).to.deep.equal(new Date().toDateString());
    });

    it('should create a new Note obj with empty tags', function(){
      n1 = new Note({title:'Taking notes on notes', body:'Take some notes!', dateCreated:'03/05/2014', tags:'', userId:sue._id.toString()});
      expect(n1.tags).to.have.length(0);
    });
  });

  describe('#insert', function(){
    it('should insert a note into db', function(done){
      n2.insert(function(){
        expect(n2.title).to.equal('Homework');
        expect(n2.body).to.equal('Work on notes project');
        expect(n2.dateCreated.toDateString()).to.deep.equal(new Date('03/07/2014').toDateString());
        expect(n2.tags[0]).to.equal('work');
        expect(n2._id).to.be.instanceof(Mongo.ObjectID);
        expect(n2.userId).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.findByUserId', function(){
    it('should return notes that belong to a user', function(done){
      Note.findByUserId(bob._id.toString(), function(notes){
        expect(notes).to.have.length(2);
        expect(notes[0].title).to.equal('Store');
        done();
      });
    });
  });


});
