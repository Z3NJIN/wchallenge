"use strict";
var urlApi = "http://localhost:8080/api";

function getUsers() {

	let btnUsuarios = document.getElementById("btnUsuarios");
	btnUsuarios.classList.add("is-loading");
	btnUsuarios.disabled = true;

	let url = urlApi + "/users";

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			let users = data;
			let divUsers = "<div class='columns is-multiline'>";

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
					+ "<div class='column'><button class='button is-warning is-fullwidth' onclick='getAlbums(" + user.id + ")'>Ver álbumes</button></div>"
					+ "<div class='column'><button class='button is-danger is-fullwidth' onclick='getPhotos(\"user\"," + user.id + ")'>Ver fotos</button></div>"
					+ "</div>"
					+ "<div class='columns'>"
					+ "<div class='column'><button class='button is-success is-fullwidth' onclick='getSharedAlbums(" + user.id + ")'>Ver álbumes compartidos</button></div>"
					+ "</div>"
					+ "<div class='columns'>"
					+ "<div class='column'><button class='button is-link is-fullwidth' onclick='getComments(" + user.id + ")'>Ver comentarios</button></div>"
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

			let btnModal = document.getElementsByClassName('btn-modal');

			for (let i = 0; i < btnModal.length; i++) {
				btnModal[i].addEventListener('click', function(event) {
					event.preventDefault();
					let modal = document.querySelector('.modal');
					let html = document.querySelector('html');
					modal.classList.add('is-active');
					html.classList.add('is-clipped');

					modal.querySelector('.modal-background').addEventListener('click', function(e) {
						e.preventDefault();
						modal.classList.remove('is-active');
						html.classList.remove('is-clipped');
					});
				});
			}
		}).catch((e) => {
			console.log(e.message);
			alert("Ocurrió un error inesperado.");
		});
}

function moreInfoUser(user) {
	let divUser = "<div class='columns'><div class='column'>"
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

function getPhotos(tipo, id) {

	let btnFotos = document.getElementById("btnFotos");
	btnFotos.classList.add("is-loading");
	btnFotos.disabled = true;

	let url;

	if (tipo == "photo") {
		url = urlApi + "/photos";
	} else if (tipo == "album") {
		url = urlApi + "/album/photos?albumId=" + id;
	} else if (tipo == "user") {
		url = urlApi + "/user/photos?userId=" + id;
	}

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			let photos = data;
			let length = (photos.length >= 500 ? 500 : photos.length);
			let divPhotos = "<div class='columns is-multiline'>";


			for (let i = 0; i < length; i++) {
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

			let btnModal = document.getElementsByClassName('img-modal');

			for (let i = 0; i < btnModal.length; i++) {
				btnModal[i].addEventListener('click', function(event) {
					event.preventDefault();
					let modal = document.querySelector('.modal');  // assuming you have only 1
					let html = document.querySelector('html');
					modal.classList.add('is-active');
					html.classList.add('is-clipped');

					modal.querySelector('.modal-background').addEventListener('click', function(e) {
						e.preventDefault();
						modal.classList.remove('is-active');
						html.classList.remove('is-clipped');
					});
				});
			}
		}).catch((e) => {
			console.log(e.message);
			alert("Ocurrió un error inesperado.");
		});
}

function seePhoto(photo) {
	let divPhoto = "<p class='image is-4by3'><img src='" + photo.url + "' alt='" + photo.title + "'></p>";

	document.getElementById("modalContent").innerHTML = divPhoto;
}

function getAlbums(userId) {

	let btnAlbumes = document.getElementById("btnAlbumes");
	btnAlbumes.classList.add("is-loading");
	btnAlbumes.disabled = true;

	let url;
	if (userId == "" || userId == undefined) {
		url = urlApi + "/albums";
	} else {
		url = urlApi + "/user/album?userId=" + userId;
	}

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			let albums = data;
			showAlbums(albums, false);

			btnAlbumes.classList.remove("is-loading");
			btnAlbumes.disabled = false;
		}).catch((e) => {
			console.log(e.message);
			alert("Ocurrió un error inesperado.");
		});
}

function getSharedAlbums(userId) {

	let btnAlbumes = document.getElementById("btnAlbumes");
	btnAlbumes.classList.add("is-loading");
	btnAlbumes.disabled = true;

	let url = urlApi + "/shared/albums?userId=" + userId;

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			let albums = data;
			showAlbums(albums, userId, true);

			btnAlbumes.classList.remove("is-loading");
			btnAlbumes.disabled = false;
		}).catch((e) => {
			console.log(e.message);
			alert("Ocurrió un error inesperado.");
		});
}

