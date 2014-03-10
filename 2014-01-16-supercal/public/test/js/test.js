test( "containsChar", function() {
  deepEqual(containsChar("mouse", "u"), true, "the letter u should be in mouse");
  deepEqual(containsChar("mouse", "z"), false, "the letter z should not be in mouse");
});
