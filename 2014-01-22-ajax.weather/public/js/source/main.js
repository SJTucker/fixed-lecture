/* jshint camelcase:false */  //relaxing options

(function(){
 
  'use strict';

  $(document).ready(init);

  function init(){
    $('#get-weather').click(getWeather);
  }

  function getWeather(){
   // alert('hey');
    var url = 'http://api.wunderground.com/api/8630e9fb327fc4e1/conditions/q/TN/Nashville.json?callback=?';
  //  $.getJSONP(url, fn);
    $.getJSON(url, receive);
  }

  function receive(data){
    var temp = data.current_observation.temperature_string;
    $('h2').text(temp);
  }

})();
