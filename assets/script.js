const apiKey = "c5b6629140f3fee5f9365a733c6ccf73";
const searchHistory = [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search-button").addEventListener("click", searchWeather);
});

function searchWeather() {
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    getApi(city,country,apiKey);
}

function getApi(city, countryCode, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${apiKey}&units=imperial`;
    
    fetch(apiUrl)
        .then(function (response) {
            // error handling for API Key fetch
            if (!response.ok) {
                throw new Error("API error!")
            } 
                return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayWeatherForecast(data);
        })
        .catch(function (error) {
            // error handling in case of page error
            console.error("Error fetching data:", error);
        });
}

function displayWeatherForecast(data) {
    const forecast = document.getElementById("forecast");
    forecast.innerHTML = "";

    const uniqueDates = {};

data.list.forEach(function (forecastItem) {
    const date = new Date(forecastItem.dt * 1000);
    const dateString = date.toISOString().split("T")[0];
    if (!uniqueDates[dateString]) {
        uniqueDates[dateString] = true;

    const cityNameElement= document.createElement("h3");
    cityNameElement.innerText = data.city.name;
    forecast.appendChild(cityNameElement);

    const dateElement = document.createElement("p");
    dateElement.innerText = date.toLocaleDateString();
    forecast.appendChild(dateElement);
   
    const iconElement = document.createElement("div");
    iconElement.innerHTML = `<img src="https://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png" alt="Weather Icon">`;
    forecast.appendChild(iconElement);

    const temperatureElement = document.createElement("p");
    temperatureElement.innerText = `${forecastItem.main.temp} °F`;
    forecast.appendChild(temperatureElement);

    const humidityElement = document.createElement("p");
    humidityElement.innerText = `Humidity: ${forecastItem.main.humidity}`;
    forecast.appendChild(humidityElement);

    const windSpeed = document.createElement("p");
    windSpeed.innerText = `Wind: ${forecastItem.wind.speed} mph`;
    forecast.appendChild(windSpeed);
}});
    if (!searchHistory.includes(data.city.name)) {
        searchHistory.push(data.city.name);
        updateSearchHistory();
    }
}

function updateSearchHistory() {
    const historyList = document.getElementById("search-history");
    historyList.innerHTML = "";

    searchHistory.forEach(function(search) {
        const [city, country] = search.split(",");
        const listItem = document.createElement("li");
        listItem.textContent = search;
        listItem.addEventListener("click",function() {
            getApi(city, country, apiKey);
        });
        historyList.appendChild(listItem);
    });
}