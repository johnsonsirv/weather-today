/* eslint-disable no-undef */
import './css/style.css';
import importAll from './data';
import preLoaderGIF from './images/loader.gif';

const temperatureScale = { C: 0.0, F: 0.0 };
const weatherAPIUrl = (location) => {
  const publicAPIKey = '3aab69399bf03eca438758bf6e33d18e';
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${publicAPIKey}`;
  return weatherAPI;
};

const weatherIcon = icon => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const calculatedDateTime = (unixTime, timezone) => {
  const d = new Date((unixTime + timezone) * 1000);
  return d.toGMTString();
};

const weatherBackgroundCover = (bg) => {
  const images = importAll(
    require.context('../src/images/weather/', false, /\.(png|jpg|jpeg)$/),
  );
  const key = `${bg.toLowerCase()}.jpg`;
  return (images[key] !== undefined) ? images[key].default : images['default.jpg'].default;
};
const togglePreLoader = (active = false) => {
  if (active) {
    document.getElementById('pre-loader')
      .setAttribute('class', 'loader no-display');
    document.getElementById('pre-loader-gif').src = '';
  } else {
    document.getElementById('pre-loader-gif').src = preLoaderGIF;
    document.getElementById('pre-loader')
      .removeAttribute('class');
  }
};

const weatherTempInFahrenheit = celcius => ((celcius * (9 / 5)) + 32).toFixed(2);

const updateTempScales = (celcius) => {
  temperatureScale.C = `${celcius} &#8451;`;
  temperatureScale.F = `${weatherTempInFahrenheit(celcius)} &#8457;`;
};

const updateWeatherUI = (data) => {
  document.getElementById('main').style.backgroundImage = `url(${weatherBackgroundCover(data.weather[0].main)})`;
  document.getElementById('main').style.backgroundPosition = 'center';
  document.getElementById('weather-icon').src = weatherIcon(data.weather[0].icon);
  document.getElementById('weather-icon-2').src = weatherIcon(data.weather[0].icon);
  document.getElementById('weather-location').innerHTML = `${data.name}`.toUpperCase();
  document.getElementById('weather-temp').innerHTML = `${data.main.temp} &#8451;`;
  document.getElementById('toggle-temp').innerHTML = 'F';
  updateTempScales(data.main.temp);
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
  togglePreLoader(true);
};

const makeAPICall = (url) => {
  togglePreLoader(false);
  fetch(url,
    {
      mode: 'cors',
      cache: 'default',
    })
    .then(response => response.json())
    .then(data => updateWeatherUI(data))
    // eslint-disable-next-line no-alert
    .catch(() => alert('error: something went wrong. try again'));
};

const loadDefaultWeather = () => {
  const defaultLocation = 'Lagos';
  const url = weatherAPIUrl(defaultLocation);
  makeAPICall(url);
};

const toggleTempScale = (handle) => {
  const trigger = handle;
  document.getElementById('weather-temp').innerHTML = temperatureScale[trigger.textContent];
  trigger.textContent = (trigger.textContent === 'F') ? 'C' : 'F';
};

document.getElementById('btn-search')
  .addEventListener('click', () => {
    const inputChoice = document.getElementById('search-city-input').value;
    const url = weatherAPIUrl(inputChoice);
    makeAPICall(url);
  });

document.getElementById('toggle-temp')
  .addEventListener('click', () => {
    toggleTempScale(document.getElementById('toggle-temp'));
  });

loadDefaultWeather();
