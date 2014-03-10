(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#movie').submit(submitMovie);
    $('#movies').on('click', '.delete', deleteMovie);
    $('#movies').on('click', '.edit', editMovie);

    getMovies();
  }

  function editMovie(){
    //var data = $(this).parent().data('movie-id');
    var $row = $(this).closest('tr');
    console.log($row);
    var url = $row.find('tr:nth-child(1)');
    console.log(url);
    var props= $row.find('td');
    console.log(props);
    var fields = $('#movie').find('input');
    for(var i = 0; i < props.length; i++){
      $(fields[i]).val(props[i].textContent);
      console.log(fields[i]);
      console.log(props[i]);
      
    }
    console.log(name);
   // for(var i = 0; i < row.length
   // console.log(id);
   // var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies/'+id;
  //  $.getJSON(url, function(data){
  //    console.log(data);
      //var name = data.movies.name;
      //console.log(name);
  //  });
  }

  function deleteMovie(){
    var data = $(this).parent().data('movie-id');
    console.log(data);
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies/'+data;
    console.log(url);
    var type = 'DELETE';
    var success = getMovies;

    $.ajax({url:url, type:type, data:data, success:success});
  }

  function submitMovie(event){
    var data = $(this).serialize();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies';
    var type = 'POST';
    var success = newMovie;

    $.ajax({url:url, type:type, data:data, success:success});

    event.preventDefault();
  }

  function newMovie(movie){
    displayMovie(movie);
  }

  function getMovies(){
    $('#movies > tbody').empty();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies';
    $.getJSON(url, displayMovies);
  }

  function displayMovies(data){
    for(var i = 0; i < data.movies.length; i++){
      displayMovie(data.movies[i]);
    }
    
  }
  function displayMovie(movie){
    var $container = $('<tr>');
    var $name = $('<td>');
    var $rating = $('<td>');
    var $runtime = $('<td>');
    var $release = $('<td>');
    var $studio = $('<td>');
    var $actors = $('<td>');
    var $director = $('<td>');
    var $poster = $('<td><img src="' + movie.poster + '"></td>');
    var $button1 = $('<input type="button" class="delete button small radius" value="Delete"></button>');
    var $button2 = $('<input type="button" class="edit button small radius" value="Edit"></button>');
    $poster.addClass('poster');

    $name.text(movie.name);
    $rating.text(movie.rating);
    $runtime.text(movie.runtime);
    $release.text(movie.release);
    $studio.text(movie.studio);
    $actors.text(movie.actors);
    $director.text(movie.director);
    $container.data('movie-id', movie._id);
    

    
    $container.append($poster, $name, $rating, $studio, $director, $runtime, $release, $actors, $button1, $button2);
    $('tbody').append($container);

  
  }



})();

