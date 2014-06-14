function Twixnote(name, frequency){
  this.name = name;
  this.frequency = frequency;

}

function getTwixingboardId(){
  return window.location.pathname.split('/')[2];
  }

Twixnote.prototype.saveTwixnote = function(){
  $that = this;
  
  $.ajax({
      url:'/twixingboards/' + getTwixingboardId() + '/twixnotes',
      method: 'POST',
      dataType: 'json',
      data: { twixnote: { name: $that.name, frequency: $that.frequency }},
      success: function(){
        console.log("saved" + $that)
      }
  });

 }

 $(function(){

  $('.save-twixnote-btn').click(function(){
    var twixnoteName = $('.twixnote-name').html();
    var twixnoteFrequency = $('.twixnote-frequency').html();
    
    var mytwixnote = new Twixnote(twixnoteName, twixnoteFrequency);
    mytwixnote.saveTwixnote();

  });

 });