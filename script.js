let weather = {
    "apiKey": "7d1e012058bd1a5a376b8e1dedab9e2e",
    fetchWeather(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey)
            .then(response => response.json())
            .then(data => this.displayWeather(data));
    },
    displayWeather(data) {
        const { name } = data; // extracs the name property of the object data
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = `Weather in ${name}, ${country}`;
        document.querySelector(".temperature").innerText = `${temp} °C`;

        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;

        document.querySelector(".discription").innerText = description;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind speed: ${speed}km/h`;
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name},landscape')`;
    },
    search() {
        return this.fetchWeather(document.querySelector(".search-bar").value);
    },
    loadLocalWeather() {
        fetch('https://extreme-ip-lookup.com/json/')
        .then(res => res.json())
        .then(response => {
            this.fetchWeather(response.city);
        })
        .catch((data, status) => {
            this.fetchWeather(response.city);
            console.log('Request failed');
        })
    }
}

//Search button click event
document.querySelector(" div.search > button").addEventListener("click", () => weather.search());

//Enter key event
document.querySelector(".search-bar").addEventListener("keyup", (event) => { if (event.key == "Enter") weather.search() });

//Load local weather
weather.loadLocalWeather();