function showAlbums(albums, userId, shared) {
	let divAlbums = "<div class='columns is-multiline'>";

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
			+ "<div class='columns'>"
			+ "<div class='column'><button class='button is-info is-fullwidth' onclick='getPhotos(\"album\"," + album.id + ")'>Ver fotos</button></div>"
			+ "<div class='column'><button class='button is-warning is-fullwidth btn-modal' onclick='shareAlbum(" + JSON.stringify(album) + ")'>Compartir álbum</button></div>"
			+ "</div>";

		if (shared) {
			album.userId = userId;

			divAlbums += "<div class='columns'>"
				+ "<div class='column'><button class='button is-danger is-fullwidth btn-modal' onclick='getSharedAlbum(" + JSON.stringify(album) + ")'>Editar permisos</button></div>"
				+ "</div>";
		}

		divAlbums += "</div>"
			+ "</div>"
			+ "</div>"
			+ "</div>";
	});

	divAlbums += "</div>";

	document.getElementById("content").innerHTML = divAlbums;

	let btnModal = document.getElementsByClassName('btn-modal');

	for (let i = 0; i < btnModal.length; i++) {
		btnModal[i].addEventListener('click', function(event) {
			event.preventDefault();
			let modal = document.querySelector('.modal');
			let html = document.querySelector('html');
			modal.classList.add('is-active');
			html.classList.add('is-clipped');

			modal.querySelector('.modal-background').addEventListener('click', function(e) {
				e.preventDefault();
				modal.classList.remove('is-active');
				html.classList.remove('is-clipped');
			});
		});
	}
}

function shareAlbum(album) {
	let divAlbum =
		"<div class='card'>"
		+ "<div class='card-content'>"
		+ "<div class='media'>"
		+ "<div class='media-content'>"
		+ "<p class='title is-4'>ID: " + album.id + "</p>"
		+ "<p class='subtitle is-6'>" + album.title + "</p>"
		+ "</div>"
		+ "</div>"
		+ "<p>Compartir con:</p>"
		+ "<div class='columns'>"
		+ "<div class='column'>"
		+ "<label class='label'>UserId: </label>"
		+ "<input id='inputUserId' class='input' type='number' placeholder='User id'>"
		+ "</div>"
		+ "<div class='column'>"
		+ "<label class='label'>Permisos: </label>"
		+ "<div class='columns'>"
		+ "<div class='column'>"
		+ "<label class='checkbox'><input id='checkLectura' type='checkbox'> Lectura</label>"
		+ "</div>"
		+ "<div class='column'>"
		+ "<label class='checkbox'><input id='checkEscritura' type='checkbox'> Escritura</label>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div class='column'>"
		+ "<button id='btnCompartir' class='button is-info is-success is-fullwidth btn-modal btn-compartir' onclick='saveSharedAlbum(" + album.id + ")'>Guardar</button>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>";

	document.getElementById("modalContent").innerHTML = divAlbum;
}

function saveSharedAlbum(albumId) {
	let btnCompartir = document.getElementById("btnCompartir");
	btnCompartir.classList.add("is-loading");
	btnCompartir.disabled = true;

	let permisos = {
		userId: document.getElementById("inputUserId").value,
		albumId: albumId,
		lectura: document.getElementById("checkLectura").checked,
		escritura: document.getElementById("checkEscritura").checked
	}

	let url = urlApi + "/shared/save";

	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(permisos)
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);

			alert(data.message);

			document.getElementById("inputUserId").value = "";
			document.getElementById("checkLectura").checked = false;
			document.getElementById("checkEscritura").checked = false;

			btnCompartir.classList.remove("is-loading");
			btnCompartir.disabled = false;
		}).catch((e) => {
			console.log(e.message);
			alert("Ocurrió un error inesperado.");
		});

}


function getSharedAlbum(album) {

	let url = urlApi + "/shared/permisos?userId=" + album.userId + "&albumId=" + album.id;

	fetch(url, { method: 'GET' })
		.then(response => response.json())
		.then(data => {
			console.log(data);

			let lectura = (data.permisos.lectura ? "checked" : "");
			let escritura = (data.permisos.escritura ? "checked" : "");

			let divAlbum = "<div class='card'>"
				+ "<div class='card-content'>"
				+ "<div class='media'>"
				+ "<div class='media-content'>"
				+ "<p class='title is-4'>ID: " + data.album.id + "</p>"
				+ "<p class='subtitle is-6'>" + data.album.title + "</p>"
				+ "</div>"
				+ "</div>"
				+ "<p>Compartir con:</p>"
				+ "<div class='columns'>"
				+ "<div class='column'>"
				+ "<label class='label'>UserId: </label>"
				+ "<input id='inputUserId' class='input' type='number' value='" +  data.permisos.userId + "' disabled>"
				+ "</div>"
				+ "<div class='column'>"
				+ "<label class='label'>Permisos: </label>"
				+ "<div class='columns'>"
				+ "<div class='column'>"
				+ "<label class='checkbox'><input id='checkLectura' type='checkbox' " + lectura + "> Lectura</label>"
				+ "</div>"
				+ "<div class='column'>"
				+ "<label class='checkbox'><input id='checkEscritura' type='checkbox' " + escritura + "> Escritura</label>"
				+ "</div>"
				+ "</div>"
				+ "</div>"
				+ "<div class='column'>"
				+ "<button id='btnCompartir' class='button is-info is-success is-fullwidth btn-modal btn-compartir' onclick='updateAlbum(" + data.album.id + "," + data.permisos.userId + ")'>Guardar</button>"
				+ "</div>"
				+ "</div>"
				+ "</div>"
				+ "</div>";

			document.getElementById("modalContent").innerHTML = divAlbum;

		}).catch((e) => {
			console.log(e.message);
			alert("Ocurrió un error inesperado.");
		});
}

