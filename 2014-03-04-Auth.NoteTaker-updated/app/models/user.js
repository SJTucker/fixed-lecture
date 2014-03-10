'use strict';

module.exports = User;
var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');
var Mongo = require('mongodb');


function User(user){
  this.email = user.email;
  this.password = user.password;
}

User.prototype.hashPassword = function(fn){
  var self = this;
  bcrypt.hash(this.password, 8, function(err, hash){
    self.password = hash;
    fn();
  });
};

User.prototype.insert = function(fn){
  var self = this;

  users.findOne({email:this.email}, function(err, user){
    if(!user){
      users.insert(self, function(err, record){
        fn(record);
      });
    } else {
      fn(null);
    }
  });
};

User.findById = function(id, fn){
  var _id = new Mongo.ObjectID(id);
  users.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};

User.findByEmailAndPassword = function(email, password, fn){
  users.findOne({email:email}, function(err, foundUser){
    if(foundUser){
      bcrypt.compare(password, foundUser.password, function(err, result){
        if (result){
          fn(foundUser);
        } else {
          fn(null);
        }
      });
    }else{
      fn(null);
    }
  });
};
