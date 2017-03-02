
var yourConsumerKey = "";
var yourConsumerSecret = "";
var yourAccessToken = "";
var yourTokenSecret = "";

var twitterAPI = require('node-twitter-api');
var util = require('util');
var fs = require('fs');
var twitter = new twitterAPI({
    consumerKey: yourConsumerKey,
    consumerSecret: yourConsumerSecret});

var badWord = "cunt";
twitter.getStream("filter", {track: badWord}, yourAccessToken,yourTokenSecret,onData);

function onData(error, streamEvent){
if (Object.keys(streamEvent).length === 0){
	return;
}
var tweetText = streamEvent['text'].toLowerCase();
var name = streamEvent['user']['screen_name'];
//console.log(streamEvent['user']['screen_name']);
//console.log(streamEvent['text']);

	
	var offendersList = []; // this is an assosciate array - container for objects

	// every time a new offender is detected 
	//(this is used to create an offender object, and happens only once for each offender)
		var tempOffender = {
		name: '',
		badWord: '',
		offenseCount: 0
	}

	if (offendersList.length > -1)
	offendersList.push(tempOffender); // add person to list of known offenders
	console.log(offendersList.length);


	// to check if an existing offender has more than one offense
	for(var i = 0; i < offendersList.length; i++){


		if (offendersList[i].hasOwnProperty(name) ){
			
			offendersList[i].offenseCount ++;
		
		// if an offender has more than 5 offense, do something
		if (offendersList[i].offenseCount > 1) {


		//console.log(name + " just said cunt again");

		}//end do something

		}//end offenseCount increment
	
	}//end for loop
	

}//end onData function



/*
	// you want to check through all the offenders
	// this is the mechanism for adding to the offense count
	for ( loop ) {
		
		if (offendersList[i].offensiveWord.hasOwnProperty(name) ){
			
			offendersList[i].offenseCount ++;
		}


	}

*/

/*
if (offenders.hasOwnProperty(name))
{
	offenders[name]++;
	console.log(name + "just said u again");
}
}
*/




