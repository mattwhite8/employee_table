// Initialize Firebase
var config = {
	apiKey: "AIzaSyD7g6hT91fIM1yPrM9YePXQonGwH7_Lr_s",
	authDomain: "employeetable-92b26.firebaseapp.com",
	databaseURL: "https://employeetable-92b26.firebaseio.com",
	storageBucket: "employeetable-92b26.appspot.com",
	messagingSenderId: "41878555978"
};
firebase.initializeApp(config);

var database = firebase.database();





$("#employee-submit").on("click", function(event){
	event.preventDefault();

	var name = $("#employee-name").val().trim();
	var role = $("#role").val().trim();
	var startDate = $("#date").val().trim();
	var monthlyRate = $("#rate").val().trim();

	$("#employee-name").val('');
	$("#role").val('');
	$("#date").val('');
	$("#rate").val('');

	database.ref('employees/').push({
		name: name,
		role: role,
		startDate: moment(startDate,'MM-DD-YY').format('MM-DD-YY'),
		monthlyRate: monthlyRate
	})


})

database.ref('employees/').on("child_added", function(snapshot){
	var snapVal = snapshot.val();

	var now = moment();
	var date = snapVal.startDate;
	var monthsWorked = Math.floor(Math.abs(moment(date,'MM-DD-YY').diff(now,'months',true)));

	$("#table-body").append("<tr><td>"+snapVal.name+"</td>"+
		"<td>"+snapVal.role+"</td>"+
		"<td>"+snapVal.startDate+"</td>"+
		"<td>"+monthsWorked+"</td>"+
		"<td>"+snapVal.monthlyRate+"</td>"+
		"<td>"+monthsWorked*snapVal.monthlyRate+"</td></tr>");
	
})


$( document ).ready(function(){

})