/* eslint-disable no-undef */

const weatherAPIUrl = (location) => {
  const publicAPIKey = '3aab69399bf03eca438758bf6e33d18e';
  const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${publicAPIKey}`;
  return weatherAPI;
};

const weatherIcon = icon => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const updateWeatherUI = (data) => {
  document.getElementById('weather-data').innerHTML = `${JSON.stringify(data)}`;
  document.getElementById('weather-icon').src = weatherIcon(data.weather[0].icon);
};

const makeAPICall = (url) => {
  fetch(url,
    {
      mode: 'cors',
      cache: 'default',
    })
    .then(response => response.json())
    .then(data => updateWeatherUI(data))
    .catch(err => console.log('error:', err));
};

const inputChoice = 'Lagos';
const url = weatherAPIUrl(inputChoice);
makeAPICall(url);
