/* global stop: false, Portfolio: false, Client: false, portfolioFactory: false, throws: false, start: false, stockFactory: false, test: false, asyncTest: false,  ok: false, deepEqual: false, Stock: false, Client: false */
/* jshint unused: false */
'use strict';

test('Stock#new', function() {
  var s1 = new Stock('AAPL', 50, 25);

  throws(function(){
    s1.symbol = 'abc';
  }, 'should not be able to set symbol on s1');

 // throws(function(){
 //   s1.shares = 60;
 // }, 'should not be able to set shares on s1');

  throws(function(){
    s1.purchaseAmount = 10;
  }, 'should not be able to set purchaseAmount on s1');

  ok(s1 instanceof Stock, 's1 should be an instance of Stock');
  deepEqual(s1.symbol, 'AAPL', 's1 should be AAPL');
  deepEqual(s1.shares, 50, 's1 should have 50 shares');
  deepEqual(s1.purchaseAmount, 25, 's1 should have a purchase amount of 25');
});

/*asyncTest('Stock#getQuote', function(){
  var s1 = stockFactory('AAPL', 50, 25);
  s1.getQuote(function(quote){

    ok(quote.LastPrice > 0, 'appl quote should be greater than zero');
    start();
  });
}); */

asyncTest('Stock#value', function(){
  var s1 = new Stock('AAPL', 50, 25);
  s1.value(function(val){

    ok(val > 0, 'appl total value should be above zero');
    start();
  });
});

///////////////////////////////PORTFOLIO////////////////////////////////////////////

test('Portfolio#new', function(){
  var p1 = new Portfolio('Tech Stocks');

  ok(p1 instanceof Portfolio, 'p1 should be an instance of Portfolio');
  deepEqual(p1.name, 'Tech Stocks', 'p1 should have a name');
  deepEqual(p1.stockCount, 0, 'p1 should have no stocks');

});

test('Portfolio#addStock', function(){
  var p1 = new Portfolio('Tech Stocks');
  var s1 = new Stock('APPL', 50, 20);
  var s2 = new Stock('MSFT', 150, 25);
  var s3 = new Stock('AMZN', 250, 30);
  var s4 = new Stock('TNIM', 350, 35);


  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock([s3, s4]);

  deepEqual(p1.stockCount, 4, 'p1 should have 4 stocks');
});

test('Portfolio#getStock', function(){
  var p1 = new Portfolio('Tech Stocks');
  var s1 = new Stock('APPL', 50, 20);
  var s2 = new Stock('MSFT', 150, 25);
  var s3 = new Stock('AMZN', 250, 30);
  var s4 = new Stock('TNIM', 350, 35);


  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock([s3, s4]);

  var g2 = p1.getStock(['AMZN', 'TNIM']);
  var g1 = p1.getStock('MSFT');

  ok(g1 === s2, 'g1 should be s2');
  deepEqual(g1.symbol, 'MSFT', 'g1 should have a name of MSFT');
 // deepEqual(g2.length, 2, 'stocks should have a length of 2');
  deepEqual(g2[1].symbol, 'TNIM', 'stocks at index 1 should have a name of TNIM');
});

test('Portfolio#deleteStock', function(){
  var p1 = new Portfolio('Tech Stocks');
  var s1 = new Stock('AAPL', 50, 25);
  var s2 = new Stock('MSFT', 50, 25);
  var s3 = new Stock('AMZN', 50, 25);
  var s4 = new Stock('GOOG', 50, 25);


  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock(s3);
  p1.addStock(s4);

  var s5 = p1.deleteStock('MSFT');
  var s6 = p1.deleteStock(['GOOG', 'AMZN']);

  deepEqual(p1.stockCount, 1, 'p1 should have 2 stocks');
  deepEqual(s5.symbol, 'MSFT', 'the deleted stock should be MSFT');
  deepEqual(s6[0].symbol, 'AMZN', 's6 at one should have a name of AMZN');

});


///////////////////////////////////CLIENT/////////////////////////////////////////


test('Client#new', function(){
  var c1 = new Client('James Brown');

  ok(c1 instanceof Client, 'c1 should be an instance of Client');
  deepEqual(c1.name, 'James Brown', 'c1 should have a name of James Brown');
  deepEqual(c1.portfolioCount, 0, 'c1 should have no portfolio');

});

test('Client#cash', function(){
  var c1 = new Client('James Brown', 100000);

  ok(c1.cash, 100000, 'c1 should have 100000 in cash');

});

/*asyncTest('Client#purchaseStock', function(){
  stop();
  var c1 = new Client('James Brown', 100000);
  c1.purchaseStock('AMZN', 50, function(stock){
    ok(stock instanceof Stock, 'should be a stock');
    deepEqual(stock.shares, 50, 'shoud be 50 shares');
    deepEqual(stock.symbol, 'AMZN', 'shoud be APPL');
    ok(c1.cash < 100000, 'should have less than 100$k');
    start();
  });

  var c2 = new Client('Harvey Danger', 100000);
  c2.purchaseStock('AMZN', 25000, function(stock){
    ok(!stock, 'should not be a stock');
    ok(c2.cash === 100000, 'should have have 100$k');
    start();
  });
});*/

