(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#create').click(create);
  //  $('#calc').click(calc);
  }

  function create(){
    alert('hey');
    var animal = $('#animal').val();
    var name = $('#name').val();
    var gender = $('#gender').val();
    var age = $('#age').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4001');
    url += '/animal?type=' + animal + '&name=' + name + '&gender=' + gender + '&age=' + age + '&callback=?';
    console.log(url);
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

 /* function calc(){
    var names = $('#names').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4001');
    url += '/calcstrings?names' + names + '&callback=?';
    $.getJSON(url, function(data){
      console.log(url);
      console.log(data);
    });
  }*/



})();

