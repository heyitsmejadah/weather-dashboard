var apiKey = "c5b6629140f3fee5f9365a733c6ccf73";
var lat = 39.742043;
var lon = -104.991531;
var searchHistory = [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search-button").addEventListener("click", searchWeather);
})

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
            // display temperature variable
            var temperature = data.main.temp;

            // create a list item to display temperature
            var listItem = document.createElement('li');
            listItem.textContent = `Temperature in ${city}, ${countryCode}: ${temperature}`;

            // append li to the tempholder container
            var tempHolder = document.getElementById('tempHolder');
            tempHolder.appendChild(listItem);

            console.log(data);
        })
        .catch(function (error) {
            // error handling in case of page error
            console.error("Error fetching data:", error);
        });
}

var city = "Denver";
var countryCode = "US";
