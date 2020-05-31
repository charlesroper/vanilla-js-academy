function getHeadlines() {
  const CONFIG = {
    endpoint: "https://nyt-topstories-proxy.glitch.me/topstories/",
    defaultSection: "home"
  };

  const topStories = CONFIG.endpoint + CONFIG.defaultSection;
  const app = document.getElementById("app");
  app.innerHTML = `<p>Loading <span>...</span></p>`;

  fetch(topStories)
    .then(handleResponse)
    .then(renderHtml);

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }

  function renderHtml(json) {
    app.innerHTML = json.results.map(headlines).join("");

    function headlines(result) {
      const date = new Date(Date.parse(result.updated_date));
      return /* html */ `
        <article>
          <h2><a href="${result.url}">${result.title}</a></h2>
          <time datetime=${date.toISOString()}">
            ${date.toLocaleString()}
          </time>
        </article>`;
    }
  }
}

function loaderrr() {
  const dots = document.querySelector("#app >p > span");
  const itervalId = setInterval(dotter, 100);
  function dotter() {
    if (dots) {
      if (dots.innerText.length === 10) dots.innerText = "";
      dots.innerText += ".";
    } else {
      clearInterval(itervalId);
    }
  }
}

window.addEventListener("DOMContentLoaded", getHeadlines, false);
window.addEventListener("DOMContentLoaded", loaderrr, false);
