describe("Player", function() {
 var twixingboard;
 var twixnote;

  beforeEach(function() {
    twixingboard = new Twixingboard(1);
  });

  it("searches for and saves twixnote", function() {
  searchTwixnote("#worldcup");
  
  expect(player.currentlyPlayingSong).toEqual(song);

  //demonstrates use of custom matcher
  expect(player).toBePlaying(song);
  });
});