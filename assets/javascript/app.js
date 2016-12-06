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
  var trainFrequency = '';
  var trainNext = '';
  var trainMin = '';

  $('#train-form').on('submit', function(){
  	trainName = $('#name-input').val().trim();
  	console.log(trainName);
  	trainDestination = $('#destination-input').val().trim();
  	trainFrequency = $('#first-input').val().trim();
  	trainNext = $('#frequency-input').val().trim();

  	database.ref().push({
  		trainName: trainName,
  		trainDestination: trainDestination,
  		trainFrequency: trainFrequency,
  		trainNext: trainNext,
  		trainMin: trainMin,
  	});
  	 return false;
  });
 
  	database.ref().on('value', function(snapshot){
	$('.train-stuff').append('<tr class="train-row">' + '<td class="train-name">'+ snapshot.val().trainName + '</td>' + '<td class="train-destination">' + snapshot.val().trainDestination + '</td>' + '<td class="train-frequency">' + snapshot.val().trainFrequency + '</td>' + '<td class="train-next">' + snapshot.val().trainNext + '</td>' + '<td class="train-minaway">' + snapshot.val().trainMin + '</td>' + '</tr>'
 	);

});

});
	
 

//   //Append the DOM
 	

 			