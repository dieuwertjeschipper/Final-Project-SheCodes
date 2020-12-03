function formatDate() {
  let currentDate = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let date = currentDate.getDate();
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let newTime = `${hour}:${minute}`;
  let formattedDate = `${day} ${month} ${date}, ${year} | ${newTime}`;

  return formattedDate;
}

let h2 = document.querySelector("h2#current-date");
h2.innerHTML = formatDate();

function showTemperature(response) {
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let celcius = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".main-temp");
  currentTemperature.innerHTML = `${celcius}`;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "d9880783c80563d424de115efab499a0";
  let unit = "metric";
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = "8f071d4d6afb831cf32e1beb0f3cdeb3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);