asyncTest('Client#purchaseStock', function() {
  stop();
  var c1 = new Client('Bob Smith', 100000);
  c1.purchaseStock('AAPL', 50, function(stock){
    ok(stock instanceof Stock, 'should be a stock');
    deepEqual(stock.shares, 50, 'should be 50 shares');
    deepEqual(stock.symbol, 'AAPL', 'should be aapl');
    ok(c1.cash < 100000, 'should have less than $100k');
    start();
  });

  var c2 = new Client('Bob Smith', 100000);
  c2.purchaseStock('AAPL', 25000, function(stock){
    ok(!stock, 'should not be a stock');
    deepEqual(c2.cash, 100000, 'should have $100k');
    start();
  });
});

asyncTest('Client#sellStock', function(){
  var c1 = new Client('James Brown', 100000);
  var s1 = new Stock('AAPL', 50, 250);
  c1.sellStock(s1, 10, function(stock){
    ok(stock instanceof Stock, 'should be a stock');
    deepEqual(stock.shares, 40, 'shoud be 50 shares');
    deepEqual(stock.symbol, 'AAPL', 'shoud be APPL');
    ok(c1.cash < 100000, 'should have less than 100$k');
    start();
  });
});

test('Client#addPortfolio', function(){
  var c1 = new Client('James Brown');
  var s1 = new Stock('AAPL', 50, 25);
  var s2 = new Stock('MSFT', 50, 25);
  var s3 = new Stock('AMZN', 50, 25);
  var p1 = new Portfolio('TECH STOCKS');
  var p2 = new Portfolio('ENERGY STOCKS');
  var p3 = new Portfolio('AGRO STOCKS');
  p1.addStock(s1);
  p2.addStock(s2);
  p3.addStock(s3);

  c1.addPortfolio(p1);
  c1.addPortfolio(p2);
  c1.addPortfolio(p3);

  ok(c1.name === 'James Brown', 'The name of c1 shoud be James Brown');
  deepEqual(c1._portfolios[0].name, 'TECH STOCKS', 'c1 at 0 should have name of TECH STOCKS');
  deepEqual(c1.portfolioCount, 3, 'c1 should have 3 portfolios');
});

test('Client#getPortfolio', function(){
  var c1 = new Client('James Brown');
  var c2 = new Client('Brouce John');
  var s1 = new Stock('AAPL', 30, 25);
  var s2 = new Stock('MSFT', 80, 35);
  var s3 = new Stock('AMZN', 50, 45);
  var s4 = new Stock('NSDC', 70, 15);
  var s5 = new Stock('SHEL', 90, 55);
  var s6 = new Stock('BPET', 60, 65);
  var p1 = new Portfolio('TECH STOCKS');
  var p2 = new Portfolio('ENERGY STOCKS');
  var p3 = new Portfolio('AGRO STOCKS');
  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock(s3);
  p2.addStock([s4, s5]);
  p3.addStock(s6);
  c1.addPortfolio(p1);
  c1.addPortfolio(p2);
  c2.addPortfolio(p3);

  var g1 = c1.getPortfolio('TECH STOCKS');
  var g2 = c2.getPortfolio('AGRO STOCKS');
  var g3 = c1.getPortfolio('ENERGY STOCKS');

  ok(g1 === p1, 'g1 should be equal to p1');
  ok(g2 === p3, 'g3 should be equal to p3');
  deepEqual(c1.portfolioCount, 2, 'c1 portfolio count should be 2');
  deepEqual(c2.portfolioCount, 1, 'c2 portfolio count should be 2');
  deepEqual(c1.name, 'James Brown', 'c1 name should be James Brown');
  deepEqual(c2.name, 'Brouce John', 'c1 name should be James Brown');
});

test('Client#deletePortfolio', function(){
  var c1 = new Client('James Brown');
  var c2 = new Client('Brouce John');
  var s1 = new Stock('AAPL', 30, 25);
  var s2 = new Stock('MSFT', 80, 35);
  var s3 = new Stock('AMZN', 50, 45);
  var s4 = new Stock('NSDC', 70, 15);
  var s5 = new Stock('SHEL', 90, 55);
  var s6 = new Stock('BPET', 60, 65);
  var p1 = new Portfolio('TECH STOCKS');
  var p2 = new Portfolio('ENERGY STOCKS');
  var p3 = new Portfolio('AGRO STOCKS');
  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock(s3);
  p2.addStock([s4, s5]);
  p3.addStock(s6);
  c1.addPortfolio(p1);
  c1.addPortfolio(p2);
  c2.addPortfolio(p3);

  var g1 = c1.deletePortfolio('TECH STOCKS', 'ENERGY STOCKS');
  var g2 = c2.deletePortfolio('AGRO STOCKS');
  //var g3 = c1.deletePortfolio('ENERGY STOCKS');

  ok(g1 === p1, 'g1 should be equal to p1');
  ok(g2 === p3, 'g3 should be equal to p3');
  deepEqual(c1.portfolioCount, 1, 'c1 portfolio count should be 0');
  deepEqual(c2.portfolioCount, 0, 'c2 portfolio count should be 0');
  deepEqual(c1.name, 'James Brown', 'c1 name should be James Brown');
  deepEqual(c2.name, 'Brouce John', 'c1 name should be Brouce John');
});


