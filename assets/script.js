var apiKey = "c5b6629140f3fee5f9365a733c6ccf73";
var searchHistory = [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search-button").addEventListener("click", searchWeather);
});

function searchWeather() {
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;
    getApi(city,country,apiKey);
}

function getApi(city, countryCode, apiKeyParam) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKeyParam}`;

    fetch(apiUrl)
        .then(function (response) {
            // error handling for API Key fetch
            if (!response.ok) {
                alert("API error!");
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            displayWeather(data);
            console.log(data);
        })
        .catch(function (error) {
            // error handling in case of page error
            console.error("Error fetching data:", error);
        });
}
function displayWeather(data) {
    document.getElementById("city-name").innerText = data.name;
    document.getElementById("date").innerText = new Date().toLocaleDateString();
    // FIX THIS!!!!
    document.getElementById("icon").innerHTML = "img src="<https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">`;
    // FIX THIS to make it fahrenheit
    document.getElementById("temperature").innerText = "Temperature: ${data.main.temp} degrees celcious";
}
