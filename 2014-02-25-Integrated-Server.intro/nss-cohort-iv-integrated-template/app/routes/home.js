'use strict';

var _ = require('lodash');

exports.index = function(req, res){
  res.render('home/index', {title: 'Express Template'});
};

exports.calc = function(req, res){
  res.render('home/calc', {title: 'Calc'});
};

exports.add = function(req, res){
  var result = parseInt(req.query.a) + parseInt(req.query.b);
  console.log(result);
  res.send({result:result});
};

exports.prod = function(req, res){
  var nums = req.query.nums.split(', ');
  var prod = _.reduce(nums, function(acc, x){return acc * x;}, 1);
  res.send({product:prod});
  //var result = ;
 // console.log(result);
 // res.send({result:result});
};
