(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#one').click(one);
    $('#two').click(two);
    $('#add').click(add);
    $('#drink').click(drink);

  }

  function one(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/name?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

  function two(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/favColor?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

  function add(){
    var a = $('#num1').val();
    var b = $('#num2').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/sum/' + a + '/' + b + '?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
      $('#sum').text(data.sum);
    });

  }
  
  function drink(){
    var name = $('#name').val();
    var age = $('#age').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/drink/' + name + '/' + age + '?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
      $('#canDrink').text(data.drink);
    });

  }


})();

