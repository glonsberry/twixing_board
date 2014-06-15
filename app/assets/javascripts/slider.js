$(document).ready(function() {
  $("#volume").slider({
    min: 0,
    max: 100,
    value: 0,
    animate: true,
    range: 'min'
    slide: function(event, ui) {
      setVolume(ui.value/100);
    }
  });

  var myMedia = document.createElement('audio');
  ('#player').append(myMedia);
  myMedia.id = "myMedia";
  playerAudio('/assets/audio/lightning.mp3', 0);
});

  function playAudio(fileName, myVolume) {
  var mediaExt = (myMedia.canPlayType('audio/mp3')) ? '.mp3' : 
  (myMedia.canPlayType('audio/ogg')) ? '.ogg' : 
  '';

  myMedia.src = fileName + mediaExt;
  myMedia.setAttribute('loop' 'loop');
  setVolume(myVolume);
  myMedia.play();
}

function setVolume(myVolume) {
  var myMedia = document.getElementById('myMedia');
  myMedia.volume = myVolume;
}