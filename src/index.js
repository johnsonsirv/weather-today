/* eslint-disable no-undef */

const weatherAPIUrl = (location) => {
  const publicAPIKey = '3aab69399bf03eca438758bf6e33d18e';
  const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${publicAPIKey}`;
  return weatherAPI;
};

const weatherIcon = icon => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const updateWeatherUI = (data) => {
  document.getElementById('weather-icon').src = weatherIcon(data.weather[0].icon);
  document.getElementById('weather-location').innerHTML = `Location: ${data.name},${data.sys.country}`;
  document.getElementById('weather-temp').innerHTML = `Temperature: ${data.main.temp} &#8451;`;
  document.getElementById('weather-wind').innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById('weather-humidity').innerHTML = `Humidity: ${data.main.humidity} %`;
  document.getElementById('sunrise').textContent = `Sunrise:
    ${new Date((data.sys.sunrise + data.timezone) * 1000)
    .toLocaleTimeString().slice(-10, -6)} AM`;
  document.getElementById('sunset').textContent = `Sunset:
    ${new Date((data.sys.sunset + data.timezone) * 1000)
    .toLocaleTimeString().slice(-10, -6)} PM`;
};

const makeAPICall = (url) => {
  fetch(url,
    {
      mode: 'cors',
      cache: 'default',
    })
    .then(response => response.json())
    .then(data => updateWeatherUI(data))
    .catch(err => = `error: ${err}`);
};

const inputChoice = 'Lagos';
const url = weatherAPIUrl(inputChoice);
makeAPICall(url);
