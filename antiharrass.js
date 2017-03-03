
var yourConsumerKey = "";
var yourConsumerSecret = "";
var yourAccessToken = "";
var yourTokenSecret = "";

var twitterAPI = require('node-twitter-api');
var util = require('util');
var fs = require('fs');


var offendersList = []; // this is an assosciate array - container for objects

var twitter = new twitterAPI({
    consumerKey: yourConsumerKey,
    consumerSecret: yourConsumerSecret});

var badWord = "blahblahblahblahblah";
twitter.getStream("filter", {track: badWord}, yourAccessToken,yourTokenSecret,onData);

function onData(error, streamEvent){

	if (Object.keys(streamEvent).length === 0){
		return;
	}

	// console.log('streamEvent', streamEvent);
	// console.log('stream length', streamEvent.length);

	var tweetText = streamEvent['text'];
	var name = streamEvent['user']['screen_name'];
	console.log(streamEvent['user']['screen_name']);
	console.log(streamEvent['text']);

	// every time a new offender is detected 
	//(this is used to create an offender object, and happens only once for each offender)
	var tempOffender = {
		name: '',
		badWord: '',
		offenseCount: 0
	}

	if (offendersList.length > -1) {
		offendersList.push(tempOffender); // add person to list of known offenders
		//console.log(offendersList.length);
	}

	// to check if an existing offender has more than one offense
	for(var i = 0; i < offendersList.length; i++){

		if (offendersList[i].hasOwnProperty(name) ){
			
			offendersList[i].offenseCount ++;

			// if an offender has more than 5 offense, do something
			if (offendersList[i].offenseCount > 0) {
			
				console.log(name + " just said blah again");

			}//end do something
		
		}//end offenseCount increment
	
	}//end for loop
	

}//end onData function
