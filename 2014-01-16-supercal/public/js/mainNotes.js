$(document).ready(initialize);

/*function initialize(){
  $('#number9').click(display);

  function display(x){
    $('#display').text('9');
  }
};*/
function initialize(){
  $('.number').click(displayNumber);
/*LOGIC WORKS.  OLD VERSION OF JQUERY
    $('#neg').toggle(
        displayNegNumber(), displayNumber()
     );*/
  $('#neg').click(changeSign);
  $('#push').click(pushToQueue);
};

function pushToQueue(){
  var x = $('#display').text();
  $('#display').text('0');
}
function displayNumber(){
 /* var counter = 0;
  if($('#display') == ".")
    var counter++;
  if(counter >
  if($('#display')==$('#display').text(this.textContent) && $('#display').text() != "0")
   $('#display').text($('#display').text() + this.textContent);
  else
    $('#display').text(this.textContent);*/
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



/*function displayNegNumber(){
  var display = $('#display').text();
  var current = this.textContent;
  var output;
  if(current === '.' && display.indexOf('.') !== -1) return;
  
  if(display === '0' && current !== '.')
    output = current;
  else
    output = display + current;

  $('#display').text('-' + output);
  
}*/
  // $('.neg').text('-' + output);
//maybe try in comment below if(this.textContent() === '+/-')

//CRAP  
/* function makeNeg(){
    output = '-' + display + current;
 }

 function makePos(){
    output = display + current;
 }

$('#display').toggle(
    function(){
      $('#display').makeNeg();
    },
    function(){
      $('#display').makePos();
    }
    );*/
/* $("#neg").click(
    $('#display').toggle(
        function(){
         output = '-' + display + current; 
        }, function(){
         output = display + current;
        }
     );*/
 /* if($('#display').text() === '+/-')
    $('#display').toggle(
        function(){
         output = '-' + display + current; 
        }, function(){
         output = display + current;
        }
     );*/



//ADD +/-
