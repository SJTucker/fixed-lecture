/* global test:false, deepEqual: false, ok:false, Person: false, Cart: false, Product: false */

'use strict';

/////////////////////////Product//////////////////////////

test('Product#new', function(){
  var p1 = new Product('iPhone', 350);

  ok(p1 instanceof Product, 'p1 should be an instance of Product');
  deepEqual(p1.name, 'iPhone', 'product 1 should have a name of iPhone');
  deepEqual(p1.price, 350, 'p1 should have a price of 350');
});

////////////////////////Person/////////////////////////////

test('Person#new', function(){
  var s1 = new Person('Bob', 37000);

  ok(s1 instanceof Person, 's1 should be an instance of Person');
  deepEqual(s1.name, 'Bob', 's1 should have a name Bob');
  deepEqual(s1.cash, 37000, 's1 should have 37000 in cash');
});


///////////////////////Cart////////////////////////////////

test('Cart#new', function(){
  var c1 = new Cart();

  ok(c1 instanceof Cart, 'c1 should be an instance of cart');
});

test('Cart#add', function(){
  var s1 = new Person('Bob', 37000);
  var p1 = new Product('iPhone', 350);

  s1.cart.add(p1, 3);
  deepEqual(s1.cart.products[1].name, 'iPhone', 'the second product in the cart should have a name iPhone');
  ok(s1.cart.products.length === 3, 'products should have a length of 3');
});

test('Cart#remove', function(){
  var s1 = new Person('Bob', 37000);
  var p1 = new Product('iPhone', 350);
  var p2 = new Product('book', 10);

  s1.cart.add(p1, 3);
  s1.cart.add(p2,2);
  s1.cart.remove(p1, 1);
  deepEqual(s1.cart.products[1].name, 'iPhone', 'the second product in the cart should have a name iPhone');
  ok(s1.cart.products.length === 4, 'products should have a length of 4');
});
