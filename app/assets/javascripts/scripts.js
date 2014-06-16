

function Twixnote(obj){
  this.id = obj.id;
  this.name = obj.name;
  this.frequency = obj.frequency;

}

function getTwixingboardId(){
  return window.location.pathname.split('/')[2];
  }




//This will save a twixnote to the database.  But you need a refresh to see it.
//So you'l need to put a function in the success function to put
//the twixnote on the screen.



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

Twixnote.prototype.deleteTwixnote = function(){
  $that = this;

  $.ajax({
      url:'/twixingboards/' + getTwixingboardId() + '/delete/twixnotes',
      method: 'DELETE',
      dataType: 'json',
      data: { twixnote: {id: $that.id, frequency: $that.frequency, name: $that.name }},

      success: function(){
        console.log("deleted")
      }
  });
}

function newSoundObject(pitch, intTime){
  var context = new webkitAudioContext();
  var oscillator = context.createOscillator();
  var gain = context.createGain();
  var intTime = intTime;
  oscillator.connect(gain);
  oscillator.frequency.value = pitch;
  gain.connect(context.destination);
  oscillator.start(0);
  gain.gain.value = 0;

  setInterval(function(intTime){
    var now = context.currentTime;
    gain.gain.cancelScheduledValues( now );
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(1 , now + 0.2);
  }, intTime)
  setInterval(function(intTime){
    var now = context.currentTime;
    gain.gain.cancelScheduledValues( now );
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0 , now + 0.2)},  20 )

}

function searchTwixnote(search_term){
  $that = this;

  $.ajax({
      url:'/twixingboards/' + getTwixingboardId() + '/search',
      method: 'GET',
      dataType: 'json',
      data: { search_term: search_term},
      success: function(data){
        var twixnote = new Twixnote(data);
        var freq = data.frequency
        // var newFreq = freq * x // function to convert frequency data to rhythm data
        newSoundObject(freq, mood)
        //set volume to zero by default?
         console.log("searched:" + twixnote)
      }
  });
}




 $(function(){
//the code here is just to see it working on the page.  Change it however you want.
  $('.save-twixnote-btn').click(function(){
    var twixnoteName = $('.twixnote-name').html();
    var twixnoteFrequency = $('.twixnote-frequency').html();

    var mytwixnote = new Twixnote(twixnoteName, twixnoteFrequency);
    mytwixnote.saveTwixnote();
    })
  });





