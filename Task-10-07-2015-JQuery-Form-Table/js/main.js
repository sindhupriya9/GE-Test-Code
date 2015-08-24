$(document).ready(function(){
//Reading data from JSON File
$.getJSON( "data/pch_twitter_response_2.json", function( data ) {
  var tweets = data.statuses;
  //Binding to Ul
  for(i=0;i<tweets.length;i++){
  $('.media-list').append('<li><div class="media-left"><a href="#"><img class="media-object" src="'+tweets[i].user.profile_background_image_url+'" data-holder-rendered="true" style="width: 64px; height: 64px;"></a></div><div class="media-body"><h4 class="media-heading">@'+tweets[i].user.screen_name+'</h4><p>'+tweets[i].text+'</p></li>');
  }
  
}); 
//Refresh button click handler
$('.glyphicon').click(function(){
$('.media-list li:first').appendTo('.media-list');
});
//Auto refresh timer
function load_tweets() {
$('li:first').appendTo('ul');
    setTimeout( load_tweets, 10000 );
}
load_tweets();

});