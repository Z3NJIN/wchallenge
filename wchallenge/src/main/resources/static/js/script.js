"use strict";
document.addEventListener('DOMContentLoaded', (event) => {

});

function getAllUsers() {
	let url = "http://localhost:8080/api/users";

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			let users = data;		

			var divUsers = "";
			users.forEach((user) => {
				divUsers += "<div class='columns'><div class='column'>"
					+ "<div class='card'>"
					+ "<div class='card-content'>"
					+ "<div class='media'>"
					+ "<div class='media-left'>"
					+ "<figure class='image is-48x48'>"
					+ "<img src='https://bulma.io/images/placeholders/96x96.png' alt='Placeholder image'>"
					+ "</figure>"
					+ "</div>"
					+ "<div class='media-content'>"
					+ "<p class='title is-4'>" + user.name + "</p>"
					+ "<p class='subtitle is-6'>" + user.username + "</p>"					
					+ "</div>"
					+ "</div>"
					+ "<div class='content'>"
					+ "<p><b>Email: </b>" + user.email + "</p>"
					+ "<p><b>Phone: </b>" + user.phone + "</p>"
					+ "<p><b>Website: </b><a>" + user.website + "</a></p>"
					+ "</div>"
					+ "</div>"
					+ "</div>"
					+ "</div>"
					+ "</div>";
			});
			
			document.getElementById("content").innerHTML = divUsers;
		});

}