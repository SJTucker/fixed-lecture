'use strict';

exports.index = function(req, res){
 // console.log(req);
 // console.log(res);
  res.jsonp({ok:true});
};

exports.name = function(req, res){
  //console.log('i have just received a message from the browser');
  res.jsonp({name: 'My name is node :)'});
};

exports.favColor = function(req, res){
  res.jsonp({color: 'blue'});
};

exports.sum = function(req, res){
  var total = (req.params.a*1) + (req.params.b*1);
  res.jsonp({sum: total});
};

exports.drink = function(req, res){
  var age = parseInt(req.params.age);
  var name = req.params.name;
  var answer;

  if (age < 18){
    answer = 'No';
  }
  else if(age > 17 && age >21){
    answer = 'Maybe';
  }
  else{
    answer = 'Yes';
  }

  var response = 
};

