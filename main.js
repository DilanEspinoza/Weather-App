const $form = document.getElementById("form");
const $search = document.getElementById("search");

const apiKey = "bc4fddf88881eb2471377f6277e8de66";
const urlBase = "'https://api.openweathermap.org/data/2.5/weather";

async function getData(city) {
	try {
		let res = await fetch(`${urlBase}?q=${city}&appid=${apiKey}&units=metric`);
		let data = await res.json();
		return build(data);
	} catch (error) {
		buildError();
	}
}

function getIcon(weather) {
	switch (weather) {
		case "Rain":
			return "fas fa-cloud-showers-heavy";
		case "Clouds":
			return "fas fa-cloud";
		case "Clear":
			return "fas fa-cloud-sun";
		case "Snow":
			return "fas fa-snowman";
		case "Sunny":
			return "fas fa-sun";
		case "Mist":
			return "fas fa-smog";
		case "Thunderstorm" || "Drizzle":
			return "fas fa-thunderstorm";
		default:
			return "fas fa-cloud-sun";
	}
}

function build(data) {
	let { name, sys, weather, coord } = data;
	let { lat, lon } = coord;
	let { country } = sys;
	let [obj] = weather;
	let { main, description } = obj;

	let $container = document.querySelector(".container");
	let $article = document.querySelector("article");

	$article.classList.add("article__active");
	$article.innerHTML = `
     <div class="location-deatils">
        <h2>${name} -${country}</h2>
    </div>
    <div class="weather__deatils">
        <p>${main}</p>
        <i class="fa-solid fa-cloud-${getIcon(main)}" id="icon"></i>
        <p>Lat: ${lat} - Lon: ${lon}</p>
        <p class=""> Description: ${description}</p>
    </div>
    `;

	$container.appendChild($article);
}

function buildError() {
	let $container = document.querySelector(".container");
	let $article = document.querySelector("article");
	$article.innerHTML = `
    <p>City no found</p>
    `;
	$container.appendChild($article);
}

function showData() {
	let city = $search.value;
	getData(city);
}

$form.addEventListener("submit", (e) => {
	e.preventDefault();
	showData();
	$search.value = "";
});
