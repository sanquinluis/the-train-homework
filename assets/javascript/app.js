$(document).ready(function(){
	//firebase is now inside the variable database to be called when ever needed.
  	var database = firebase.database();
  	//This on Click event will grab all the data that is put in the input form.
   $('#addUser').on("click", function(){
   		//Variables that are linked to the inputs.
   		var trainName = $("#trainInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = $("#firsttrainInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();
        //the database .push will send data to firebase.
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        })
        empty();
        return false;
   	 });
   	
   	database.ref().on('child_added',function(snapshot){
   		//Time input of the frequency of train.
   		var chFrequency = snapshot.val().frequency;
   		//live time is real time.
   		var liveTime = moment();
   		var chfirstTrain = moment(liveTime);
   		//one month back to avoid live time.
   		var oneMonth = moment(snapshot.val().firstTrain, 'hh:mm').subtract(1, 'month');
   		var timeOftrain = moment(oneMonth).format('HH:mm:ss');
   		//another one, to track the time of the train by the time put on Input.
   		var anotherMonth = moment(timeOftrain,'hh:mm' ).subtract(1, 'month');
   		
   		var residualTime = moment().diff(moment(oneMonth), 'minutes');
   		//Time apart between trains.
   		var timeRemainder = residualTime % chFrequency;
   		//math equation to solve the minutes till the next train.
   		var whereIstheTrain = chFrequency - timeRemainder; 
   		//next train arrival 
   		var nextarrival = moment().add(whereIstheTrain, 'minutes').format('HH:mm:ss');


		//Appending the child_add database into a tbody table when the name is inserted in the input.
		$('#theTimeSchedule > tbody').append('<tr><td>' + snapshot.val().trainName + '</td><td>' +
			snapshot.val().destination + '</td><td>' + snapshot.val().frequency + " minutes" + '</td><td>' +
			nextarrival + '</td><td>' + whereIstheTrain + " minutes" + '</td></tr>');


		// console.log(snapshot.val());
		// console.log(snapshot.val().trainName);
		// console.log(snapshot.val().destination);
		// console.log(snapshot.val().firstTrain);
		// console.log(snapshot.val().frequency);
		// console.log(snapshot.val().chFrequency);
		// console.log(chfirstTrain);
		console.log("Current Time " + moment(liveTime).format("hh:mm"));
		console.log("This is the  frequency " + chFrequency);
		// console.log(oneMonth);
		console.log("Time of Train " + timeOftrain);
		// console.log(anotherMonth);
		console.log("Residual Time " + residualTime);
		console.log('minutes till arrival ' + whereIstheTrain);
		console.log('Next Train is at ' + nextarrival);
    });
   	


},1000);




