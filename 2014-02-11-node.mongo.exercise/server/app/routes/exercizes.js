'use strict';

var MongoClient = require('mongodb').MongoClient;
var Exercize = require('../models/exercize');

exports.create = function(req, res){
  console.log('PARAMS');
  console.log(req.params);
  console.log('QUERY');
  console.log(req.query);
  console.log('BODY');
  console.log(req.body);

  MongoClient.connect('mongodb://localhost/gym', function(err, db){
    if(err){throw err;}
    console.log('Connected to Database');

    var exercize = new Exercize(req.body.name, req.body.time, req.body.calories, req.body.date);
    //var exercize = {name: req.body.name, time: req.body.time*1, calories: req.body.calories*1, date: req.body.date};

    db.collection('exercizes').insert(exercize, function(err, exercizes){
      res.send(exercizes[0]);
    });
  });

};

exports.index = function(req, res){
  MongoClient.connect('mongodb://localhost/gym', function(err, db){
    if(err){throw err;}
    
    db.collection('exercizes').find().toArray(function (err, exercizes){
      res.send({exercizes:exercizes});

    });
  });
};

exports.queryName = function(req, res){
  MongoClient.connect('mongodb://localhost/gym', function(err, db){
    if(err){throw err;}
    
    db.collection('exercizes').findOne({name:req.params.name}, function(err, exercize){
      res.send({exercize:exercize});

    });
  });
};
