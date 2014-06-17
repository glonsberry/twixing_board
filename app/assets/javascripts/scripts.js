  context = new webkitAudioContext();


function Twixnote(obj){
  this.id = obj.id;
  this.name = obj.name;
  this.mood = obj.mood;
  this.frequency = obj.frequency;
}

function Twixingboard(id){
  this.id = id;
  this.twixnotesArr = [];
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
};

Twixingboard.prototype.fetchTwixnotes = function(){
  $that = this;
  twixnotesArr = [];

  $.ajax({
    url:'/twixingboards/' + getTwixingboardId() + '/fetch',
    method: 'GET',
    dataType: 'json',
    data: {id: getTwixingboardId()},
    success: function(data){
      for (var i = 0; i < data.length; ++i){
        twixnote = new Twixnote(data[i])
        $that.twixnotesArr.push(twixnote)
      }
     
      $that.renderTwixnotes();
      $that.renderSliders();
    }
  })
};

Twixingboard.prototype.renderTwixnotes = function(){
  for (var i = 1; i < this.twixnotesArr.length; ++i ){
    
    
  }
}

Twixingboard.prototype.renderSliders = function(){
  for (var i = 1; i < this.twixnotesArr.length; ++i ){
    var elem = $('<div>').html(this.twixnotesArr[i].name);
    var soundElem = $('<div>').html("<input id='volume' type='range' min='0' max='2' step='0.1' value='0.0'>");
    $('.slider-container').append(soundElem);
    $('.twixnotes_container').append(elem);
  }
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

// Twixnote.prototype.playSound = function(){

//   var oscillator = context.createOscillator();
//   var gain = context.createGain();
//   var intTime = this.frequency;
//   oscillator.connect(gain);
//   oscillator.frequency.value = Math.random() * 400; //this.mood

//   gain.connect(context.destination);
//   oscillator.start(0);
//   gain.gain.value = 0; //change volume here

//   setInterval(function(intTime){
//     var now = context.currentTime;
//     gain.gain.cancelScheduledValues( now );
//     gain.gain.setValueAtTime(gain.gain.value, now);
//     gain.gain.linearRampToValueAtTime(1 , now + 0.2);
//   }, intTime)
//   setInterval(function(intTime){
//     var now = context.currentTime;
//     gain.gain.cancelScheduledValues( now );
//     gain.gain.setValueAtTime(gain.gain.value, now);
//     gain.gain.linearRampToValueAtTime(0 , now + 0.2)},  20 )

// }

function newSoundObject(intTime, pitch){
  soundNode = {};

  var oscillator = context.createOscillator();
  var gainNode = context.createGain();
  var intTime = intTime;
  oscillator.connect(gainNode);
  oscillator.frequency.value = pitch;

  gainNode.connect(context.destination);
  oscillator.start(0);

  gainNode.gain.value = 0;

  setInterval(function(intTime){
    var now = context.currentTime;
    gainNode.gain.cancelScheduledValues( now );
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.linearRampToValueAtTime(1 , now + 0.2);
  }, intTime)
  setInterval(function(intTime){
    var now = context.currentTime;
    gainNode.gain.cancelScheduledValues( now );
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.linearRampToValueAtTime(0 , now + 0.2)},  20 )

  soundNode =  {
    oscillator: oscillator,
    gainNode: gainNode
  };
  return soundNode;
  gain.gain.value = .5;

  setInterval(function(intTime){
    var now = context.currentTime;
    // gain.gain.cancelScheduledValues( now );
    // gain.gain.setValueAtTime(gain.gain.value, now);
    // gain.gain.linearRampToValueAtTime(1 , now + 0.2);
    oscillator.disconnect(0);
  }, intTime)
  setInterval(function(intTime){
    var now = context.currentTime;
    // gain.gain.cancelScheduledValues( now );
    // gain.gain.setValueAtTime(gain.gain.value, now);
    // gain.gain.linearRampToValueAtTime(0 , now + 0.2)
    oscillator.connect(context.destination)
      }
    ,  intTime + 20 )
}

function searchTwixnote(search_term){
  $that = this;

  $.ajax({
      url:'/twixingboards/' + getTwixingboardId() + '/search',
      method: 'GET',
      dataType: 'json',
      data: { search_term: search_term},
      success: function(data){

           twixnote = new Twixnote(data);
           pitch = Math.random() * 800
            if (twixnote.frequency < 1){
              var intTime = 6000 - (twixnote.frequency * (Math.random() * 500))}
            else {var intTime = (1 / twixnote.frequency) * 10000};

        // var newFreq = freq * x // function to convert frequency data to rhythm data
          var soundObject = new newSoundObject(intTime, pitch);

        //set volume to zero by default?
         console.log("searched:" + twixnote);
         return twixnote;
      }
  });
}

 $(function(){
//the code here is just to see it working on the page.  Change it however you want.

  var twixnoteArr = []
  myTwixingboard = new Twixingboard(1);
  myTwixingboard.fetchTwixnotes();
});



  
 
//   for (var i = 0; i < myTwixingboard.twixnotesArr; ++i){
//     console.log(myTwixingboard.twixnotesArr[i])
  // }
  // arr = myTwixingboard.twixnotesArr;
  // debugger;
  // $.each(myTwixingboard.twixnotesArr, function(twixnote){
  //   var elem = $('<div>').html(twixnote.name);
  //   $('.twixnote_container').append(elem);





