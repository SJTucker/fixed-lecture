'use strict';

process.env.DBNAME = 'note2-test';
var app = require('../../app/app');
var request = require('supertest');
var u1, u2, u3;
var User, Note;
var cookie;

describe('notes', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      Note = require('../../app/models/note');
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

  describe('GET /notes', function(){
    it('should not display notes page if user not logged in', function(done){
      request(app)
      .get('/notes')
      .expect(302, done);
    });
  });

  describe('Authorized', function(){
    beforeEach(function(done){
      request(app)
      .post('/login')
      .field('email', 'bob@aol.com')
      .field('password', '1234')
      .end(function(err, res){
        cookie = res.headers['set-cookie'];
        done();
      });
    });

    describe('GET /notes', function(){
      it('should display notes page if user is logged in', function(done){
        request(app)
        .get('/notes')
        .set('cookie', cookie)
        .expect(200, done);
      });
    });

    describe('GET /notes/new', function(){
      it('should display new notes page on click because user is logged in', function(done){
        request(app)
        .get('/notes/new')
        .set('cookie', cookie)
        .expect(200, done);
      });
    });

    describe('POST /notes', function(){
      it('should insert a new note object in the db', function(done){
        var n1 = {title:'Node', body:'node info', dateCreated:'2014-03-24', tags:'hm, prog, code', userId: u2._id.toString()};
        request(app)
        .post('/notes')
        .send(n1)
        .set('cookie', cookie)
        .expect(302, done);
      });
    });

    describe('GET /notes/:id', function(){
      it('should display the note selected on a different page', function(done){
        var n1 = new Note({title:'Node', body:'node info', dateCreated:'2014-03-24', tags:'hm, prog, code', userId: u2._id.toString()});
        n1.insert(function(note){
          request(app)
          .get('/notes/' + n1._id.toString())
          .expect(302, done);
        });
      });
    });

    describe('DELETE /notes/:id', function(){
      it('should delete a note from the notes database', function(done){
        var n1 = new Note({title:'Node', body:'node info', dateCreated:'2014-03-24', tags:'hm, prog, code', userId: u2._id.toString()});
        n1.insert(function(note){
          request(app)
          .del('/notes/' + n1._id.toString())
          .expect(302, done);
        });
      });
    });
  });
});
