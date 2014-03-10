'use strict';

module.exports = Priority;
var priorities = global.nss.db.collection('priorities');
var Mongo = require('mongodb');

function Priority(priority){
  this.name = priority.name;
  this.value = parseInt(priority.value);
  this._id = priority._id;
}

Priority.prototype.save = function(fn){
  /*var self = this;

  if(self._id){
    priorities.save(self, function(err, result){
      fn(err);
    });
  }*/

  priorities.save(this, function(err, record){
    fn(err);
  });
};

Priority.findAll = function(fn){
  priorities.find().toArray(function(err, records){
    fn(records);
  });
};

Priority.findByName = function(name, fn){
  priorities.findOne({name:name}, function(err, record){
    fn(record ? new Priority(record) : null);
  });
};

Priority.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  priorities.findOne({_id:_id}, function(err, record){
    fn(record ? new Priority(record) : null);
  });
};
