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
   		
   		var chfirstTrain = moment();
   		var chFrequency = snapshot.val().frequency;

		//Appending the child_add database into a tbody table when the name is inserted in the input.
		$('#theTimeSchedule > tbody').append('<tr><td>' + snapshot.val().trainName + '</td><td>' +
			snapshot.val().destination + '</td><td>' + snapshot.val().chfirstTrain + '</td><td>' +
			snapshot.val().chFrequency + '</td></tr>');


	
		
		console.log(snapshot.val());
		console.log(snapshot.val().trainName);
		console.log(snapshot.val().destination);
		console.log(snapshot.val().firstTrain);
		console.log(snapshot.val().frequency);
		console.log(chfirstTrain);
		
		
    });
   	


},10000);