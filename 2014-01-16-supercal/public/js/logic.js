function containsChar(word, letter){
   for(var i = 0; i < word.length; i++)
   {
     if(word[i] === letter)
       return true;
   }
   return false;
}


//return false cannot be inside if statement, because it return false and stop the loop
//
//alt solution
//function containsChar(word, letter){
//  return word.indexOf(letter) !== -1
//}


function parseTags($tags){//jQuery objects (strings) up here
  
  return $.map($tags, function(tag){
      return parseFloat(tag.textContent);//takes in array of strings and outputs numbers
      
   });
}
