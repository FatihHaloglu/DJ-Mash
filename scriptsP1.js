

var NYTimesArticles;


function makeHTML(articleObj, imgURL){
	/*console.log("Making HTML...")
	for (var i = 0; i < articles.length; i++){
		var htmlString = "<h2>" + articles[i].headline.main + "</h2>";
		$('#results').append(htmlString);
	}*/

	var htmlString = "<h2>" + articles[i].headline.main + "</h2>";
	htmlString += "<img src=" + imgURL + ">";
	

}



function getFlickrData(NYTobj){

	console.log("About to make Flickr request...");
	//console.log(NYTobj.headline.main);

	//Make Flickr AJAX request
	var flickrKey = "a2dcedeb52f7e8d392b0f8ecc29a01d0";
	var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key" + flickrKey + "&format=json&";
 	flickrURL += "nojsoncallback=1&extras=url_o&tags";


	var NYTimesKeyWord;
	if (NYTobj.keywords.length > 0){
		NYTimesKeyWord = NYTobj.keywords[0].value;
	}
	else {
		NYTimesKeyWord = "news";
	}
	
	console.log(NYTimesKeyWord);

	var flickrRequestURL = flickrURL + NYTimesKeyWord;

	$.ajax({
		url : flickrRequestURL,
		type : 'GET', 
		dataType : 'jsonp', 
		error : function(err){
			console.log(err);
		}
		success : function(data){
			console.log('Dubai was liiiiiit!');
			console.log(data);

			var flickrImgURL
			if (data.photos.photo.length > 0){
				flickrImgURL = data.photos.photo[0].url_o;
			}
			else{
				flickrImgURL = ""
			}

			makeHTML (NYTobj,flickrImgURL);
		}
	})

}


function getNYTimesData(){

	var NYTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
	NYTimesURL += '?q=new+york+times&page=0&sort=newest&api-key=';
	
	var NYTimesKey = 'ba5779517ba24429a0114830587d90ee';

	var NYTimesRequestURL = NYTimesURL + NYTimesKey;

	console.log("About to make NY Times request...");

	$.ajax({
		url : 'NYTimesRequestURL',
		type : 'GET',
		dataType : 'json',
		error : function(err){
			console.log(err);
		},
		success : function(data){
			console.log("Yabadabadoooo!");
			//console.log(data);

			//Work with NY Times data
			NYTimesArticles = data.response.docs;
			console.log(NYTimesArticles);

			
			for (var i = 0; i < NYTimesArticles.length; i++){
				getFlickrData(NYTimesArticles[i]);	
			}
			

			//makeHTML(NYTimesArticles);


		}
	});

	console.log("Waiting...")
}


$(document).ready(function(){

	console.log("Macarroni is ready!");

	getNYTimesData();


});