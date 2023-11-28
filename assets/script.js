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
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=imperial`;
    
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
            displayWeather(data);
        })
        .catch(function (error) {
            // error handling in case of page error
            console.error("Error fetching data:", error);
        });
}
// I NEED TO APPEND THE DISPLAYWEATHER ITEMS TO SOMETHING FOR THEM TO APPEAR
function displayWeather(data) {
    const forecast = document.getElementById("forecast")
    forecast.innerHTML = "";

    const cityNameElement= document.createElement("h2");
    cityNameElement.innerText = data.name;
    forecast.appendChild(cityNameElement);

    const currentDateElement = document.createElement("p");
    const currentDate = new Date();
    currentDateElement.innerText = currentDate.toLocaleDateString();
    forecast.appendChild(currentDateElement)
   
    const iconElement = document.createElement("div");
    iconElement.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">`;
    forecast.appendChild(iconElement);

    const temperatureElement = document.createElement("p");
    temperatureElement.innerText = `${data.main.temp} °F`;
    forecast.appendChild(temperatureElement);

    if (!searchHistory.includes(data.name)) {
        searchHistory.push(data.name);
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