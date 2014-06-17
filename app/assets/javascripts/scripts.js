  context = new webkitAudioContext();



  // Create a source node from the buffer.

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
    //return window.location.pathname.split('/')[2];
    return $('.twixingboard_id').attr('id');
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
         twixnote.playSound();

      }

      $that.renderSliders();
    }
  })
};
Twixingboard.prototype.fetchTwixingboard = function(){
  $that = $this;
  $.ajax({
  url:'/twixingboards/' + getTwixingboardId() + '/fetch',
  method: 'GET',
  dataType: 'json',
  data: {id: getTwixingboardId()},
  success: function(data){
    for (var i = 0; i < data.length; ++i){
      twixnote = new Twixnote(data[i])
      $that.twixnotesArr.push(twixnote)
       twixnote.playSound();

    }

    $that.renderSliders();
  }
})


};



Twixingboard.prototype.renderSliders = function(){
  $('.slider-container').html('');
  $('.twixnotes_container').html('');


  for (var i = 0; i < this.twixnotesArr.length; ++i ){
    this.twixnotesArr[i].playSound();
    var elem = $('<div>').html(this.twixnotesArr[i].name);
    var eachvar = i;
    var gainNode = myTwixingboard.twixnotesArr[i].gainNode;
    (function(gainNode){
      var $slider = $('<div>').addClass("slider-vertical"+i).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 1,
      slide: function(event, ui){
          var volume = ui.value / 100;
          gainNode.value = volume;
          console.log(ui.value);
      }
     })
      $('.slider-container').append($slider);
      $('.twixnotes_container').append(elem);
    })(gainNode);





    //var sliderElem = $('<div>').html("<input id='volume' type='range' min='0' max='2' step='0.05' value='0.0'>");

    // var sliderElem =
    //   $(function() {
    // $( ".slider-container" ).slider({
    //   orientation: "vertical",
    //   range: "min",
    //   min: 0,
    //   max: 100,
    //   value: 60,
    //   slide: function( event, ui ) {
    //     $( "#amount" ).val( ui.value );
    //   }
    // });
    // $( "#amount" ).val( $( ".slider-container" ).slider( "value" ) );

    //$('.slider-container').append(sliderElem);

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

Twixnote.prototype.playSound = function(){
//     var convolver = context.createConvolver()
//   function WhiteNoiseGenerated(callback) {
//   // Generate a 5 second white noise buffer.
//   var lengthInSamples = 5 * context.sampleRate;
//   var buffer = context.createBuffer(1, lengthInSamples, context.sampleRate);
//   var data = buffer.getChannelData(0);

//   for (var i = 0; i < lengthInSamples; i++) {
//     data[i] = ((Math.random() * 2) - 1);
//   }

//   // Create a source node from the buffer.
//   this.node = context.createBufferSource();
//   this.node.buffer = buffer;
//   this.node.loop = true;
//   this.node.start(0);
// }
//   var noiseBuffer = new WhiteNoiseGenerated();
//     convolver.buffer = noiseBuffer;

  var oscillator = context.createOscillator();
  var gain = context.createGain();
  var filter = context.createBiquadFilter();
  filter.type = 0;
   if (this.frequency < 1){
      var intTime = 6000 - (this.frequency * (Math.random() * 500))}
  else {var intTime = (1 / this.frequency) * 10000};
  oscillator.connect(gain);
      if (this.mood === "joy")
        {var moodFreq = Math.random() * (300-150) + 150}
      else if (this.mood === "sadness")
        {var moodFreq = Math.random() * (450-251) + 251}
      else if (this.mood === "disgust")
        {var moodFreq = Math.random() * (500-401) + 401}
      else if (this.mood === "surprise")
        {var moodFreq = Math.random() * (650-501) + 501}
      else if (this.mood === "fear")
        {var moodFreq = Math.random() * (800-651) + 651}
      else if (this.mood === "anger")
        {var moodFreq = Math.random() * (900-801) + 801}
      else if (this.mood === "ambiguous")
        {var moodFreq = Math.random() * (800) + 100}
  oscillator.frequency.value = moodFreq

  gain.connect(filter);
  // convolver.connect(filter);
  filter.connect(context.destination)
  oscillator.start(0);
  gain.gain.value = 0; //change volume here



  setInterval(function(intTime){
    var now = context.currentTime;
    // gain.gain.cancelScheduledValues( now );
    // gain.gain.setValueAtTime(gain.gain.value, now);
    // gain.gain.linearRampToValueAtTime(1 , now + 0.2);
    // oscillator.connect(context.destination)
        filter.frequency.value = 10000;
  }, intTime);



  setInterval(function(intTime){
    var now = context.currentTime;
    // gain.gain.cancelScheduledValues( now );
    // gain.gain.setValueAtTime(gain.gain.value, now);
    // gain.gain.linearRampToValueAtTime(0 , now + 0.2)

        filter.frequency.value = 0;
         }
    ,  Math.random() * 30 );
    gain.gain.value = 0; //change volume here

  this.gainNode = gain.gain
  return this.gainNode
}


