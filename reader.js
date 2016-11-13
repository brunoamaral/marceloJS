var debug = true;

// How long did the user stay in this page? 
var startTime = new Date();
var beginning = startTime.getTime();
var totalTime = 0;

var article = document.getElementById('main');

// Calculate reading time. In the future, we identify the element by a less arbitrary method.
var reading_time = article.textContent.split(' ').length / 200;

// in the beginning, the article was not read and the author was sad
var article_was_read = false;

// This funciotn runs every 100 miliseconds and checks if the reading time and time on page ratio is acceptable to mark it as read.
function measure(){

	var currentDate = new Date();
	var currentTime = currentDate.getTime();
	var time_on_page = Math.round((currentTime - beginning) / 1000) / 60;

	// check how much of the article the user read based on time on page.
	var read_ratio = time_on_page / reading_time;

	if (read_ratio >= 0.75 && !article_was_read){
		article_was_read = true;
		if (!debug) {
			//ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
			ga('send', 'event', 'Reader Actions', 'User Read Article', window.location.href);
			// another option would be document.title;
		}else{
			console.log("ga('send', 'event', 'Reader Actions', 'User Read Article'," + window.location.href + ");");
		}
	};	
};

function scrollDepth(){
		var scrollTop = window.pageYOffset;
		var docHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
		var winHeight = window.innerHeight;
		var scrollPercent = (scrollTop) / (docHeight - winHeight);
		var scrollPercentRounded = Math.round(scrollPercent*100);

	    console.log(scrollPercentRounded);
}

var timer = setTimeout(measure, 100);

function numberOfReadings(){
	console.log('TO DO. This function collects data from google analytics and updates the metadata of the post.')
}