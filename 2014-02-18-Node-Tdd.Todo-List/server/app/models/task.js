'use strict';

module.exports = Task;
var tasks = global.nss.db.collection('tasks');
var Mongo = require('mongodb');
//var _ = require('lodash');

function Task(task){
  this._id = task._id;
  this.name = task.name;
  this.dueDate = new Date(task.dueDate);
  this.isComplete = task.isComplete || false;
  this._priorityId = task._priorityId;

  if(task.tags instanceof Array){
    this.tags = task.tags;
  }else{
    this.tags = task.tags ? task.tags.split(', ') : [];
  }

}

Task.prototype.save = function(fn){
  var self = this;

  if(self._id){
    tasks.save(self,function(err, record){
      fn(err);
    });
  }else{
    tasks.save(self,function(err, record){
      fn(err);
    });
  }
};

Task.filter = function(query, fn){
  if(!query){
    Task.findAll(function(tasks){
      fn(tasks);
    });
  }
  else if(query.tag){
    tasks.findByTag(query.tag, function(tasks){
      fn(tasks);
    });
  }
};

Task.findAll = function(fn){
  tasks.find().toArray(function(err, records){
    fn(records);
  });
};

Task.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  tasks.findOne({_id:_id}, function(err, record){
    fn(record ? new Task(record) : null);
  });
};

Task.findByTag = function(tags, fn){
  tasks.find({tags:tags}).toArray(function(err, records){
    fn(records);
  });
};

Task.findByName = function(name, fn){
  tasks.findOne({name:name}, function(err, record){
    fn(record ? new Task(record) : null);
  });
};

Task.findByPriority = function(id, fn){
  tasks.find({prioirtyId:id}).toArray(function(err, records){
    fn(records);
  });
};

Task.findByComplete = function(value, fn){
  console.log(value);
  tasks.find({isComplete:value}).toArray(function(err, records){
    fn(records);
  });
};

Task.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  tasks.remove({_id:_id},function(err, count){
    fn(count);
  });
};

Object.defineProperty(Task.prototype, 'priorityId', {
  get: function(){return this._priorityId;},
  set: function(priorityId){this._priorityId = Mongo.ObjectID(priorityId);}
});
