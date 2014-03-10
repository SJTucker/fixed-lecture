'use strict';

module.exports = Note;
var _ = require('lodash');
var Mongo = require('mongodb');
var notes = global.nss.db.collection('notes');

function Note(note){
  this.title = note.title || '';
  this.body = note.body || '';
  this.dateCreated = note.dateCreated ? new Date(note.dateCreated) : new Date();
  this.tags = note.tags || '';
  this.tags = this.tags.split(',').map(function(tag){return tag.trim();});
  this.tags = _.compact(this.tags);
  this.userId = Mongo.ObjectID(note.userId);
}

Note.prototype.insert = function(fn){
  notes.insert(this, function(err, result){
    fn(result);
  });
};

Note.findByUserId = function(id, fn){
  var _id = Mongo.ObjectID(id);
  notes.find({userId:_id}).toArray(function(err, records){
    fn(records);
  });
};

Note.findById = function(id, fn){
  console.log('idididididid', id);
  var _id = new Mongo.ObjectID(id);
  console.log('Mongo ID', _id);
  notes.findOne({_id:_id}, function(err, record){
    console.log('yyyyyyyyyyyyy');
    console.log(record);
    fn(record);
  });
};

Note.deleteNote = function(id, fn){
  var _id = Mongo.ObjectID(id);
  notes.remove({_id:_id}, function(err, count){
    fn(count);
  });
};
