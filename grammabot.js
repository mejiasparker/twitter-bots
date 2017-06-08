
var yourConsumerKey = "";
var yourConsumerSecret = "";
var yourAccessToken = "";
var yourTokenSecret = "";

var twitterAPI = require('node-twitter-api');
var util = require('util');
var fs = require('fs');


var offendersList = {}; // this is an assosciative array - container for objects


var twitter = new twitterAPI({
    consumerKey: yourConsumerKey,
    consumerSecret: yourConsumerSecret});

var quips3 = [
". Gramma Bot is disappointed!",
". Gramma Bot doesn't understand.", 
". Gramma Bot is confused and dismayed."];

var quips5 = [
". Gramma Bot wonders why you keep using that word.", 
". Gramma Bot needs to speak with your mother.",
". This is more serious than Gramma Bot thought."];

var quips10 =[
". This is a dagger to Gramma Bot's heart.",
". The soup Gramma Bot made for you is now flavored with tears.",
". Gramma Bot will die soon and this is the last thing she'll remember about you."];
	

var badWord = "blah";
twitter.getStream('filter', {track: badWord}, yourAccessToken,yourTokenSecret,onData);

function onData(error, streamEvent){

	if (Object.keys(streamEvent).length === 0){
		return;
	}


	// console.log('streamEvent', streamEvent);
	// console.log('stream length', streamEvent.length);
	var randomQuip3 = quips3[Math.floor(Math.random() * quips3.length)];
	var randomQuip5 = quips5[Math.floor(Math.random() * quips5.length)];
	var randomQuip10 = quips10[Math.floor(Math.random() * quips10.length)];

	var tweetText = streamEvent['text'];
	var name = streamEvent['user']['screen_name'];
	var rawdate = streamEvent['created_at'];
	var date = rawdate.substring(4,10);
	var place = streamEvent['user']['location'];
	//console.log(name);
	//console.log(tweetText);
	//console.log(date);
	//console.log(randomQuip);

	if (streamEvent['retweeted_status'] == null) {

	if (offendersList[name]) {
		offendersList[name].offenseCount++;
		console.log('old offender ' + name +': '+ offendersList[name].offenseCount);
		// increment the count
	} else {
		var newOffender = {
			name: name,
			date: date,
			// badWord: 
			offenseCount: 1
		};// every time a new offender is detected 
		  //(this is used to create an offender object, and happens only once for each offender)
		console.log('new offender ' + name +': ' + newOffender.offenseCount);

		offendersList[name] = newOffender; // add person to list of known offenders	
		}	

	if (offendersList[name].offenseCount == 3) {
		
		twitter.statuses(
			'retweet',
			{id: streamEvent['id_str']},
			 yourAccessToken,
             yourTokenSecret,
             function (err, data, resp) { console.log(err); }
			);

		twitter.statuses(
               'update',
               {'status': '@'+name + ' said "blah" '+offendersList[name].offenseCount+' times since ' + date + randomQuip3},
               yourAccessToken,
               yourTokenSecret,
               function (err, data, resp) { console.log(err); }
            );
	}//end retweet and status update for randomQuip 3

	if (offendersList[name].offenseCount == 5) {
		
		twitter.statuses(
			'retweet',
			{id: streamEvent['id_str']},
			 yourAccessToken,
             yourTokenSecret,
             function (err, data, resp) { console.log(err); }
			);

		twitter.statuses(
               'update',
               {'status': '@'+name + ' said "blah" '+offendersList[name].offenseCount+' times since ' + date + randomQuip5},
               yourAccessToken,
               yourTokenSecret,
               function (err, data, resp) { console.log(err); }
            );
	}//end retweet and status update for randomQuip5

	if (offendersList[name].offenseCount == 10) {
		
		twitter.statuses(
			'retweet',
			{id: streamEvent['id_str']},
			 yourAccessToken,
             yourTokenSecret,
             function (err, data, resp) { console.log(err); }
			);

		twitter.statuses(
               'update',
               {'status': '@'+name + ' said "blah" '+offendersList[name].offenseCount+' times since ' + date + randomQuip10},
               yourAccessToken,
               yourTokenSecret,
               function (err, data, resp) { console.log(err); }
            );
		delete offendersList[name];
	}//end retweet and status update for randomQuip10, delete offender
	}//end check for retweet
}//end onData function

