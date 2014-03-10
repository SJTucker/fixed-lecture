'use strict';

var Stock = require('../lib/stock');

exports.getQuote = function(req, res){
  console.log('i am the get quote function');
  console.log(req.query.symbol);
  var value = getValue();
  var stock = new Stock(req.query.symbol, value);
  console.log(value);
  res.jsonp({stock:stock});
};

function getValue(){
  var value = (Math.random() * 100).toFixed(2);
  value = '$' + value;
  return value;
}
