const apiKey = "c5b6629140f3fee5f9365a733c6ccf73";
const searchHistory = [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search-button").addEventListener("click", searchWeather);
});

function searchWeather() {
    //get values of user input and assign to a variable
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    getApi(city,country,apiKey);
}

function getApi(city, countryCode, apiKey) {
    // api url with endpoints updated with user input
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
            //when api info is succesfully passed, displayWeatherForecast function is fired
            displayWeatherForecast(data);
        })
        .catch(function (error) {
            // error handling in case of page error
            console.error("Error fetching data:", error);
        });
}

function displayWeatherForecast(data) {
    const forecast = document.getElementById("forecast");
    //clear any previous forecast values
    forecast.innerHTML = "";
    //set the dates in an array
    const uniqueDates = {};

//loops through and creates elements from data
data.list.forEach(function (forecastItem) {
    //get the unix dt into a format js can work with
    const date = new Date(forecastItem.dt * 1000);
    //split the time and date returned from the dt conversion and grab only the date
    const dateString = date.toISOString().split("T")[0];
    //check for repeating dates and if they are unique, dynamically generate elements
    if (!uniqueDates[dateString]) {
        uniqueDates[dateString] = true;

    //generate each element dynamically
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
//update search history when user inputs city and country code
    if (!searchHistory.includes(data.city.name)) {
        searchHistory.push(data.city.name);
        updateSearchHistory();
    }
}

function updateSearchHistory() {
    const historyList = document.getElementById("search-history");
    //clear previous history
    historyList.innerHTML = "";

    searchHistory.forEach(function(search) {
        const [city, country] = search.split(",");
        const listItem = document.createElement("li");
        listItem.textContent = search;

        // store city and country info
        listItem.setAttribute("data-city",city);
        listItem.setAttribute("data-country",country);
//attemps at making history items clickable to retrieve 5 day forecast
        listItem.addEventListener("click",function() {
            const clickedCity = listItem.getAttribute("data-city");
            const clickedCountry = listItem.getAttribute("data-country");
            getApi(clickedCity, clickedCountry, apiKey);
        });
        historyList.appendChild(listItem);
    });
}