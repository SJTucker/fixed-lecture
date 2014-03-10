/* global Animal: false */

(function (){
  'use strict';


  window.animalFactory = function(){
    var animals = [];
    var animal;
    var photos;
 
    photos = [];
    photos[0] = 'http://www.sailblogs.com/member/bccjunessa/images/otter_scale.jpg';
    animal = new Animal('Dumpy', 'Seal', 17, 'Male', 'Dumb cat', 'Grey', photos);
    animals.push(animal);
 
    photos = [];
    photos[0] = 'http://warm1013.com/wp-content/uploads/2010/09/dumb-dog.jpg';
    animal = new Animal('Fido', 'Dog', 3, 'Male', 'Dumb dog', 'Tan', photos);
    animals.push(animal);

    photos = [];
    photos[0] = 'http://s-ak.buzzfed.com/static/enhanced/terminal01/2010/5/28/13/enhanced-buzz-7549-1275068134-5.jpg';
    animal = new Animal('Princess', 'Cat',  3, 'Female', 'Dumb cat', 'White', photos);
    animals.push(animal);

    photos = [];
    photos[0] = 'http://s-ak.buzzfed.com/static/enhanced/terminal01/2010/5/28/13/enhanced-buzz-7552-1275066424-6.jpg';
    animal = new Animal('Borris', 'Cat', 3, 'Male', 'Dumb cat', 'Brown', photos);
    animals.push(animal);
 
    photos = [];
    photos[0] = 'http://mokaalamenthe.files.wordpress.com/2011/06/confused-otter2.jpg';
    animal = new Animal('Clumpy', 'Otter', 31, 'Male', 'Dumb Otter', 'Grey', photos);
    animals.push(animal);

    photos = [];
    photos[0] = 'http://i.cdn.turner.com/trutv/trutv.com/graphics/typepad/6a00d83451d24369e2016768b0af06970b-450wi.jpg';
    animal = new Animal('Bartania', 'Dog', 3, 'Female', 'Dumb', 'White', photos);
    animals.push(animal);

    return animals;

  };
})();
