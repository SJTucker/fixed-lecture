/* jshint expr:true */

'use strict';

process.env.DBNAME = 'todo-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
var t1;
var t2;
var t3;
var t4;
var t5;
var p1;
var p2;
var p3;
var Task;
var Priority;

describe('tasks', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Task = global.nss.Task;
      Priority = global.nss.Priority;
      done();
    });
  });
  
  /*afterEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });*/

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

  describe('GET /tasks', function(){
    it('should return all the tasks in the database', function(done){
      request(app)
      .get('/tasks')
      .end(function(err, res){
        expect(res.body.tasks).to.have.length(5);
        console.log(res.body);
        expect(res.body.tasks[0].name).to.be.ok;
        expect(res.body.tasks[0]._id).to.have.length(24);
        done();
      });
    });
  });
  
  describe('POST /tasks', function(){
    it('should create a new task in the database', function(done){
      request(app)
      .post('/tasks')
      .send({name:'do one million jumping jacks', dueDate: '02/21/2014', tags:'home, exercise'})
      .end(function(err, res){
        expect(res.body.name).to.equal('do one million jumping jacks');
        //expect(res.body.dueDate).to.equal(new Date('02/21/2014'));
        expect(res.body._id).to.have.length(24);
        done();
      });
    });
  });

  describe('GET /tasks?', function(){
    it('should get tasks based on the tag query', function(done){
      request(app)
      .get('/tasks?tag=home')
      .end(function(err, res){
        expect(res.body.tasks).to.have.length(4);
        done();
      });
    });
  });

  describe('GET /tasks?', function(){
    it('should get tasks based on the priority query', function(done){
      request(app)
      .get('/tasks?priority=High')
      .end(function(err, res){
        expect(res.body.tasks).to.have.length(2);
        done();
      });
    });
  });

  describe('GET /tasks?', function(){
    it('should return tasks based on completion', function(done){
      request(app)
      .get('/tasks?isComplete=true')
      .end(function(err, res){
        expect(res.body.tasks).to.have.length(3);
        done();
      });
    });
  });

  describe('GET /tasks?', function(){
    it('should return tasks based on completion and priority', function(done){
      request(app)
      .get('/tasks?isComplete=false&priority=medium')
      .end(function(err, res){
        expect(res.body.tasks).to.have.length(1);
        done();
      });
    });
  });



  /*describe('GET /tasks/:search/:id', function(){
    it('should get task by its search term and priority id', function(done){
      t1._priorityId = p1._id.toString();
      t3._priorityId = p1._id.toString();
      t1.save(function(){
        t3.save(function(){
          request(app)
          .get('/tasks/priority/'+p1._id.toString())
          .end(function(err, res){
            console.log(res.body.tasks);
            expect(res.body).to.have.length(2);
            expect(res.body[0]).to.have.property(name).and.equal('clean');
            done();

          });
        });
      });
    });
    it('should get task by its seach term and tags', function(done){
      request(app)
      .get('/tasks/tags/pets')
      .end(function(err, res){
        expect(res.body).to.have.length(2);
        done();
      });
    });
  });

  describe('DELETE /tasks/id', function(){
    it('should delete a specific task from the database', function(done){
      request(app)
      .del('/tasks/' + t1._id)
      .end(function(err, res){
        expect(res.body.count).to.equal(1);
        Task.findAll(function(tasks){
          expect(tasks).to.have.length(4);
          done();
        });
      });
    });
  });

  describe('PUT /tasks/id', function(){
    it('should update a specific task in the database', function(done){

      t1.name = 'Take a doo doo';
      t1.tags = 'poo poo';

      request(app)
      .put('/tasks/' + t1._id.toString())
      .send(t1)
      .end(function(err, res){
        expect(res.body.name).to.equal('Take a doo doo');
        expect(res.body.tags).to.deep.equal(['poo poo']);
        expect(res.body._id.toString()).to.equal(t1._id.toString());
        done();
      });
    });
  });*/


});
