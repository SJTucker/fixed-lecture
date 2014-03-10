/* jshint unused:false */

var Animal = (function(){

  'use strict';

  function Animal(name, species, gender, age){
    this.name = name;
    this.species = species || 'Not Defined';
    this.gender = gender || 'Not Defined';
    this.age = age || 0;
  }


  return Animal;
})();
