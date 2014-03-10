$(document).ready(initialize);

function initialize(){
  $('#add-color').click(clickAddColor);
  $('#add-pixels').click(clickAddPixels);
  $('#colors').on('click', '.color', clickSelectColor);
  $('#pixels').on('mouseover', '.pixel', hoverColorPixel);
 
}

function hoverColorPixel(){
  var color = $('.selectedColor').css('background-color');//get it to tell you what background-color is and place it into color
  $(this).css('background-color', color);
}

function clickAddPixels(){
  var num = $('#number-text').val();
  num = parseInt(num);

  for(var i = 0; i < num; i++){
    var $pixel = $('<div>');
    $pixel.addClass('pixel');
    $('#pixels').prepend($pixel);
  }
}

function clickAddColor(){
  var color = $('#color-text').val();
  $('#color-text').val('');
  $('#color-text').focus();

  var $box = $('<div>');
  $box.addClass('color');
  $box.css('background-color', color);

  $('#colors').prepend($box);
}

function clickSelectColor(){
    
  if($(this).hasClass('selectedColor'))
       $('.color').removeClass('selectedColor');
    else
    {
       $('.color').removeClass('selectedColor');
       $(this).addClass("selectedColor"); 
    }
}

