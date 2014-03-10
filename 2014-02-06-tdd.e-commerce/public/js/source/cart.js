/* exported Cart */

var Cart = (function(){

  'use strict';

  function Cart(){
    this.products = [];

  }

  Cart.prototype.add = function(name, quantity){
    for(var i = 0; i < quantity; i++){
      this.products.push(name);
    }
  };
  debugger;
  Cart.prototype.remove = function(name, quantity){
    var output = _.remove(this.products, function(product){
      for(var i = 0; i < quantity; i++){
        return product.name === name;
      }
    });
    console.log(output);
    return output;
    
    
  };

  return Cart;




})();
