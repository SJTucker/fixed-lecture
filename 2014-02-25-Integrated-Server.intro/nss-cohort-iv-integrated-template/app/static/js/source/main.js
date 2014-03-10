(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#add').click(add);
    $('#prod').click(prod);
  }

  function add(){
    var a = $('#a').val();
    var b = $('#b').val();
    var url = '/calc/add?a=' + a + '&b=' + b;
    $.getJSON(url, function(data){
      console.log(data);
      $('#sum').append('Sum=' + data.result);

    });

  }

  function prod(){
    var url = '/calc/prod?nums=';
    var nums = $('#nums').val();
    for(var i = 0; i < nums.length; i++){
      url += nums[i];
    }
    $.getJSON(url, function(data){
      console.log(data);
      $('#product').append('Product=' + data.product);
    });
  }

  //function prod =

})();

