(function(){
  
  'use strict';

  $(document).ready(init);

  var timer;

  function init(){

    //setTimeout(alertMe, 5000);
    $('#start').click(start);
    $('#stop').click(stop);
    $('#reset').click(reset);
  }

 // function alertMe(){
 //   alert('this was called by a timer');
 // }

  function start(){
//    setTimeout(makeColorBox, 500);
    timer = setInterval(makeColorBox, 1000);
  
  }

  function makeColorBox(){
    var $div = $('<div>');
    $div.addClass('box');
    $div.css('background-color', randomColor());
    $('body').css('background-color', randomColor());
    $('#container').prepend($div);
  }

  function stop(){
    clearInterval(timer);
  }

  function reset(){
    $('#container').text('');
    $('body').css('background-color', 'white');
  }

  function randomColor(){
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var alpha = Math.random();

    var color =  'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
    return color;
  }


})();
