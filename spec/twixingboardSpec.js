describe("Twixingboard", function (){
  it("works", function() {
    expect(true).toBe(true)
  });

  it("search results generated", function() {
    searchTixnote("#worldcup");
    actual   = twixer.name;
    expected = "#worldcup";
    expect(actual).toBe(expected)
  });
  it("finds Twixingboard id", function(){
    
  })
})