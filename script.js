let now = new Date();
let weekDay = [
  "Sunday",
  "Monday",
  "Tueasday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = now.getDay();
let hours = now.getHours();
let minutes = now.getMinutes();
let currentTime = document.querySelector("#current-time");
if (minutes < 10) {
  currentTime.innerHTML = weekDay[day] + ", " + hours + ":0" + minutes;
} else {
  currentTime.innerHTML = weekDay[day] + ", " + hours + ":" + minutes;
}

let celsiusTemp = 17;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="Cloudy" width="42px">
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-max">${
                    forecastDay.temp.max
                  }°</span> 
                  <span class="weather-forecast-temp-min">${
                    forecastDay.temp.min
                  }°</span>
                </div>
              </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function currentCity(event) {
  event.preventDefault();
  let city = document.querySelector("#entered-city");
  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = city.value;

  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city.value +
    "&units=metric&appid=" +
    apiKey;
  console.log(apiURL);

  function showTemp(response) {
    let temp = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#currentTemp");
    currentTemp.innerHTML = temp + "°";
    let humidity = response.data.main.humidity;
    currentHumidity = document.querySelector("#currentHumidity");
    currentHumidity.innerHTML = "Humidity: " + humidity + "%";
    let wind = Math.round(response.data.wind.speed);
    currentWind = document.querySelector("#currentWind");
    currentWind.innerHTML = "Wind: " + wind + " km/h";
    let currentWeatherDesc = document.querySelector("#current-weather-desc");
    currentWeatherDesc.innerHTML = response.data.weather[0].main;
    let currentIcon = document.querySelector("#icon");
    currentIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    celsiusTemp = response.data.main.temp;

    getForecast(response.data.coord);
  }
  axios.get(apiURL).then(showTemp);
}
let cityForm = document.querySelector("#current-city");
cityForm.addEventListener("submit", currentCity);

function locationCity(event) {
  event.preventDefault();

  function getPosition(position) {
    console.log(position.coords.latitude);
    latitude = position.coords.latitude;
    console.log(position.coords.longitude);
    longitude = position.coords.longitude;
    let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
    let apiURL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&units=metric&appid=" +
      apiKey;
    console.log(apiURL);

    function showTemp(response) {
      let temp = Math.round(response.data.main.temp);
      let currentTemp = document.querySelector("#currentTemp");
      currentTemp.innerHTML = temp + "°";
      let humidity = response.data.main.humidity;
      currentHumidity = document.querySelector("#currentHumidity");
      currentHumidity.innerHTML = "Humidity: " + humidity + "%";
      let wind = Math.round(response.data.wind.speed);
      currentWind = document.querySelector("#currentWind");
      currentWind.innerHTML = "Wind: " + wind + " km/h";
      let city = response.data.name;
      let displayCity = document.querySelector("#display-city");
      displayCity.innerHTML = city;
      let currentWeatherDesc = document.querySelector("#current-weather-desc");
      currentWeatherDesc.innerHTML = response.data.weather[0].main;
      let currentIcon = document.querySelector("#icon");
      currentIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );

      celsiusTemp = response.data.main.temp;
    }
    axios.get(apiURL).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(getPosition);
}
let locationForm = document.querySelector("#current-location");
locationForm.addEventListener("submit", locationCity);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp) + "°";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemp) + "°";
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);
