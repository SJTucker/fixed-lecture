/* jshint unused:false */
/* global Animal: false */
var Shelter = (function(){

  'use strict';

  var hours;
  var animals = [];
  
  function Shelter(name){
    this.name = name;
    this.location = 'Not Defined';
    this.capacity = 0;
  }

  Shelter.prototype.placeAnimal = function(name){
    var tmpAnimals =  _.remove(animals, function(animal){
      return animal.name === name;
    });

    return tmpAnimals[0];
  };

  Shelter.prototype.addAnimal = function(animal){
    animals.push(animal);
  };


  Shelter.prototype.setHours = function(times){
      var tmpHours = _.map(times, function(time){
        return time.day +' '+time.open+'-'+time.close;
      });

      hours = tmpHours.join(', ');
    };

  Shelter.prototype.getHours = function(){
    return hours;
  };

  Shelter.prototype.animalCount = function(){
    return animals.length;
  };

  return Shelter;

})();

