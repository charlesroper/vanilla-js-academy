function getRonQuote() {
  const RON_QUOTE = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
  const bq = document.querySelector("blockquote");

  bq.textContent = "Ron is thinking...";

  fetch(RON_QUOTE)
    .then(handleResponse)
    .then(updateQuote)
    .catch(err => console.error("Something went wrong", err));

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }

  function updateQuote(data) {
    bq.innerText = data;
  }
}

const button = document.querySelector("button");
button.addEventListener("click", getRonQuote, false);
window.addEventListener("DOMContentLoaded", getRonQuote, false);
