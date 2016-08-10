$(document).ready(function(){
	//firebase is now inside the variable database to be called when ever needed.
  	var database = firebase.database();
  	//This on Click event will grab all the data that is put in the input form.
   $('#addUser').on("click", function(){

   		var trainName = $("#trainInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = $("#firsttrainInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        })
        return false;
   	 });
   	
   	database.ref().on('child_added',function(snapshot){
   		
   		var chfirstTrain = snapshot.val().firstTrain;
   		var chFrequency = snapshot.val().frequency;
		
		$('#theTimeSchedule').append('<tr><td>' + snapshot.val().trainName + 
			'</td></td>' + snapshot.val().destination  + 
			'</td></td>' + snapshot.val().chfirstTrain +
			'</td></tr>' + snapshot.val().chFrequency);
		
		console.log(snapshot.val());
		console.log(snapshot.val().trainName);
		console.log(snapshot.val().destination);
		console.log(snapshot.val().firstTrain);
		console.log(snapshot.val().frequency);
		
    });
   	


},10000);