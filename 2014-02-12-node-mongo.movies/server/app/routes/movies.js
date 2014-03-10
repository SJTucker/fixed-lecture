'use strict';

var Movie = require('../models/movie');
var mongodb = require('mongodb');

exports.create = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  var movie = new Movie(req.body);
  movies.insert(movie, function(err, records){
    res.send(records[0]);
  });
};

exports.index = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  movies.find().toArray(function(err, movies){
    res.send({movies:movies});
  });
};





/*exports.getMovie = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  var id = mongodb.ObjectID(req.params.id);
  console.log(id);
  console.log(req.params.id);

  movies.findOne({_id:id}, function (err, movies){
    console.log(err);
    console.log(movies);
    res.send({movie:movies});
  });
  //console.log(movie);
};*/


















exports.deleteMovie = function(req, res){
  var db = req.app.locals.db;
  var id = mongodb.ObjectID(req.params.id);
  var movies = db.collection('movies');
  console.log(req.params.id);
  console.log(id);
  
  movies.remove({_id: id}, function(err, count){
    res.send({count: count, id: req.params.id});
  });
};


