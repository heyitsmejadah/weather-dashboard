var apiKey = "c5b6629140f3fee5f9365a733c6ccf73";
var lat =  39.742043;
var lon = -104.991531;

function getApi(lat, lon, apiKey) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API key}";

    fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) {
                alert("API error!");
            } else {
            return response.json();
    }
    })
        // .then(function (data) {
        //     for (var i = 0; i < data.length; i++) {
        //         var listItem = document.createElement('li');
        //         listItem.textContent = data[i].html_url;
        //         repoList.appendChild(listItem);
        //       }
        //     if (data) {
        //         console.log(data);
        //     } else {
        //         alert("Api data error!");
        //     }
        // });

            .then(function (data) {
                var temp = data.main.temp;

                var listItem = document.createElement("li");
                listItem.textContent = "Temperature: ${temperature}";
                var tempholder = document.getElementById("tempholder");
                tempholder.appendChild(listItem);

                console.log(data);
            })
            .catch(function (error) {
                console.error("Error fetching data!", error);
            });
            
}
getApi(lat, lon, apiKey);