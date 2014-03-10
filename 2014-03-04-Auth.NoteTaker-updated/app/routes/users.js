'use strict';

var User = require('../models/user');
//var users = global.nss.db.collection('users');

exports.auth = function(req, res){
  res.render('users/auth', {title: 'Login or Register'});
};

exports.register = function(req, res){
  var newUser = new User(req.body);
  newUser.hashPassword(function(){
    newUser.insert(function(foundUser){
      if(foundUser){
        res.redirect('/');
      } else {
        res.render('users/auth', {title:'User Authentication'});
      }
    });
  });
};

exports.login = function(req, res){
  User.findByEmailAndPassword(req.body.email, req.body.password, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id.toString();  // stores user id in Redis and associates with a cookie
        req.session.save(function(){
          res.redirect('/notes');
        });
      });
    }else{
      req.session.destroy(function(){  // destroys session
        res.render('users/auth', {title: 'User Authentication'});
      });
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};
