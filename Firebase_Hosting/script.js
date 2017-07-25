$(document).ready(function () {

  //Firebase configuration
  var config = {
    apiKey: "AIzaSyBjIvRbh4eYZUre0Rv6qGMkKVD4KI_fbsQ",
    authDomain: "train-88e28.firebaseapp.com",
    databaseURL: "https://train-88e28.firebaseio.com",
    projectId: "train-88e28",
    storageBucket: "train-88e28.appspot.com",
    messagingSenderId: "504525261016"
  };

  // Intilize Firebase
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database()

  // variables used to store paramerters of train information submission
  var train_name = "";
  var destination_name = "";
  var train_time=

  "";
  var frequency = 0;


  //onstartup as well as onsubmission, update the table
  database.ref().on('child_added',function(snapshot) {
    firstArrival = snapshot.val().train_time
    currentTime = moment()
    frequencyTrain = snapshot.val().frequency

    //train time logic
     firstTrain = moment(firstArrival,"hh:mm");
     diffTime = moment().diff(moment(firstTrain),"minutes");
    //  diffTime = moment(firstTrain,"minutes").diff(moment());

     tRemainder = diffTime % frequencyTrain;
     minutesTillTrain = frequencyTrain - tRemainder
     nextTrain = moment().add(minutesTillTrain,"minute")
     nextTrainFormatted = moment(nextTrain).format("hh:mm a")
      console.log(minutesTillTrain)
    //  console.log(nextTrainFormatted)
    // console.log(minutesTillTrain)
    console.log(nextTrainFormatted)








    // full list of items to the well
    $("#train-table").append("<tr class='table-row'><td id='name'>" + snapshot.val().train_name+
    "</td><td><span id='email'> " + snapshot.val().destination_name +
          " </span></td><td><span id='age'> " + snapshot.val().frequency +  "</span></td><td><span id='age'> " + nextTrainFormatted +
          " </span></td><td><span id='age'> " + minutesTillTrain+"</span></td></tr></div>");

  })


  //onclick function for sunmisssion of train information
  $("#btn-submit").on('click', function (e) {
    e.preventDefault();
    console.log($('#frequency').val());
    train_name = $('#train-name').val().trim();
    destination_name = $('#destination-name').val().trim();
    train_time = $('#time').val().trim();
    frequency = $('#frequency').val().trim();

    //code for handling the push
    database.ref().push({
      train_name: train_name,
      destination_name:destination_name,
      train_time: train_time,
      frequency:frequency,
      dataAdded: firebase.database.ServerValue.TIMESTAMP
    })

  })




})
