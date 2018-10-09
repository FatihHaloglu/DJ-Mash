function makeHTML(name, link){
	var nameHTML = "<p><a target='_blank' href=" + link + ">" + name + "</a></p>";
	$('#results').append(nameHTML);
}



function searchYoutube(theArtist, theTrack){

	var youtubeKey = 'AIzaSyB6NundN7gE6F0dugXIaDMLIxlNwladFQo'
	var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?key=' + youtubeKey + '&part=snippet&type=video&q=';
	var searchTerms = theArtist + ',' + theTrack;
	var youtubeSearchURL = youtubeURL + searchTerms;

	$.ajax({
		url : youtubeSearchURL,
		type : 'GET',
		dataType : 'json',
		error : function(err){
			console.log("Are you lost?");
			console.log(err);
		},
		success : function(data){
			console.log("Get ready for some bangerz!");

			console.log(data);
			
			var videoID = data.items[0].id.videoId;
			console.log(videoID);

			var embedLink = "https://www.youtube.com/embed/" + videoID;
			var iframeTag = '<iframe width="560" height="315" src="' + embedLink + '" frameborder="0" allowfullscreen></iframe>'
			$('#youtubeVideo').html(iframeTag);
			return;
			//create a variabñe to save the id
			//var videoID = ...
			//call a function to make and embed the video on the page
			//makeVideo(videoID)

		}
	});
}
			



function searchArtist(artistID){

	var lastfmURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&api_key=1b7a06e079f6287f38d5b98728a28828&format=json&artist=';
	var lastfmSearchURL = lastfmURL + artistID;

	$.ajax({
		url : lastfmSearchURL,
		type : 'GET',
		dataType : 'json',
		error : function(err){
			console.log("Are you lost?");
			console.log(err);
		},
		success : function(data){
			console.log("Get ready for some bangerz!");

			console.log(data);
			
			
			var topTrackName = data.toptracks.track[0].name;
			var htmlString = '<p>' + topTrackName + '</p>';
			$('#results').html(htmlString);

			searchYoutube(artistID, topTrackName);

			/*var topTracksArray = data.toptracks.track;
			for (var i=0; i<topTracksArray.length; i++){
				var htmlString = '<p>' + topTracksArray[i].name + '</p>';
				$('#results').append(htmlString);
			}
			*/
		}
	});

}


$('#the-button').click(function(){ //clicking the button
	$('#results').html(""); //grabs the div where text will appear
	var theInput = $('#the-input').val(); //input from person
	searchArtist(theInput); //run the function
});

$('#the-input').keypress(function(e) {
	console.log(e);
	if (e.which == 13) {
		$('#the-button').trigger('click');
	}
})