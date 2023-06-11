function formatDate(timestamp) {
  let data = new Date(timestamp);
  let hour = data.getHours();
  let minutes = data.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let days = daysOfWeek[data.getDay()];
  return `${days} ${hour}:${minutes}`;
}
function displayForcast(response) {
  console.log(response.data);
  let forcastElement = document.querySelector("#forcast");
  let forecastDays = ["Tue", "Wed", "The", "Fri", "Sat"];

  let forcastHtml = `<div class="row preview">`;
  forecastDays.forEach(function (eachDay) {
    forcastHtml =
      forcastHtml +
      `
  <div class="col forcastPreview">
  <div class="weatherForcast">
  <div class="forcast-day">${eachDay}</div>
  <img src="/img/Smiley face_Two Color.svg" width="50px" alt="">
   <div class="forcast-temp">12°c</div>
   </div>
  </div>
  `;
  });

  forcastHtml = forcastHtml + `</div>`;
  forcastElement.innerHTML = forcastHtml;
}
function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForcast);
}
function displayTemp(response) {
  console.log(response.data);
  let currentTempElement = document.querySelector("#currentTemp");
  let currentCity = document.querySelector("#city");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let description = document.querySelector("#description");
  let currentDate = document.querySelector("#currentDate");
  let icon = document.querySelector("#icon");
  currentTempElement.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = `${response.data.name}`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  description.innerHTML = response.data.weather[0].description;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute(
    "alt",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForcast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchWeather(cityInput.value);
}
function searchWeather(city) {
  let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
// displayForcast();
