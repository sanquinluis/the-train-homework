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
   		var residualTime = moment().diff(moment(anotherMonth), 'minutes');
   		var timeLeft = residualTime % chFrequency;
   		var whereIstheTrain = chFrequency - timeLeft; 
   		var hereIstheTrain = moment().add(whereIstheTrain, 'minutes').format('HH:mm:ss');


		//Appending the child_add database into a tbody table when the name is inserted in the input.
		$('#theTimeSchedule > tbody').append('<tr><td>' + snapshot.val().trainName + '</td><td>' +
			snapshot.val().destination + '</td><td>' + snapshot.val().frequency + '</td><td>' +
			snapshot.val().chfirstTrain + '</td></td>' + hereIstheTrain + '</td></tr>');


	
		
		console.log(snapshot.val());
		console.log(snapshot.val().trainName);
		console.log(snapshot.val().destination);
		console.log(snapshot.val().firstTrain);
		console.log(snapshot.val().frequency);
		console.log(snapshot.val().chFrequency);
		console.log(chfirstTrain);
		console.log(liveTime);
		console.log(oneMonth);
		console.log(timeOftrain);
		console.log(anotherMonth);
		console.log(residualTime);
		console.log('chFrequency - timeLeft ' + whereIstheTrain);
		console.log('where is the Train ' + hereIstheTrain);
    });
   	


},10000);