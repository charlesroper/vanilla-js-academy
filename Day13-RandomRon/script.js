function getRonQuote() {
  const RON_QUOTE = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
  const bq = document.querySelector("blockquote");
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.style.display = "none";
  bq.textContent = "Ron is thinking...";

  fetch(RON_QUOTE)
    .then(handleResponse)
    .then(updateQuote)
    .catch(quoteMalfunction);

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }

  function updateQuote(data) {
    bq.style.display = "block";
    bq.innerText = data;
  }

  function quoteMalfunction() {
    bq.style.display = "none";
    errorMessage.style.display = "block";
  }
}

const button = document.querySelector("button");
button.addEventListener("click", getRonQuote, false);
window.addEventListener("DOMContentLoaded", getRonQuote, false);
