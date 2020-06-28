(function() {
  const CONFIG = {
    ipapi: 'https://ipapi.co/json/',
    weatherbit: 'https://api.weatherbit.io/v2.0/current',
    weatherbitIcons: 'https://www.weatherbit.io/static/img/icons/',
    key: 'cba47487888d4b808b4e0d062f0705f7',
    dateTimeOptions: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  };

  const latlong = getLatLong();
  const weatherData = getWeatherData(latlong);
  renderWeather(weatherData).catch(handleError);

  async function getLatLong() {
    const response = await fetch(CONFIG.ipapi);
    if (!response.ok) return Promise.reject(response);
    const json = await response.json();
    return [json.latitude, json.longitude];
  }

  async function getWeatherData(latlong) {
    const [lat, lon] = await latlong;
    const response = await fetch(
      `${CONFIG.weatherbit}?lat=${lat}&lon=${lon}&key=${CONFIG.key}`
    );
    if (!response.ok) return Promise.reject(response);
    const json = await response.json();
    return json.data[0];
  }

  async function renderWeather(weatherData) {
    const data = await weatherData;
    const app = document.getElementById('app');
    app.innerHTML = /*html*/ `
      <h2 class="weatherTitle">
        Weather for ${s(data.city_name)}, ${s(data.country_code)}
      </h2>
      <time>
        ${new Intl.DateTimeFormat('default', CONFIG.dateTimeOptions).format(
          Date.parse(data.ob_time)
        )}
      </time>
      <div class="weatherCard">
        <img 
          src="${CONFIG.weatherbitIcons}${s(data.weather.icon)}.png"
          width="50" height="50"
        />
        <p class="weatherCard temp">${s(data.temp)} <sup>&deg;C</sup></p>
      </div>
      <p>${s(data.weather.description)}</p>
    `;
  }

  function handleError(error) {
    console.error(error);
    document.getElementById('app').innerHTML =
      'There was an error. Try the <a href="https://www.metoffice.gov.uk/">MetOffice</a> instead.';
  }

  // Sanitise helper
  function s(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }
})();
