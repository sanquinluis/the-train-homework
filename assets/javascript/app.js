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

        });

   	 });
   	
   	database.ref().on('child_added',function(Snapshot){
		
		$('table').append('<tr><td>' + Snapshot.val().trainName + '</td></tr>');
		$('table').append('<tr><td>' + Snapshot.val().destination + '</td></tr>');

		
		console.log(Snapshot.val().trainName);
		console.log(Snapshot.val().destination);
		
    });
   	


});