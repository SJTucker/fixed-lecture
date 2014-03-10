/* jshint unused: false */



var Portfolio = (function(){

  'use strict';

  function Portfolio(name){
    this.name = name;
    this._stocks = [];

  }

  Object.defineProperty(Portfolio.prototype, 'stockCount', {
    get: function(){
      return this._stocks.length;
    }
  });


  Portfolio.prototype.addStock = function(stock){
    this._stocks.push(stock);
    this._stocks = _.flatten(this._stocks);
  };

  Portfolio.prototype.getStock = function(input){
    var output;
    if(typeof input === 'string'){
      output = findStock(input, this._stocks);
    }
    else{
      output = _.map(input, function(symbol){
        return findStock(symbol, this._stocks);
      }, this);
    }

    return output;
  };

  function findStock(symbol, stocks){
    var x = _.find(stocks, function(stock){
      return stock.symbol === symbol;

    });
    return x;
  }

  Portfolio.prototype.deleteStock = function(input) {
    var stocks = [].concat(input);

    var output = _.remove(this._stocks, function(stock){
      return _.contains(stocks, stock.symbol);
    });

    if(typeof input === 'string'){
      output = output[0];
    }
    return output;
  };
  /*if(stock instanceof Array){
      for(var i = 0; i < stock.length; i++){
        this._stocks.push(stock[i]);
      }
    }

    else{
      this._stocks.push(stock);
    }
  };
 PortfolioFn.prototype.removeStock = function (symbol){
    var tmpStocks = _.remove(stocks, function(stock){
      return stock.getSymbol() === symbol;
    });
    return tmpStocks[0];
  };*/

  return Portfolio;
})();



