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
  let days = data.getDay();
  return `${daysOfWeek[4]} ${hour}:${minutes}`;
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
  currentCity.innerHTML = `${city}`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  description.innerHTML = response.data.weather[0].description;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
let apiKey = "51f128ddb960a0cbed5d6f3eea37ad01";
let city = "hamedan";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
