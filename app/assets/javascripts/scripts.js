function Twixnote(name, frequency){
  this.name = name;
  this.frequency = frequency;

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

function deleteTwixnote(twixnote_id){
  $that = this;
  
  $.ajax({
      url:'/twixingboards/' + getTwixingboardId() + '/twixnotes',
      method: 'DELETE',
      dataType: 'json',
      data: { twixnote: { id: $that.id, twixingbdard_id: getTwixingboardId() }},
      success: function(){
        console.log("deleted")
      }
  });
}
function searchTwixnote(twixnote_id){
  $that = this;
  
  $.ajax({
      url:'/twixingboards/' + getTwixingboardId() + '/search',
      method: 'GET',
      dataType: 'json',
      data: { search_term: twixnote_id},
      success: function(data){
        console.log("searched:" + data.name + ":" + data.frequency)
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
  



 