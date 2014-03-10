/* global Animal: false, animalFactory: false */

(function(){

  'use strict';

  $(document).ready(initialize);

  var animals = [];

  function initialize(){
    $('#addAnimal').click(addAnimal);
    $('#addPhoto').click(addPhoto);
    event.preventDefault();
    animals = animalFactory();
    displayAnimals(animals);
      
      
      //   $animalTd.text(animals[prop]);
   //   console.log(animals[prop]);
   //   $('table').append($animalTd);
  }

  function displayAnimals(animals) {
    $.each(animals, function(idx, animal){
      var $tr  = $('<tr>');
      var $td1 = $('<td>').append($('<a href=# data-search=species data-value='+animal.species+'>').text(animal.species));
      var $td2 = $('<td>').append($('<a href=# data-search=color data-value='+animal.color+'>').text(animal.color));
      var $td3 = $('<td>').append($('<a href=# data-search=name data-value='+animal.name+'>').text(animal.name));
      var $td4 = $('<td>').append($('<a href=# data-search=age data-value='+animal.age+'>').text(animal.age));
      var $td5 = $('<td>').append($('<a href=# data-search=gender data-value='+animal.gender+'>').text(animal.gender));
      var $td6 = $('<td>').append($('<a href=# data-search=description data-value='+animal.description+'>').text(animal.description));
      var $td7 = $('<td class="img">').append($('<a href=# data-search=photos data-value='+animal.photos[0]+'>')).css('background-image', animal.photos[0]);
      $tr.append($td1, $td2, $td3, $td4, $td5, $td6, $td7);
      $('table').append($tr);
    });
    
    
  }

  function addAnimal(event){
    var species = $('#species').val();
    var color = $('#color').val();
    var age = $('#age').val() * 1;
    var gender = $('#gender').val();
    var description = $('#description').val();
    var photos = getAnimalPhotos();
    var name = $('#name').val();

    var animal = new Animal(name, age, gender, photos, description, color, species);
    animals.push(animal);
   
    


    /*var $speciesDiv = $('<tr><td>');
    $speciesDiv.text('Species: ' + species);
    var $colorDiv = $('<br><div>');
    $colorDiv.text('Color: ' + color);
    var $ageDiv = $('<br><div>');
    $ageDiv.text('Age: ' + age);
    var $genderDiv = $('<br><div>');
    $genderDiv.text('Gender: ' + gender);
    var $descriptionDiv = $('<br><div>');
    $descriptionDiv.text('Description: ' + description);
    $('#formContainer').append($speciesDiv);
    $('#formContainer').append($colorDiv);
    $('#formContainer').append($ageDiv);
    $('#formContainer').append($genderDiv);
    $('#formContainer').append($descriptionDiv);
*/
    
    event.preventDefault();
  }

  function getAnimalPhotos(){
    var $divs = $('#photos > a > div');
    return _.map($divs, function(div){
      return $(div).css('background-image');
    });
  }

  function addPhoto(){
    var url = $('#photo').val();

    var $a = $('<a>');
    $a.attr('href', '#');
    $a.addClass('th radius');

    var $div = $('<div>');
    $div.css('background-image', 'url(' + url + ')');
    $div.addClass('photo');

    $a.append($div);
    $('#photos').append($a);

    $('#photo').val('');
    $('#photo').focus();

    event.preventDefault();
  }
})();

