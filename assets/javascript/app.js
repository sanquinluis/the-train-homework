$(document).ready(function(){

  var database = firebase.database();

   $('#addUser').on("click", function(){

   		var trainName = $("#trainInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = $("#firsttrainInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency

        })
        return false;

   	 });
   	
   	database.ref().on('child_added',function(snapshot){
   		var trainName = snapshot.val().trainName;
   		var destination = snapshot.val().destination;
   		var firstTrain = snapshot.val().firstTrain;
   		var frequency = snapshot.val().frequency;
		
		$('table').append('<tr><td>' + snapshot.val().trainName + 
			'</td></td>' + destination  + 
			'</td></td>' + firstTrain +
			'</td></td>' + frequency);
		
		console.log(snapshot.val());
		console.log(snapshot.val().trainName);
		console.log(snapshot.val().destination);
		console.log(snapshot.val().firstTrain);
		console.log(snapshot.val().frequency);
		
    });
   	


});