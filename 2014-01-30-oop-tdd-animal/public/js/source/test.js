/* global Client: false, test:false, deepEqual:false, ok:false, Shelter:false, Animal:false */

'use strict';

test('Shelter', function() {
  var shelter = new Shelter();
  var s1 = new Shelter();
  var string = 'my string';

  ok(shelter instanceof Shelter, 'shelter should be an instance of Shelter');
  ok(s1 instanceof Shelter, 's1 should be an instance of Shelter');
  ok(!(string instanceof Shelter), 'string should not be an instance of Shelter');
});

test('Shelter#name', function() {
  var s1 = new Shelter('Green Hills Shelter');

  deepEqual(s1.name, 'Green Hills Shelter' ,'s1 should have a name');
});

test('Shelter#location', function() {
  var s1 = new Shelter('Green Hills Shelter');
  s1.location = 'Main St';
  var s2 = new Shelter('GHS');

  deepEqual(s1.location, 'Main St' ,'s1 should have a location');
  deepEqual(s2.location, 'Not Defined' ,'s2 should have a default location');
});

test('Shelter#capacity', function() {
  var s1 = new Shelter('Green Hills Shelter');

  deepEqual(s1.capacity, 0,'s1 should have a zero capacity');
});

test('Shelter#setHours()', function() {
  var s1 = new Shelter('Green Hills Shelter');
  s1.setHours([
    {day:'Mon', open:'8am', close:'5pm'},
    {day:'Wed', open:'11am', close:'2pm'},
    {day:'Fri', open:'9am', close:'4pm'}
  ]);


  deepEqual(s1.getHours(), 'Mon 8am-5pm, Wed 11am-2pm, Fri 9am-4pm','s1 should have set hours');
});

test('Shelter#addAnimal()', function() {
  var s1 = new Shelter('Green Hills Shelter');
  var a1 = new Animal('fido');
  s1.addAnimal(a1);

  ok(s1.animalCount() === 1, 's1 should have 1 item in array');
});

test('Shelter#placeAnimal()', function() {
  var s1 = new Shelter('Green Hills Shelter');

  var a1 = new Animal('fluffy');
  var a2 = new Animal('fido');
  var a3 = new Animal('francis');

  s1.addAnimal(a1);
  s1.addAnimal(a2);
  s1.addAnimal(a3);

  var a4 = s1.placeAnimal('fido');

  deepEqual(s1.animals.length, 2, 's1 should have 2 item in array');
  deepEqual(a4.name, 'fido', 'get fido from the shelter');
});

test('Animal', function() {
  var a1 = new Animal();

  ok(a1 instanceof Animal, 'a1 should be an instance of Animal');
});

test('Animal#name', function() {
  var a1 = new Animal('fido');

  deepEqual(a1.name, 'fido', 'a1 should have a name');
});

test('Animal#species', function() {
  var a1 = new Animal('fido', 'dog');
  var a2 = new Animal('fido');

  deepEqual(a1.species, 'dog', 'a1 should have a species');
  deepEqual(a2.species, 'Not Defined', 'a2 should not have species set');
});

test('Animal#gender', function() {
  var a1 = new Animal('fido', 'dog', 'male');
  var a2 = new Animal('fido');

  deepEqual(a1.gender, 'male', 'a1 should have a gender');
  deepEqual(a2.gender, 'Not Defined', 'a2 should not have gender set');
});

test('Animal#age', function() {
  var a1 = new Animal('fido', 'dog', 'male', 3);
  var a2 = new Animal('fido');

  deepEqual(a1.age, 3, 'a1 should have an age');
  deepEqual(a2.age, 0, 'a2 should not have an age set');
});




test('Client', function(){
  var c1 = new Client();

  ok(c1 instanceof Client, 'c1 should be an instance of Client');
});

test('Client#name', function(){
  var c1 = new Client('Mike');

  deepEqual(c1.name, 'Mike', 'c1.name should be "Mike"');
});


test('Client#adoptanimal()', function(){
  var c1 = new Client('Jimmy');
  var a1 = new Animal('king', 'dog', 'male', 9);
  var s1 = new Shelter('Green Hill Shlter');
  s1.addAnimal(a1);
  var animal = s1.placeAnimal(a1);
  c1.adoptAnimal(animal);

  ok(c1.animals.length === 1, 'c1 should have 3 animals');
  ok(s1.animals.length === 0, 's1 should have 0 animals');
  deepEqual(animal.name, 'Reemus', 'a3 name should be Reemus');
  deepEqual(animal.species, 'lion', 'a3 name should be lion');
});
