//Borrowed from http://www.cypressnorth.com/blog/web-programming-and-development/how-to-easily-display-a-twitter-feed-using-javascript/

$(document).ready(function() {
	loadLatestTweet();
}); 

//Twitter Parsers
String.prototype.parseURL = function() {
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
		return url.link(url);
	});
};
String.prototype.parseUsername = function() {
	return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
		var username = u.replace("@","")
		return u.link("http://twitter.com/"+username);
	});
};
String.prototype.parseHashtag = function() {
	return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
		var tag = t.replace("#","%23")
		return t.link("http://search.twitter.com/search?q="+tag);
	});
};
function parseDate(str) {
    var v=str.split(' ');
    return new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));
} 

function loadLatestTweet(){
	var numTweets = 5;
    var _url = 'https://api.twitter.com/1/statuses/user_timeline/madeupstats.json?callback=?&count='+numTweets+'&include_rts=1';
    $.getJSON(_url,function(data){
    for(var i = 0; i< data.length; i++){
            var tweet = data[i].text;
            var created = parseDate(data[i].created_at);
            tweet = tweet.parseURL().parseUsername().parseHashtag();
            $(".text").append('<p>'+tweet+'</p>');
        }
    });
}