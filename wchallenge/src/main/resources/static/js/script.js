"use strict";

function getUsers() {

	let btnUsuarios = document.getElementById("btnUsuarios");
	btnUsuarios.classList.add("is-loading");
	btnUsuarios.disabled = true;

	let url = "http://localhost:8080/api/users";

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			let users = data;
			var divUsers = "<div class='columns is-multiline'>";

			users.forEach((user) => {
				divUsers += "<div class='column is-4'>"
					+ "<div class='card'>"
					+ "<div class='card-content'>"
					+ "<div class='media'>"
					+ "<div class='media-left'>"
					+ "<figure class='image is-48x48'>"
					+ "<img src='https://bulma.io/images/placeholders/96x96.png' alt='Placeholder image'>"
					+ "</figure>"
					+ "</div>"
					+ "<div class='media-content'>"
					+ "<p class='title is-4'>" + user.id + " - " + user.name + "</p>"
					+ "<p class='subtitle is-6'>" + user.username + "</p>"
					+ "</div>"
					+ "</div>"
					+ "<div class='content'>"
					+ "<p><b>Email: </b>" + user.email + "</p>"
					+ "<p><b>Phone: </b>" + user.phone + "</p>"
					+ "<p><b>Website: </b><a>" + user.website + "</a></p>"
					+ "<div class='columns'>"					
					+ "<div class='column'><button class='button is-info is-fullwidth btn-modal' onclick='moreInfoUser(" + JSON.stringify(user) + ")'>Más info</button></div>"
					+ "<div class='column'><button class='button is-warning is-fullwidth' onclick='getAlbums(" + user.id + ")'>Ver albums</button></div>"
					+ "<div class='column'><button class='button is-danger is-fullwidth' onclick='getPhotos(\"user\"," + user.id + ")'>Ver fotos</button></div>"
					+ "</div>"
					
					+ "<div class='columns'>"					
					+ "<div class='column'><button class='button is-success is-fullwidth' onclick='getSharedAlbums(" + user.id + ")'>Ver álbumes compartidos</button></div>"					
					+ "</div>"
										
					+ "</div>"
					+ "</div>"
					+ "</div>"
					+ "</div>";
			});

			divUsers += "</div>";

			document.getElementById("content").innerHTML = divUsers;

			btnUsuarios.classList.remove("is-loading");
			btnUsuarios.disabled = false;

			var btnModal = document.getElementsByClassName('btn-modal');

			for (var i = 0; i < btnModal.length; i++) {
				btnModal[i].addEventListener('click', function(event) {
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
			}
		});
}

function moreInfoUser(user) {
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
		+ "<p class='title is-4'>" + user.id + " - " + user.name + "</p>"
		+ "<p class='subtitle is-6'>" + user.username + "</p>"
		+ "</div>"
		+ "</div>"
		+ "<div class='columns'>"
		+ "<div class='column is-4'>"
		+ "<p><b>Email: </b>" + user.email + "</p>"
		+ "<p><b>Phone: </b>" + user.phone + "</p>"
		+ "<p><b>Website: </b><a>" + user.website + "</a></p>"
		+ "</div>"
		+ "<div class='column is-4'>"
		+ "<p><b>Address</b></p>"
		+ "<ul><li><b>Street: </b>" + user.address.street + "</li>"
		+ "<li><b>Suite: </b>" + user.address.suite + "</li>"
		+ "<li><b>City: </b>" + user.address.city + "</li>"
		+ "<li><b>Zip code: </b>" + user.address.zipcode + "</li>"
		+ "</ul>"
		+ "</div>"
		+ "<div class='column is-4'>"
		+ "<p><b>Company</b><ul>"
		+ "<li><b>Name: </b>" + user.company.name + "</li>"
		+ "<li><b>Catch phrase: </b>" + user.company.catchphrase + "</li>"
		+ "<li><b>Bs: </b>" + user.company.bs + "</li>"
		+ "</ul></p>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>";

	document.getElementById("modalContent").innerHTML = divUser;
}