function updateAlbum(albumId, userId) {
	let btnCompartir = document.getElementById("btnCompartir");
	btnCompartir.classList.add("is-loading");
	btnCompartir.disabled = true;

	let permisos = {
		userId: userId,
		albumId: albumId,
		lectura: document.getElementById("checkLectura").checked,
		escritura: document.getElementById("checkEscritura").checked
	}

	let url = urlApi + "/shared/update";

	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(permisos)
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			alert(data.message);
			btnCompartir.classList.remove("is-loading");
			btnCompartir.disabled = false;
		}).catch((e) => {
			console.log(e.message);
			alert("Ocurrió un error inesperado.");
		});

}

function getComment() {

	let btnComment = document.getElementById("btnComment");
	btnComment.classList.add("is-loading");
	btnComment.disabled = true;

	let inputCommment = document.getElementById("inputCommment").value;

	let url = urlApi + "/user/comment?name=" + inputCommment;

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			let comment = data;

			let divComment =
				"<div class='columns'>"
				+ "<div class='column'>"
				+ "<div class='card'>"
				+ "<div class='card-content'>"
				+ "<div class='media'>"
				+ "<div class='media-content'>"
				+ "<p class='title is-4'>ID: " + comment.id + "</p>"
				+ "<p class='subtitle is-6'><b>Name:</b> " + comment.name + "</p>"
				+ "</div>"
				+ "</div>"
				+ "<div class='content'>"
				+ "<p><b>Post id: </b>" + comment.postId + "</p>"
				+ "<p><b>Email: </b>" + comment.email + "</p>"
				+ "<p><b>Body: </b>" + comment.body + "</p>"
				+ "</div>"
				+ "</div>"
				+ "</div>"
				+ "</div>"
				+ "</div>";

			document.getElementById("content").innerHTML = divComment;

			btnComment.classList.remove("is-loading");
			btnComment.disabled = false;

		}).catch((e) => {
			console.log(e.message);
			alert("Ocurrió un error inesperado.");
		});
}

function getComments(userId) {

	let btnComment = document.getElementById("btnComment");
	btnComment.classList.add("is-loading");
	btnComment.disabled = true;

	let url = urlApi + "/user/comments?userId=" + userId;

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			let comments = data;

			let divComments = "<div class='columns is-multiline'>";

			comments.forEach((comment) => {
				divComments += "<div class='column is-4'>"
					+ "<div class='card'>"
					+ "<div class='card-content'>"
					+ "<div class='media'>"
					+ "<div class='media-content'>"
					+ "<p class='title is-4'>ID: " + comment.id + "</p>"
					+ "<p class='subtitle is-6'>" + comment.name + "</p>"
					+ "</div>"
					+ "</div>"
					+ "<div class='content'>"
					+ "<p><b>Post id: </b>" + comment.postId + "</p>"
					+ "<p><b>Email: </b>" + comment.email + "</p>"
					+ "<p><b>Body: </b>" + comment.body + "</p>"
					+ "</div>"
					+ "</div>"
					+ "</div>"
					+ "</div>";
			});

			divComments += "</div>";

			document.getElementById("content").innerHTML = divComments;

			btnComment.classList.remove("is-loading");
			btnComment.disabled = false;

		}).catch((e) => {
			console.log(e.message);
			alert("Ocurrió un error inesperado.");
		});
}

function searchUsers() {

	let btnUsuarios = document.getElementById("btnUsuarios");
	btnUsuarios.classList.add("is-loading");
	btnUsuarios.disabled = true;

	let permisos = {
		userId: "",
		albumId: document.getElementById("inputAlbum").value,
		lectura: document.getElementById("checkLecturaSearch").checked,
		escritura: document.getElementById("checkEscrituraSearch").checked
	}

	let url = urlApi + "/users/permisos";

	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(permisos)
	})
		.then(response => response.json())
		.then(data => {
			let users = data;
			let divUsers = "<div class='columns is-multiline'>";

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
					+ "<div class='column'><button class='button is-warning is-fullwidth' onclick='getAlbums(" + user.id + ")'>Ver álbumes</button></div>"
					+ "<div class='column'><button class='button is-danger is-fullwidth' onclick='getPhotos(\"user\"," + user.id + ")'>Ver fotos</button></div>"
					+ "</div>"
					+ "<div class='columns'>"
					+ "<div class='column'><button class='button is-success is-fullwidth' onclick='getSharedAlbums(" + user.id + ")'>Ver álbumes compartidos</button></div>"
					+ "</div>"
					+ "<div class='columns'>"
					+ "<div class='column'><button class='button is-link is-fullwidth' onclick='getComments(" + user.id + ")'>Ver comentarios</button></div>"
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

		}).catch((e) => {
			console.log(e.message);
			alert("Ocurrió un error inesperado.");
		});
}