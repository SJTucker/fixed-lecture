/* exported Client */
/* global Stock : false */

var Client = (function(){

  'use strict';

  function Client(name, cash){
    this.name = name;
    this.cash = cash;
    this._portfolios = [];


  }

  Object.defineProperty(Client.prototype, 'portfolioCount', {
    get: function(){
      return this._portfolios.length;
    }
  });

  Client.prototype.addPortfolio = function(name){
    var nameArr = [].concat(name);
    for (var i = 0; i < nameArr.length; i++){
      this._portfolios.push(nameArr[i]);
    }
  };

  Client.prototype.getPortfolio = function(input){
    for (var i = 0; i < this.portfolioCount; i++){
      if (input === this._portfolios[i].name){
      }
      return this._portfolios[i];
    }
  };

  Client.prototype.deletePortfolio = function(name){
    var nameArr = [].concat(name);
    var output = _.remove(this._portfolios, function(portfolio){
      return _.contains(nameArr, portfolio.name);
    });

    if (typeof name === 'string'){
      output = output[0];
    }
    return output;
  };


  Client.prototype.value = function (fn){
    var self = this;//this changes depending on who calls the function so we need a global variable within this function so it can be used by getJSON as well
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + self.symbol + '&callback=?';
    $.getJSON(url, function(quote){
      var total = quote.LastPrice * self.shares;
      fn(total);//calling function (fn) to give value when .value function is called
    });
 
  };

  Client.prototype.purchaseStock = function (symbol, amount, fn){
    var self = this;//this changes depending on who calls the function so we need a global variable within this function so it can be used by getJSON as well
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + self.symbol + '&callback=?';
    $.getJSON(url, function(quote){
      var stock;
      var total = quote.LastPrice * amount;

      if(self.cash - total >= 0){
        stock = new Stock(symbol, amount, quote.LastPrice);
        self.cash -=total;
      }

      fn(stock);
    });
  };

  Client.prototype.sellStock = function(stock, amount, fn){
    var self = this;
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + self.symbol + '&callback=?';
    
    $.getJSON(url, function(quote){
      if(amount <= stock.shares){
        var total = quote.LastPrice * amount;
        self.cash += total;
        stock.shares -= amount;
      }

      fn(stock);
    });
  };


  return Client;


})();
