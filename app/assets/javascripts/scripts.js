  context = new webkitAudioContext();

  function test(val){
    return val + 1;
  }


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
    return $('.twixingboard_id').attr('id');
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
  // $('.slider-container').html('');
  $('.twixnotes_container').html('');
  that = this;

  for (var i = 0; i < this.twixnotesArr.length; ++i ){

    addTwixnote(that.twixnotesArr[i]);
  }
}

deleteTwixnote = function(twixnoteId){
  $that = this;

  for (i = 0; i < myTwixingboard.twixnotesArr.length; i++)
  {
    if (myTwixingboard.twixnotesArr[i].id == parseInt(twixnoteId)){
      myTwixingboard.twixnotesArr.splice(i,1);
    }

  }
  $.ajax({
    url:'/twixingboards/' + getTwixingboardId() + '/delete/twixnotes',
    method: 'DELETE',
    dataType: 'json',
    data: { twixnote: {id: twixnoteId }},
    success: function(){

      console.log("deleted")
    }
  });
}

Twixnote.prototype.playSound = function(){
  var that = this;
  var oscillator = context.createOscillator();
  var gain = context.createGain();
  var filter = context.createBiquadFilter();
  filter.type = 0;
   if (this.frequency < 1){
      var intTime = 6000 - (this.frequency * (Math.random() * 500))}
  else {var intTime = (1 / this.frequency) * 10000};
  oscillator.connect(gain);
      if (this.mood === "joy")
        {var moodFreq = Math.random() * (400-100) + 100}
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
  filter.connect(context.destination)
  oscillator.start(0);
  gain.gain.value = 0; //change volume here

  setInterval(function(intTime){
    var now = context.currentTime;
    $("#twixid"+that.id).animate({"border-radius":"80px", "height":"21px", "width":"97px", "opacity":"1"}, 200);

    filter.frequency.value = 10000;
  }, intTime * 2);

setInterval(function(intTime){
    $("#twixid"+that.id).animate({"opacity":".95"}, 50);
  }, intTime);
  setInterval(function(intTime){
    $("#twixid"+that.id).animate({"border-radius":"79px", "height":"20px", "width":"95px"}, 50);
  }, intTime * 2);

  setInterval(function(intTime){
    var now = context.currentTime;

        filter.frequency.value = 0;
         }
    ,  30 );

    gain.gain.value = 0; //change volume here

    this.gainNode = gain.gain
    return this.gainNode
  }

Twixingboard.prototype.searchTwixnote = function(search_term){
  $that = this;
  if (this.twixnoteLimit()){
     $('.message').html("You have reached maximun twixitude.  You must delete a slider before you add another one.");

  }
  else{
    $.ajax({

      url:'/twixingboards/' + getTwixingboardId() + '/search',
      method: 'GET',
      dataType: 'json',
      data: { search_term: search_term},
      success: function(data){
        twixnote = new Twixnote(data);
        addTwixnote(twixnote);
        myTwixingboard.twixnotesArr.push(twixnote);
      }
    });
  }
};

function addTwixnote(twixnote){
  
  
  var twixWrapperEl = $('<div>')
          .addClass('two columns twixWrapper')
          .attr('name', twixnote.id);
  twixnote.playSound();
    var color = ""
      if (twixnote.mood === "anger")
        {color = 'red'}
      else if (twixnote.mood === "sadness")
        {color = 'purple'}
      else if (twixnote.mood === "disgust")
        {color = 'orange'}
      else if (twixnote.mood === "fear")
        {color = 'green'}
      else if (twixnote.mood === "joy")
        {color = 'blue'}
      else if (twixnote.mood === "surprise")
        {color = 'yellow'};
var twixNameElem = $('<div>').attr("id", "twixid"+twixnote.id).html(twixnote.name).css({"background-color": color,"border-radius": "10px", "text-align": "center", "border":"2px solid"
})
    var deleteElem = $('<button>').html("<i class='fa fa-trash-o'></i>").addClass('delete-btn');

    $(deleteElem).click(function(){
      var id = $(this).parent().attr('name');
      deleteTwixnote(id);
      twixnote.gainNode.value = 0
      $(this).parent().remove();

    })

    var gainNode = twixnote.gainNode;
    var $slider = undefined;
    (function(gainNode){
      $slider = $('<div>').addClass("slider-vertical").slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: gainNode.value * 100,
      slide: function(event, ui){
          var volume = ui.value / 100;
          gainNode.value = volume;
          saveVolume = ui.value;
        },
     })
    })(gainNode);

    twixWrapperEl.append($slider);
    twixWrapperEl.append(deleteElem);
    twixWrapperEl.append(twixNameElem);
    $('.twixnotes_container').append(twixWrapperEl)

};

Twixingboard.prototype.twixnoteLimit = function(){
  var limit = 8;
  if (this.twixnotesArr.length >= 8) {
    return true;
  }
  else{

   return false
  }
};

$(function(){

  var twixnoteArr = []
  myTwixingboard = new Twixingboard(1);
  myTwixingboard.fetchTwixnotes();

  $('.search_form').submit(function(e){
    e.preventDefault();

    myTwixingboard.searchTwixnote($('.search_term').val())
  })
});






