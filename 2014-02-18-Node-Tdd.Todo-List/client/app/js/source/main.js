(function(){

  'use strict';

  $(document).ready(initialize);

  var priorities = [];

  function initialize(){
    $(document).foundation();
    $('#priority').submit(submitPriority);
    $('#priorities').on('click', '.removePriority', removePriority);
    $('#priorities').on('click', '.editablePriority', updatePriority);
    getPriorities();
  }

  // ----------------------------------------------------------- //
// hide things in the future
  // ----------------------------------------------------------- //

  // ----------------------------------------------------------- //
// Priorities
  // ----------------------------------------------------------- //

  function submitPriority(event){
    var data = $(this).serialize();
    var url = generateUrl('/priorities');
    var type = 'POST';
    var success = addPriorityToTable;

    $.ajax({data:data, url:url, type:type, success:success});

    event.preventDefault();
  }

  function getPriorities(){
    var url = generateUrl('/priorities');
    var type = 'GET';
    var success = displayAllPriorities;
    $.ajax({url:url, type:type, success:success});
  }

  function displayAllPriorities(data){
    for(var i = 0; i < data.priorities.length; i++){
      addPriorityToTable(data.priorities[i]);
    }
  }

  function addPriorityToTable(priority){
    priorities.push(priority);

    var $row = $('<tr>');
    $row.addClass('trow');
    var $name = $('<td>');
    var $divname = $('<div>');
    var $value = $('<td>');
    var $divvalue = $('<div>');
    var $edit = $('<td>');
    var $del = $('<td>');

    $row.attr('data-priority-id', priority._id);
    $divname.text(priority.name);
    $divvalue.text(priority.value);
    $del.text('Delete');
    $del.addClass('removePriority');

    $name.append($divname);
    $value.append($divvalue);

    $row.append($name, $value, $edit, $del);
    $('#priorities > tbody').append($row);
  }

  function removePriority(){
    var id = $(this).parent().data('priority-id');
    var url = generateUrl('/priorities/'+id);
    var type = 'DELETE';
    var success = removePriorities;

    $.ajax({url:url, type:type, success:success});
  }

  function removePriorities(data){
    if(data.count === 1){
      _.remove(priorities, function(priority){return priority._id === data.id;});
      console.log(data.id);
      $('.trow[data-priority-id="'+data.id+'"]').remove();
    }
  }

  function updatePriority(){}



  // ----------------------------------------------------------- //
// univiersal
  // ----------------------------------------------------------- //


  function generateUrl(path){
    var url = window.location.origin.replace(/\d{4}/, 4000);
    url += path;
    return url;
  }

})();

