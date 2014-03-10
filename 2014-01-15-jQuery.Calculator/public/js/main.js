
$(document).ready(initialize);

function initialize(){
  $('#calc').click(calculate);
  $('#sum').click(sum);
  $('#prod').click(computeProd('#numArray'));
  $('#clear').click(clear);
}

function clear(){
  $('#num1').val('');
  $('#num1').focus('');
  $('#num2').val('');
  $('#fn').val('');
  $('#result').text('');
}

function calculate(){
  var num1 = $('#num1').val();
  num1 = parseFloat(num1);
  var num2 = $('#num2').val();
  num2 = parseFloat(num2);
  var fn = $('#fn').val();
  var result = compute(num1, num2, fn);
  $('#result').text(result);  
}

//function sum(){
//  var num3 = $('#num3').val();
 // num3 = parseFloat(num3);
//  var num4 = $('#num4').val();
//  num3 = parseFloat(num4);
//  var num5 = $('#num5').val();
//  num3 = parseFloat(num5);
//  var num6 = $('#num6').val();
//  num3 = parseFloat(num6);
//  var num7 = $('#num7').val();
//  num3 = parseFloat(num7);
//}

function computeProd(numArray){

}

///SOLUTION that actually works with this method

function sum(){
 // var nums = $('.numbers');
 // for(var i = 0; i < nums.length; i++)
   // console.log(nums[i]);
  var s = 0;
  $('.numbers').each(function(index, element){
    s += parseFloat(element.value);
  //or s += $(element).val();
  });
  $('#result2').text(s);
}

//
//function computeSum(numArray){
//  var num;
//  var result = 0;
//  var numArray = $('.numArray').val();
//      numArray = parseFloat(numArray);
//  for(var i = 0; i < numArray.length; i++)
//     {
//        result += numArray[i];
      // var num = numArray[i].val();
        //   num = parseFloat(numArray[i]);
          // result += num;
//     } 
//   return result;
//  $('#result2').text(result);
//}

function compute(num1, num2, fn){
  var result;
  switch(fn)
  {
   case "+":
     result = num1 + num2;
     break;
   case "-":
     result = num1 - num2; 
     break;
   case "*":
     result = num1 * num2; 
     break;
   case "/":
     result = num1 / num2; 
  }
  return result;
}



