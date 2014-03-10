
$(document).ready(initialize);

function initialize(){
  //$ means jQuery
  //$('css or jQuery selector ') must be a string
  $('h1').css('color', 'red');
  $('h1').css('font-size', '30px');
  var currentH1text = $('h1').text();
  console.log(currentH1text);
  $('h1').text('Welcome to Javascript');

  $('div').css('color', 'blue');
  $('#d2').css('font-size', '9px');
  $('#d3').css('background-color', 'yellow');
  
  $('.c1').css({'color':'green', 'background-color':'red'}).text('This is some new text');
  
 // var color = prompt('What color do you want?');
 // $('#d3').css('background-color', color);
 // var text = prompt("What would you like to say?");
 // $('#d3').text(text);

  $('.cp').css
  var numPs = $('.cp').length;
  console.log(numPs);
}
