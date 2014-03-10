/*
test( "name of test", function() {
      deepEqual(actual, expected, "my test message" );
});*/


test( "add", function() {
      deepEqual(add(2,3), 5, "adding 2 and 3" );
      deepEqual(add(2,-5), -3, "adding 2 and 3" );
      deepEqual(add(2,3), 5, "adding 2 and 3" );
});

test( "sum", function() {
    deepEqual(sum([11,3,8]), 11, "sum of array");
});

test( "countEvens", function() {
    deepEqual(countEvens([3, 8, 6, 4, 7]), 3, "counts even values");
});

test("makeEvenStringsUppercase", function(){
  var actual = ['hello', 'cohort', 'iv', 'welcome', 'to', 'tdd'];
  var expected = ['hello', 'COHORT', 'IV', 'welcome', 'TO', 'tdd'];
  deepEqual(makeEvenStringsUppercase(actual), expected, "should be 3 uppercased strings");
});

test("sumLengthOfStrings", function(){
  var strings = "this is a very long string";
  deepEqual(sumLengthOfStrings(strings), 21, "string should be 21 characters (spaces ignored)");

});

test("makeCatWithName", function(){
  deepEqual(makeCatWithName("fluffy").name, "fluffy", "cat's name should be fluffy");
 });
