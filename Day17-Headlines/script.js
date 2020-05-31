function getHeadlines() {
  const CONFIG = {
    endpoint: "https://nyt-topstories-proxy.glitch.me/topstories/",
    defaultSection: "home"
  };

  const topStories = CONFIG.endpoint + CONFIG.defaultSection;
  const app = document.getElementById("app");
  app.innerHTML = `<p>Loading...</p>`;

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

window.addEventListener("DOMContentLoaded", getHeadlines, false);
