$(document).ready(function() {

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC8_Nk2_tkeGXYk64BBAlEVvMJc4SM4_Uo",
    authDomain: "train-schedule-67423.firebaseapp.com",
    databaseURL: "https://train-schedule-67423.firebaseio.com",
    storageBucket: "train-schedule-67423.appspot.com",
    messagingSenderId: "510065519709"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Creating variables
  var trainName = '';
  var trainDestination = '';
  var trainFirst = '';
  var trainNext = '';
  var trainMin = '';

  //Input form categories
  $('#train-form').on('submit', function(){
  	trainName = $('#name-input').val().trim();
  	trainDestination = $('#destination-input').val().trim();
  	trainFirst = $('#first-input').val().trim();
  	trainFrequency = $('#frequency-input').val().trim();

  	console.log(trainName);
  	console.log(trainDestination);
  	console.log(trainFirst);
  	console.log(trainFrequency);

  	//Time calculations
  	//Converting the time into military time on submit handler
  	var trainFirstConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
		console.log(moment(trainFirstConverted).format("HH:mm"));

	//Current time
	var currentTime = moment();
		console.log("Current Time: " + moment(currentTime).format("HH:mm"));

	//Difference between First train and current time
	var differenceTime = moment().diff(moment(trainFirstConverted), "minutes");
		console.log("Difference in Time: " + differenceTime);

	//Time apart (remainder) - (WHY DO WE NEED TO DO THIS?)
	var timeRemainder = differenceTime % trainFrequency;
		console.log(timeRemainder);

	//Minutes away
	var minutesTrain = trainFrequency - timeRemainder;
		console.log("Minutes Until Train: " + minutesTrain);

	//Next train
	var nextTrain = moment().add(minutesTrain, "minutes");
		console.log("Arrival Time: " + moment(nextTrain).format("HH:mm"));

  	database.ref().push({
  		trainName: trainName,
  		trainDestination: trainDestination,
  		trainFirst: trainFirst,
  		trainFrequency: trainFrequency,
  		trainMin: trainMin,
  	});
  	 return false;
  });
 
  	database.ref().on('value', function(snapshot){
	$('.train-stuff').append('<tr class="train-row">' + 
		'<td class="train-name">'+ snapshot.val().trainName + '</td>' + 
		'<td class="train-destination">' + snapshot.val().trainDestination + '</td>' + 
		'<td class="train-frequency">' + snapshot.val().trainFrequency + '</td>' + 
		'<td class="train-next">' + snapshot.val().trainNext + '</td>' + 
		'<td class="train-minaway">' + snapshot.val().trainMin + '</td>' + '</tr>'
 	);

});


	



});
 			