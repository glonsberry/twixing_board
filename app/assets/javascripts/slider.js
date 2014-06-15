$(function() {
    $( ".slider-vertical#twix-note-1" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function( event, ui ) {
        $( "#amount1" ).val( ui.value );
      }
    });
    $( "#amount1" ).val( $( ".slider-vertical#twix-note-1" ).slider( "value" ) );
  });

$(function() {
    $( ".slider-vertical#twix-note-2" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function( event, ui ) {
        $( "#amount2" ).val( ui.value );
      }
    });
    $( "#amount2" ).val( $( ".slider-vertical#twix-note-2" ).slider( "value" ) );
  });

$(function() {
    $( ".slider-vertical#twix-note-3" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function( event, ui ) {
        $( "#amount3" ).val( ui.value );
      }
    });
    $( "#amount3" ).val( $( ".slider-vertical#twix-note-3" ).slider( "value" ) );
  });

$(function() {
    $( ".slider-vertical#twix-note-4" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function( event, ui ) {
        $( "#amount4" ).val( ui.value );
      }
    });
    $( "#amount4" ).val( $( ".slider-vertical#twix-note-4" ).slider( "value" ) );
  });