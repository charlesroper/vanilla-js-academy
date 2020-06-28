(function() {
  const latlong = getLatLong();
  const weatherData = getWeatherData(latlong);
  renderWeather(weatherData).catch(error => {
    console.error(error);
    document.getElementById('app').innerHTML =
      'There was an error. Try the <a href="https://www.metoffice.gov.uk/">MetOffice</a> instead.';
  });

  async function getLatLong() {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const json = await response.json();
      return [json.latitude, json.longitude];
    } else {
      return Promise.reject(response);
    }
  }

  async function getWeatherData(latlong) {
    const [lat, lon] = await latlong;
    const API = {
      endpoint: 'https://api.weatherbit.io/v2.0/current',
      key: 'cba47487888d4b808b4e0d062f0705f7'
    };
    const response = await fetch(
      `${API.endpoint}?lat=${lat}&lon=${lon}&key=${API.key}`
    );

    if (response.ok) {
      const json = await response.json();
      return json.data[0];
    } else {
      return Promise.reject(response);
    }
  }

  async function renderWeather(weatherData) {
    const data = await weatherData;
    const app = document.getElementById('app');
    console.log(data);

    const dateTimeOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    app.innerHTML = /*html*/ `
      <h2 class="weatherTitle">
        Weather for ${data.city_name}, ${data.country_code}
      </h2>
      <time>
        ${new Intl.DateTimeFormat('default', dateTimeOptions).format(
          Date.parse(data.ob_time)
        )}
      </time>
      <div class="weatherCard">
        <img src="https://www.weatherbit.io/static/img/icons/${
          data.weather.icon
        }.png" width="50" height="50" />
        <p class="weatherCard temp">${data.temp} <sup>&deg;C</sup></p>
      </div>
      <p>${data.weather.description}</p>
    `;
  }
})();
