$(document).ready(function() {

    //Initialize Firebase
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
    $('#train-form').on('submit', function() {
        trainName = $('#name-input').val().trim();
        trainDestination = $('#destination-input').val().trim();
        trainFirst = $('#first-input').val().trim();
        trainFrequency = $('#frequency-input').val().trim();

        console.log(trainName);
        console.log(trainDestination);
        console.log(trainFirst);
        console.log(trainFrequency);

        database.ref().push({
            trainName: trainName,
            trainDestination: trainDestination,
            trainFirst: trainFirst,
            trainFrequency: trainFrequency,
        });

        return false;
    });

    database.ref().on('child_added', function(snapshot) {
        var trains = snapshot.val();
        printTrain(trains); //Calling the function that creates the table data and rows
        console.log(snapshot.val());
    });

    function printTrain(trainObj) {
        //Time calculations
        //Converting the time into military time on submit handler
        var trainFirstConverted = moment(trainObj.trainFirst, "HH:mm").subtract(1, "years");
        console.log(moment(trainFirstConverted).format("HH:mm"));
        //Calculating the current time
        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("HH:mm"));
        //Difference between first train and current time
        var differenceTime = moment().diff(moment(trainFirstConverted), "minutes");
        console.log("Difference in Time: " + differenceTime);
        //Time apart (remainder)
        var timeRemainder = differenceTime % trainObj.trainFrequency;
        console.log(timeRemainder);
        //Minutes away
        var minutesTrain = trainObj.trainFrequency - timeRemainder;
        console.log("Minutes Until Train: " + minutesTrain);
        //Calculating the next train
        var nextTrain = moment().add(minutesTrain, "minutes");
        var nextTrainConverted = moment(nextTrain).format("HH:mm");
        console.log("Arrival Time: " + moment(nextTrain).format("HH:mm"));
        $('.train-stuff').append('<tr class="train-row">' +
            '<td class="train-name">' + trainObj.trainName + '</td>' +
            '<td class="train-destination">' + trainObj.trainDestination + '</td>' +
            '<td class="train-frequency">' + trainObj.trainFrequency + '</td>' +
            '<td class="train-next">' + nextTrainConverted + '</td>' +
            '<td class="train-minaway">' + minutesTrain + '</td>' + '</tr>');
    }

});
  




