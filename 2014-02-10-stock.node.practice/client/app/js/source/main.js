(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#quote').click(quote);
  }

  function quote(){
    var symbol = $('#symbol').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/quote?symbol=' + symbol + '&callback=?';
    console.log(url);
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

})();

