(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#product').click(product);
  }

  function product(){
    var numbers = $('#numbers').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += ('/product?numbers=' + numbers + '&callback=?');
    $.getJSON(url, function(data){
      console.log(url);
      console.log(data);
    });
  }
})();

