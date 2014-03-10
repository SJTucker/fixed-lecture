/* jshint unused: false */

var Stock = (function(){

  'use strict';

  function Stock(symbol, shares, purchaseAmount){
  
    this._symbol = symbol;
    this._shares = shares;
    this._purchaseAmount = purchaseAmount;

  }

  Object.defineProperty(Stock.prototype, 'symbol', {
    get: function(){return this._symbol;}
  });
  
  Object.defineProperty(Stock.prototype, 'shares', {
    get: function(){return this._shares;},
    set: function(shares){this._shares = shares;}
  });
  
  Object.defineProperty(Stock.prototype, 'purchaseAmount', {
    get: function(){return this._purchaseAmount;}
  });

  Stock.prototype.value = function (fn){
    var self = this;//this changes depending on who calls the function so we need a global variable within this function so it can be used by getJSON as well
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + self.symbol + '&callback=?';
    $.getJSON(url, function(quote){
      var total = quote.LastPrice * self.shares;
      fn(total);//calling function (fn) to give value when .value function is called
    });
 
  };


  return Stock;

})();
