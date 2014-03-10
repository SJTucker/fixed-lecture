/* jshint expr: true */

'use strict';

process.env.DBNAME = 'todo-test';
var expect = require('chai').expect;
var Priority;
var p1;
var p2;
var p3;


describe('Priority', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Priority = require('../../app/models/priority_models');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      p1 = new Priority({name:'High', value: '10'});
      p2 = new Priority({name:'Medium', value: '5'});
      p3 = new Priority({name:'Low', value: '1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            done();
          });
        });
      });
    });
  });
    
  describe('new', function(){
    it('should be create a new Priority', function(){
      var priority = {name: 'High', value: 10};
      var pEx = new Priority(priority);

      expect(pEx).to.be.instanceof(Priority);
      expect(pEx.name).to.equal('High');
      expect(pEx.value).to.equal(10);
    });
  });

  describe('#save', function(){
    it('should save a new priority in the database', function(done){
      var priority = {name: 'High', value: 10};
      var pEx = new Priority(priority);
      pEx.save(function(err){
        expect(err).to.be.null;
        expect(pEx.name).to.equal('High');
        expect(pEx.value).to.equal(10);
        expect(pEx).to.have.property('_id').and.be.ok;
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should find all the priorities in the database', function(done){
      Priority.findAll(function(priorities){
        expect(priorities).to.have.length(3);
        done();
      });
    });
  });

  describe('.findByName', function(){
    it('should find a priority by its name', function(done){
      Priority.findByName('High', function(priority){
        expect(priority).to.be.instanceof(Priority);
        expect(priority.value).to.equal(10);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a priority by its name', function(done){
      Priority.findById(p2._id.toString(), function(priority){
        expect(priority).to.be.instanceof(Priority);
        expect(priority.name).to.equal('Medium');
        done();
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete a priority by its id', function(done){
      Priority.deleteById(p3._id.toString(), function(count){
        expect(count).to.equal(1);
      });
      Priority.findAll(function(priorities){
        expect(priorities).to.have.length(2);
        done();
      });
    });
  });
});
