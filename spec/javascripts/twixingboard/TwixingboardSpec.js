describe("Twixingboard", function() {
 var twixingboard;
 var twixnote;

  beforeEach(function() {
    twixingboard = new Twixingboard(1);
  });

  it "runs the test function", function() {
    expect(test(1))toEqual(2);
  }

  it("searches for and saves twixnote", function() {
  //searchTwixnote("#worldcup");
  
  expect(player.currentlyPlayingSong).toEqual(song);

  //demonstrates use of custom matcher
  expect(player).toBePlaying(song);
  });
});