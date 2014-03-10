$(document).ready(initialize);

function initialize(){
  $('.number').click(displayNumber);
  $('#neg').click(changeSign);
  $('#push').click(pushToQueue);
  $('.operator').click(compute);
  $('#clear').click(clear);
};

function clear (){
  $('#display').text('0');
  $('#queue').text('');
}
function compute(){
  var operator = this.id;
  var $lis = $('#queue li'); //refactored code by moving variables inside switch to top, before switch
  var numbers = parseTags($lis);
  var total = 0;
  switch(operator){
    case 'add':
      total = numbers[0] + numbers[1];
    //  var aa = $(a).text(); //or aa = a.textContent();
      /* {
        var x = 0;
        for(var i = 0; i < $('#queue li').length; i ++)
          {
            var y = $('#queue li');
            x += y[i];
          }
        return x;
        $('#display').text(x);
      }*/
    break;
    case 'sub':
      total = numbers[1] - numbers[0];
    break;
    case 'mult':
      total = numbers[0] * numbers[1];
    break;
    case 'div':
      total = numbers[0] / numbers[1];
    break;
    case 'sum':
        for(var i = 0; i < numbers.length; i ++)
         total += numbers[i];

    //  for(var i = 0, len = numbers.length; i < len; i ++)
      //    total += numbers[i];

    break;
    case 'pow':
      total = Math.pow(numbers[0], numbers[1]);

  }
      $('#display').text(total);
      $('#queue').empty();
         
}

function pushToQueue(){
  var x = $('#display').text();
  $('#display').text('0');
  var $li = $('<li>');
  $li.text(x);
  $('#queue').prepend($li);
}
function displayNumber(){
  var display = $('#display').text();
  var current = this.textContent;
  var output;
  if(current === '.' && containsChar(display, '.')) return;
  
  if(display === '0' && current !== '.')
    output = current;
  else
    output = display + current;

  $('#display').text(output);
}

function changeSign(){
  var number = $('#display').text();
  number *= -1;
  $('#display').text(number);

}

