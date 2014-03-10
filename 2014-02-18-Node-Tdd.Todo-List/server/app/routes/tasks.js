'use strict';

var Task;

exports.create = function(req, res){
  init();

  var task = new Task(req.body);
  task.save(function(){
    res.send(task);
  });
};

exports.index = function(req, res){
  init();

  Task.findAll(function(tasks){
    res.send({tasks:tasks});
  });
};

exports.show = function(req, res){
  init();
  if(req.params.search === 'complete'){
    Task.findByComplete(req.params.id, function(tasks){
      res.send({tasks:tasks});
    });
  }else if(req.params.search === 'priority'){
    Task.findByPriority(req.params.id, function(tasks){
      res.send({tasks:tasks});
    });
  }else if(req.params.search === 'tag'){
    Task.findByTag(req.params.id, function(tasks){
      res.send({tasks:tasks});
    });
  }
};

exports.update = function(req, res){
  init();

  var task = new Task(req.body);
  task.save(function(){
    res.send(task);
  });
};

exports.destroy = function(req, res){
  init();

  Task.deleteById(req.params.id, function(count){
    res.send({count:count, id:req.params.id});
  });
};

function init(){
  Task = global.nss.Task;
}
