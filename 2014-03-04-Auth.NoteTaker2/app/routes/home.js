'use strict';


exports.index = function(req, res){
  res.render('home/index', {user: res.locals.user, title: 'Note II ;)'});
};

