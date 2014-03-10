'use strict';

var Note = require('../models/note');

exports.index = function(req, res){
  Note.findByUserId(req.session.userID, function(notes){
    res.render('notes/index', {title: 'Notes', notes:notes});
  });
};

exports.new = function(req, res){
  res.render('notes/new', {title: 'Create a new Note'});
};

exports.create = function(req, res){
  Note.insert(req.body, function(note){
    res.redirect('notes/show');
  });
};
