function add(x,y){
  return  x + y;
}
function sum(num){
  var result = 0;
  for(var i = 0; i < num.length; i++){
    result += num[i];
    return result;
  }
}

function countEvens(num){
  var result = 0;
  for(var i = 0; i < num.length; i++)
    { if (num[i] % 2 === 0)
      result++;
    }
  return result;
}

function makeEvenStringsUppercase(strings){
  var newstring = [];
  for(var i = 0; i < strings.length; i++)
  {
    if(strings[i].length % 2 === 0)
      newstring.push(strings[i].toUpperCase());
    else
      newstring.push(strings[i]);
  }
    return newstring;
   
}

function sumLengthOfStrings(strings){
  var splitStrings = strings.split(' ');
  var l = 0;
  for(var i = 0; i < splitStrings.length; i++)
    l += splitStrings[i].length;
  return l;
}

function makeCatWithName(name){
  return {name:name};
}
