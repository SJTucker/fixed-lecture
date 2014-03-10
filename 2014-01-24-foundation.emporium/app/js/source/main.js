(function(){
  
  'use strict';

  $(document).ready(init);

  function init(){
    $('#add-item').click(addItem);
  }

  function addItem(){
    var item=$('#item').val();
    var quantity=$('#quantity').val();
    var amount=$('#amount').val();
    var total = amount * quantity;
    addItemToTable(item, quantity, amount, total);
    updateTotals();
    event.preventDefault();
  }

  function addItemToTable(item, quantity, amount, total){
    var $tr = $('<tr>');
    var $item = $('<td>');
    $item.text(item);
    var $quantity = $('<td>');
    $quantity.text(quantity);
    var $amount = $('<td>');
    $amount.text(numberToCurrency(amount * 1));
    var $total = $('<td>');
    $total.text(numberToCurrency(total));
    $tr.append($item, $quantity, $amount, $total);
    $('table tbody').append($tr);
  }
  
  function updateTotals(){
    var $amounts = $('table > tbody > tr > td:nth-child(3)');
    var numbers = transformTdsToNumbers($amounts);
    var theSum = sum(numbers);
    $('table > tfoot > tr > td:nth-child(4)').text(numberToCurrency(theSum));
    var $totals = $('table > tbody > tr > td:nth-child(4)');
    numbers = transformTdsToNumbers($totals);
    theSum = sum(numbers);
    $('table > tfoot > tr > td:nth-child(4)').text(numberToCurrency(theSum));
  }

  function sum(numbers){
    var total = 0;
    for(var i; i < numbers.length; i++){
      total += numbers[i];
    }
    return total;
  }
  
  function transformTdsToNumbers($tds){
    return $.map($tds, function(td){
      return td.textContent.slice(1) * 1;
    });
  }

  function numberToCurrency(number){
    return '$' + number.toFixed(2);
  }
})();