function getPhotos(tipo,id) {

	let btnFotos = document.getElementById("btnFotos");
	btnFotos.classList.add("is-loading");
	btnFotos.disabled = true;
	
	let url;
	
	if(tipo == "photo"){
		url = "http://localhost:8080/api/photos";		
	} else if (tipo == "album") {
		url = "http://localhost:8080/api/album/photos?albumId=" + id;		
	} else if (tipo == "user"){
		url = "http://localhost:8080/api/user/photos?userId=" + id;
	}
	
	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			let photos = data;
			let length = (photos.length >= 500 ? 500 : photos.length);
			var divPhotos = "<div class='columns is-multiline'>";
			
			
			for (var i = 0; i < length; i++) {
				divPhotos += "<div class='column is-4'>"
					+ "<div class='card'>"
					+ "<div class='card-content'>"
					+ "<div class='media'>"
					+ "<div class='media-left'>"
					+ "<figure class='image is-48x48 img-modal' onclick='seePhoto(" + JSON.stringify(photos[i]) + ")'>"
					+ "<img src='" + photos[i].thumbnailUrl + "' alt='" + photos[i].title + "'>"
					+ "</figure>"
					+ "</div>"
					+ "<div class='media-content'>"
					+ "<p class='title is-4'>ID: " + photos[i].id + "</p>"
					+ "<p class='subtitle is-6'>" + photos[i].title + "</p>"
					+ "</div>"
					+ "</div>"
					+ "<div class='content'>"
					+ "<p><b>Album: </b>" + photos[i].albumId + "</p>"
					+ "</div>"
					+ "</div>"
					+ "</div>"
					+ "</div>";
			}

			divPhotos += "</div>";

			document.getElementById("content").innerHTML = divPhotos;

			btnFotos.classList.remove("is-loading");
			btnFotos.disabled = false;

			var btnModal = document.getElementsByClassName('img-modal');

			for (var i = 0; i < btnModal.length; i++) {
				btnModal[i].addEventListener('click', function(event) {
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
			}
		});
}

function seePhoto(photo) {
	var divPhoto = "<p class='image is-4by3'><img src='" + photo.url + "' alt='" + photo.title + "'></p>";

	document.getElementById("modalContent").innerHTML = divPhoto;
}

function getAlbums(userId) {

	let btnAlbumes = document.getElementById("btnAlbumes");
	btnAlbumes.classList.add("is-loading");
	btnAlbumes.disabled = true;

	let url;
	if (userId == "" || userId == undefined) {
		url = "http://localhost:8080/api/albums";
	} else {
		url = "http://localhost:8080/api/user/album?userId=" + userId;
	}
	

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			let albums = data;
			var divAlbums = "<div class='columns is-multiline'>";

			albums.forEach((album) => {
				divAlbums += "<div class='column is-4'>"
					+ "<div class='card'>"
					+ "<div class='card-content'>"
					+ "<div class='media'>"
					+ "<div class='media-content'>"
					+ "<p class='title is-4'>ID: " + album.id + "</p>"
					+ "<p class='subtitle is-6'>" + album.title + "</p>"
					+ "</div>"
					+ "</div>"
					+ "<div class='content'>"
					+ "<p><b>UserId: </b>" + album.userId + "</p>"
					+ "<div><button class='button is-info is-fullwidth btn-modal' onclick='getPhotos(\"album\"," + album.id + ")'>Ver fotos</button></div>"
					+ "</div>"
					+ "</div>"
					+ "</div>"
					+ "</div>";
			});

			divAlbums += "</div>";

			document.getElementById("content").innerHTML = divAlbums;

			btnAlbumes.classList.remove("is-loading");
			btnAlbumes.disabled = false;
		});
}

function getSharedAlbums(userId) {
	
	let btnAlbumes = document.getElementById("btnAlbumes");
	btnAlbumes.classList.add("is-loading");
	btnAlbumes.disabled = true;

	let url = "http://localhost:8080/api/shared/albums?userId=" + userId;

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			let albums = data;
			var divAlbums = "<div class='columns is-multiline'>";

			albums.forEach((album) => {
				divAlbums += "<div class='column is-4'>"
					+ "<div class='card'>"
					+ "<div class='card-content'>"
					+ "<div class='media'>"
					+ "<div class='media-content'>"
					+ "<p class='title is-4'>ID: " + album.id + "</p>"
					+ "<p class='subtitle is-6'>" + album.title + "</p>"
					+ "</div>"
					+ "</div>"
					+ "<div class='content'>"
					+ "<p><b>UserId: </b>" + album.userId + "</p>"
					+ "<div><button class='button is-info is-fullwidth btn-modal' onclick='getPhotos(\"album\"," + album.id + ")'>Ver fotos</button></div>"
					+ "</div>"
					+ "</div>"
					+ "</div>"
					+ "</div>";
			});

			divAlbums += "</div>";

			document.getElementById("content").innerHTML = divAlbums;

			btnAlbumes.classList.remove("is-loading");
			btnAlbumes.disabled = false;
		});
}