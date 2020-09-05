"use strict";
document.addEventListener('DOMContentLoaded', (event) => {

});

function getHello() {

	let name = document.getElementById("name").value;
	let url = "http://localhost:8080/api/hello?name=" + name;

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			document.getElementById("spanMessage").innerText = data.message;
		});
}

function getQuote() {

	let url = "http://localhost:8080/api/quote";

	fetch(url, { method: "GET" })
		.then(response => response.json())
		.then(data => {
			alert("Quote: " + data.value.quote);
		});
}