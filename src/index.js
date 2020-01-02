/* eslint-disable no-undef */
import './css/style.css';
import importAll from './data';

const weatherAPIUrl = (location) => {
  const publicAPIKey = '3aab69399bf03eca438758bf6e33d18e';
  const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${publicAPIKey}`;
  return weatherAPI;
};

const weatherIcon = icon => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const calculatedDateTime = (unixTime, timezone) =>{
  const d = new Date((unixTime + timezone) * 1000);
  return d.toGMTString();
};

const weatherBackgroundCover = (data) => {
  const images = importAll(
    require.context('../src/images/weather/', false, /\.(png|jpg|jpeg)$/),
  );
  return images[`${data.main}`.toLowerCase()];
};

const updateWeatherUI = (data) => {
  document.getElementById('weather-icon').src = weatherIcon(data.weather[0].icon);
  document.getElementById('weather-icon-2').src = weatherIcon(data.weather[0].icon);
  document.getElementById('weather-location').innerHTML = `${data.name}`.toUpperCase();
  document.getElementById('weather-temp').innerHTML = `${data.main.temp} &#8451;`;
  document.getElementById('weather-date-time').innerHTML = calculatedDateTime(data.dt, data.timezone);
  document.getElementById('weather-main').textContent = `${data.weather[0].main}`.toUpperCase();
  document.getElementById('weather-description').textContent = `${data.weather[0].description}`.toUpperCase();
  document.getElementById('weather-wind').innerHTML = `Wind: ${data.wind.speed} m/s, `;
  document.getElementById('weather-humidity').innerHTML = `Humidity: ${data.main.humidity}%, `;
  document.getElementById('sunrise').textContent = `Sunrise:
    ${new Date((data.sys.sunrise + data.timezone) * 1000)
    .toLocaleTimeString().slice(-10, -6)} AM, `;
  document.getElementById('sunset').textContent = `Sunset:
    ${new Date((data.sys.sunset + data.timezone) * 1000)
    .toLocaleTimeString().slice(-10, -6)} PM`;

  document.getElementById('search-form').reset();
};

const makeAPICall = (url) => {
  fetch(url,
    {
      mode: 'cors',
      cache: 'default',
    })
    .then(response => response.json())
    .then(data => updateWeatherUI(data))
    .catch(err => `error: ${err}`);
};


document.getElementById('btn-search')
  .addEventListener('click', () => {
    const inputChoice = document.getElementById('search-city-input').value;
    const url = weatherAPIUrl(inputChoice);
    makeAPICall(url);
  });


const defaultLocation = 'London';
const url = weatherAPIUrl(defaultLocation);
makeAPICall(url);
