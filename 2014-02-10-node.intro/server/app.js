'use strict';

//calling in files that it will need
var express = require('express');
var home = require('./routes/home');
var app = express();

//configuration
app.set('port', process.env.PORT || 4000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', home.index);//if the browser sends a GET request to this url it sends it to the correct path
//app.VERB('PATH', WHERE IT ROUTES)
app.get('/name', home.name);
app.get('/favColor', home.favColor);
app.get('/sum/:a/:b', home.sum);
app.get('/drink/:name/:age', home.drink);

var server = require('http').createServer(app);//server actually created
server.listen(app.get('port'), function(){//actually listening for requests
  console.log('Node server listening. Port: ' + app.get('port'));
});

