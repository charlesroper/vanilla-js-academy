function getSections() {
  const CONFIG = {
    endpoint: "https://nyt-topstories-proxy.glitch.me/topstories/",
    defaultSection: "home",
    NumberOfArticles: 3
  };

  const app = document.getElementById("app");

  app.innerHTML = `
    <p class="loading">Loading <span>...</span></p>
  `;

  const SECTIONS = ["world", "politics", "technology", "arts", "science"];

  const NytFetchPromises = SECTIONS.map(section =>
    fetch(CONFIG.endpoint + section)
  );

  Promise.all(NytFetchPromises)
    .then(awaitResponsesArray)
    .then(data => {
      const view = processData(data);
      renderView(view);
    })
    .catch(err => console.error(err));

  function awaitResponsesArray(NytFetchPromises) {
    return Promise.all(
      NytFetchPromises.map(promise => handleResponse(promise))
    );

    function handleResponse(response) {
      return response.ok ? response.json() : Promise.reject(response);
    }
  }

  function processData(data) {
    const loading = document.querySelector(".loading");
    if (loading) app.removeChild(loading);
    const model = buildModel(data);
    const view = buildView(model);
    return view;
  }

  function buildModel(data) {
    console.log("Data", data);
    const model = data.map(obj => {
      const section = {};

      if (!obj.fault) {
        section.sectionTitle = obj.section;
        section.articles = obj.results.slice(0, CONFIG.NumberOfArticles);
        section.articles.forEach(article => {
          article.updated_date = new Date(Date.parse(article.updated_date));
        });
      } else {
        section.sectionTitle = "Error!";
        section.error = obj.fault.faultstring;
      }

      return section;
    });

    return model;
  }

  function buildView(model) {
    let html = ``;

    model.forEach(section => {
      if (section.sectionTitle !== "Error!") {
        html += `<h2>${s(section.sectionTitle)}</h2>`;
        section.articles.forEach(article => {
          html += `
            <h3><a href="${article.url}">${s(article.title)}</a></h3>
            <time datetime="${s(article.updated_date.toISOString())}">
              ${s(article.updated_date.toLocaleString())}
            </time>
            <p>${s(article.abstract)}</p>
          `;
        });
      } else {
        html += `<h2>Error</h2>
        <p>${s(section.error)}</p>`;
        console.error(section.error);
      }
    });

    return html;
  }

  function renderView(view) {
    app.innerHTML += view;
  }

  // Sanitise HTML function
  function s(str) {
    const temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }
}

function loaderrr() {
  const dots = document.querySelector(".loading > span");
  const intervalId = setInterval(dotter, 500);
  function dotter() {
    if (dots) {
      if (dots.innerText.length === 20) dots.innerText = "";
      dots.innerText += ".";
    } else {
      clearInterval(intervalId);
    }
  }
}

window.addEventListener("DOMContentLoaded", getSections, false);
window.addEventListener("DOMContentLoaded", loaderrr, false);
