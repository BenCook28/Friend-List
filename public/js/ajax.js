//declare global variables
var $friends = $('#friends');
var $name = $('#name');
var $age = $('#age');

//template the entered data will fill
var friendTemplate = "" +
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" +
	"<p><strong>Age:</strong> {{age}}</p>" +
	"<button id='{{id}}' class='remove'>X</button>" +
	"</li>";

//grab the entered friend, render it into a form HTML understands, attach this variable to the HTML document
function addFriend(friend){
	$friends.append(Mustache.render(friendTemplate, friend));
}
//grab the html page, when it loads, jQuery pulls from the API if successful, otherwise alerts with an error message
$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/bencook28/friends',
		success: function(friends) {
			$.each(friends, function(i, friend){
				addFriend(friend);
			});
		},

		error: function(){
			alert('error loading friends');
		}
	});
	//when someone clicks the Add! button, adds the object the user provides to the table array in the API, otherwise error message
	$('#add-friend').on('click', function(){

		var friend = {
			name: $name.val(),
			age: $age.val()
		};
		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/bencook28/friends',
			data: friend,
			success: function(newFriend){
				addFriend(newFriend);
			},
			error: function(){
				alert('error saving order');
			}
		});
	});
	//.delegate allows you to remove items that were loaded by other students
	$friends.delegate('.remove', 'click', function(){

		var $li = $(this).closest('li');
		//AJAX DELETE Function - click the .remove class button and the id identifies what to delete
		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/bencook28/friends/' + $(this).attr('id'),
			success: function(){
				$li.fadeOut(300, function(){
					$(this).remove()
				});
			}
		});
	});
});