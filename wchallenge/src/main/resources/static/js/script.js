"use strict";
document.addEventListener('DOMContentLoaded', (event) => {



});


function getAllUsers() {

	let btnUsuarios = document.getElementById("btnUsuarios");
	btnUsuarios.classList.add("is-loading");
	btnUsuarios.disabled = true;

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
					+ "<div><button class='button is-danger is-fullwidth btn-modal' onclick='verMasUser(" + JSON.stringify(user) + ")'>Ver más</button></div>"
					+ "</div>"
					+ "</div>"
					+ "</div>"
					+ "</div>"
					+ "</div>";
			});

			document.getElementById("content").innerHTML = divUsers;

			btnUsuarios.classList.remove("is-loading");
			btnUsuarios.disabled = false;

			document.querySelector('.btn-modal').addEventListener('click', function(event) {
				event.preventDefault();
				var modal = document.querySelector('.modal');  // assuming you have only 1
				var html = document.querySelector('html');
				modal.classList.add('is-active');
				html.classList.add('is-clipped');

				modal.querySelector('.modal-background').addEventListener('click', function(e) {
					e.preventDefault();
					modal.classList.remove('is-active');
					html.classList.remove('is-clipped');
				});
			});
		});
}

function verMasUser(user) {
	console.log(user);

	var divUser = "<div class='columns'><div class='column'>"
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
		+ "<div class='content columns'>"
		+ "<div class='column is-4'>"
		+ "<p><b>Email: </b>" + user.email + "</p>"
		+ "<p><b>Phone: </b>" + user.phone + "</p>"
		+ "<p><b>Website: </b><a>" + user.website + "</a></p>"
		+ "</div>"
		+ "<div class='column is-4'>"
		+ "<p><b>Address</b><ul>"
		+ "<li><b>Street: </b>" + user.address.street + "</li>"
		+ "<li><b>Suite: </b>" + user.address.suite + "</li>"
		+ "<li><b>City: </b>" + user.address.city + "</li>"
		+ "<li><b>Zip code: </b>" + user.address.zipcode + "</li>"
		+ "</ul></p>"
		+ "</div>"
		+ "<div class='column is-4'>"
		+ "<p><b>Company</b><ul>"
		+ "<li><b>Name: </b>" + user.company.name+ "</li>"
		+ "<li><b>Catch phrase: </b>" + user.company.catchphrase+ "</li>"
		+ "<li><b>Bs: </b>" + user.company.bs + "</li>"		
		+ "</ul></p>"
		+ "</div>"
		+ "<div id='map'></div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>";

	document.getElementById("modalContent").innerHTML = divUser;
	
	mapboxgl.accessToken = 'pk.eyJ1IjoibWFybG9uZHZnIiwiYSI6ImNrZXE1MHNiZTB5cnMyenBubjY1eWJtdmQifQ.0dNqSpDS5BKmOgJiHoRpRQ';
	var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
	center: [user.address.geo.lng, user.address.geo.lat], // starting position [lng, lat]
	zoom: 9 // starting zoom
	});
}