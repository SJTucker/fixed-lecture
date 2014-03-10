/* jshint expr: true */

'use strict';


var expect = require('chai').expect;
var Task;
var Priority;
var t1;
var t2;
var t3;
var t4;
var t5;
var p1;
var p2;
var p3;

describe('Task', function(){


  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Task = global.nss.Task;
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      t1 = new Task({name: 'clean', dueDate: '03/08/2014', tags: 'home'});
      t2 = new Task({name: 'do dishes', dueDate: '03/09/2014', tags: 'home'});
      t3 = new Task({name: 'walk dog', dueDate: '03/08/2014', tags: 'pets, exercise'});
      t4 = new Task({name: 'feed fish', dueDate: '03/08/2014', tags: 'pets, home'});
      t5 = new Task({name: 'buy groceries', dueDate: '03/11/2014', tags: 'home, shopping'});
      p1 = new Priority({name: 'High', value: '10'});
      p2 = new Priority({name: 'Medium', value: '5'});
      p3 = new Priority({name: 'Low', value: '1'});
    
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            t4.save(function(){
              t5.save(function(){
                p1.save(function(){
                  p2.save(function(){
                    p3.save(function(){
                      t1._priorityId = p2._id.toString();
                      t2._priorityId = p1._id.toString();
                      t3._priorityId = p1._id.toString();
                      t4._priorityId = p3._id.toString();
                      t5._priorityId = p1._id.toString();

                      t3.isComplete = true;
                      t4.isComplete = true;
                      t5.isComplete = true;
                      t1.save(function(){
                        t2.save(function(){
                          t3.save(function(){
                            t4.save(function(){
                              t5.save(function(){
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
      });
    });
  });


  afterEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('new', function(){
    it('should create a new Task object', function(){
      var t1 = new Task({name: 'clean', dueDate: '03/08/2014', tags: 'home'});
  
      expect(t1).to.be.instanceof(Task);
      expect(t1.dueDate).to.be.instanceof(Date);
      expect(t1).to.have.property('name').and.equal('clean');
      expect(t1).to.have.property('dueDate').and.deep.equal(new Date('03/08/2014'));
      expect(t1).to.have.property('tags').and.deep.equal(['home']);
    });
  });

  describe('#save', function(){
    it('should save a Task object', function(done){
      var t3 = new Task({name: 'walk dog', dueDate: '03/08/2014', tags: 'pets, exercise'});
      t3.save(function(err){
        expect(err).to.be.null;
        expect(t3).to.be.instanceof(Task);
        expect(t3.name).to.equal('walk dog');
        expect(t3.tags).to.deep.equal(['pets', 'exercise']);
        expect(t3).to.have.property('_id').and.be.ok;
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should return all the tasks in the database', function(done){
      Task.findAll(function(tasks){
        expect(tasks).to.have.length(5);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should return one task from the database by its ID', function(done){
      Task.findById(t2._id.toString(), function(task){
        expect(task).to.be.instanceof(Task);
        expect(task.name).to.equal('do dishes');
        expect(task._id.toString()).to.equal(t2._id.toString());
        done();
      });
    });
  });

  describe('.findByPriority', function(){
    it('should return one or more tasks from the database by their priority', function(done){
      Task.findByPriority(p1._id.toString(), function(tasks){
        expect(tasks).to.have.length;
        done();
      });
    });
  });

  describe('.filter', function(){
    it('should filter tasks based on query', function(done){
      Task.filter({tag:'home'}, function(tasks){
        expect(tasks).to.have.length(4);
        done();
      });
    });
  });

  describe('.findByComplete', function(){
    it('should return tasks from the database by their completion status', function(done){
      Task.findByComplete(true, function(tasks){
        expect(tasks).to.have.length(3);
        done();
      });
    });
  });

  describe('.findByTag', function(){
    it('should return tasks from the database by their tags', function(done){
      Task.findByTag('home', function(tasks){
        expect(tasks).to.have.length(4);
      });
      Task.findByTag('pets', function(tasks){
        expect(tasks).to.have.length(2);
        done();
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete one task in the database based on ID', function(done){
      Task.deleteById(t1._id.toString(), function(count){
        expect(count).to.equal(1);
        Task.findAll(function(tasks){
          expect(tasks).to.have.length(4);
          done();
        });
      });
    });
  });





});


