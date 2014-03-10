'use strict';

var dbname = process.env.DBNAME;
var port = process.env.PORT || 4000;

var d = require('./lib/request-debug');
var connectMongo = require('./lib/connect');

var express = require('express');
var home = require('./routes/home');
var priorities = require('./routes/priorities');
var tasks = require('./routes/tasks');
var app = express();

/* --- pipeline begins */
app.use(connectMongo);
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(require('./lib/cors'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', d, home.index);
app.post('/priorities', d, priorities.create);
app.get('/priorities', d, priorities.index);
app.get('/priorities?', d, priorities.index);
app.get('/priorities/:id', d, priorities.show);
app.put('/priorities/:id', d, priorities.update);
app.del('/priorities/:id', d, priorities.destroy);
app.post('/tasks', d, tasks.create);
app.get('/tasks', d, tasks.index);
app.get('/tasks?', d, tasks.index);
app.get('/tasks/:search/:id', d, tasks.show);
app.put('/tasks/:id', d, tasks.update);
app.del('/tasks/:id', d, tasks.destroy);
/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

module.exports = app;