// function newSoundObject(intTime, pitch){

//   var oscillator = context.createOscillator();
//   var gain = context.createGain();
//   var intTime = intTime;
//   oscillator.connect(gain);
//   oscillator.frequency.value = pitch;

//   gain.connect(context.destination);
//   oscillator.start(0);
//   gain.gain.value = .5;
//   oscillator.disconnect(0);
//   setInterval(function(intTime){
//     var now = context.currentTime;
//     // gain.gain.cancelScheduledValues( now );
//     // gain.gain.setValueAtTime(gain.gain.value, now);
//     // gain.gain.linearRampToValueAtTime(1 , now + 0.2);
//     oscillator.connect(context.destination)
//   }, intTime)
//   setInterval(function(intTime){
//     var now = context.currentTime;
//     // gain.gain.cancelScheduledValues( now );
//     // gain.gain.setValueAtTime(gain.gain.value, now);
//     // gain.gain.linearRampToValueAtTime(0 , now + 0.2)
//         oscillator.disconnect(0);
//       }
//     ,  intTime + 50 )

// }


Twixingboard.prototype.searchTwixnote = function(search_term){
  $that = this;

  $.ajax({

    url:'/twixingboards/' + getTwixingboardId() + '/search',
    method: 'GET',
    dataType: 'json',
    data: { search_term: search_term},
    success: function(data){

           twixnote = new Twixnote(data);
           // pitch = Math.random() * 800
           //  if (twixnote.frequency < 1){
           //    var intTime = 6000 - (twixnote.frequency * (Math.random() * 500))}
           //  else {var intTime = (1 / twixnote.frequency) * 10000};

          // var soundObject = new newSoundObject(intTime, pitch);


        //set volume to zero by default?

        $that.twixnotesArr.push(twixnote);
        $that.renderSliders();

        return twixnote;
      }
    });
}

$(function(){
//the code here is just to see it working on the page.  Change it however you want.


  var twixnoteArr = []
  myTwixingboard = new Twixingboard(1);
  myTwixingboard.fetchTwixnotes();

  $('.search_form').submit(function(e){
    e.preventDefault();

    myTwixingboard.searchTwixnote($('.search_term').val())
  })


});

// for (var i = 0; i < myTwixingboard.twixnotesArr.length; ++i){
//   $( ".create-slider" ).slider({
//     orientation: "vertical",
//     range: "min",
//     min: 0,
//     max: 100,
//     value: 0,

      // slide: function( event, ui ) {
      //   gainNode.gain.value = ui.value / 100;
      // }
    // });


//   for (var i = 0; i < myTwixingboard.twixnotesArr; ++i){
//     console.log(myTwixingboard.twixnotesArr[i])
  // }
  // arr = myTwixingboard.twixnotesArr;
  // debugger;
  // $.each(myTwixingboard.twixnotesArr, function(twixnote){
  //   var elem = $('<div>').html(twixnote.name);
  //   $('.twixnote_container').append(elem);





