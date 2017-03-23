
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

var quips = ['. Grammabot is disappointed!', 
	     '. Grammabot is confused and dismayed.',
	     '. Grammabot wonders why you use that word so much!', 
	     '. Grammabot needs to speak with your mother.', 
	     '. Things sure have changed since Grammabots day.'];
var randomQuip = quips[Math.floor(Math.random() * quips.length)];

var badWord = "cunt";
twitter.getStream("filter", {track: badWord}, yourAccessToken,yourTokenSecret,onData);

function onData(error, streamEvent){

	if (Object.keys(streamEvent).length === 0){
		return;
	}


	// console.log('streamEvent', streamEvent);
	// console.log('stream length', streamEvent.length);

	
	var tweetText = streamEvent['text'];
	var name = streamEvent['user']['screen_name'];
	var rawdate = streamEvent['created_at'];
	var date = rawdate.substring(4,10);
	console.log(name);
	console.log(tweetText);
	console.log(date);

	if (offendersList[name]) {
		offendersList[name].offenseCount++;
		console.log('old offender ' + name +': '+ offendersList[name].offenseCount);
		// increment the count
	} else {
		var newOffender = {
			name: name,
			date: date,
			offenseCount: 1
		};
		console.log('new offender ' + name +': ' + newOffender.offenseCount);

		offendersList[name] = newOffender; // add person to list of known offenders		
	}

	if (offendersList[name].offenseCount > 2) {
		twitter.statuses(
               'update',
               {'status': name + ' said "cunt" '+offendersList[name].offenseCount+' times since ' + date + randomQuip},
               yourAccessToken,
               yourTokenSecret,
               function (err, data, resp) { console.log(err); }
            );
		delete offendersList[name];
	}

}//end onData function

