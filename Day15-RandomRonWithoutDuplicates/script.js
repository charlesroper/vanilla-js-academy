const quotes = [];

function getRonQuote() {
  const RON_QUOTE = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
  const RON_THINKING_QUOTE = "Ron is thinking...";
  const blockquote = document.querySelector("blockquote");
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.style.display = "none";
  blockquote.textContent = RON_THINKING_QUOTE;

  fetch(RON_QUOTE)
    .then(handleResponse)
    .then(checkForDuplicateQuote)
    .then(updateQuote)
    .catch(quoteMalfunction);

  function handleResponse(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }

  function checkForDuplicateQuote(data) {
    const DUPLICATE_CHECK_LIMIT = 50;
    let quote = data[0];
    if (quotes.length === DUPLICATE_CHECK_LIMIT) quotes.shift();
    if (quotes.includes(quote)) {
      console.log("DUPLICATE: ", quote);
      quote = RON_THINKING_QUOTE;
      getRonQuote(); // Recursion!
    } else {
      quotes.push(quote);
    }
    return quote;
  }

  function updateQuote(quote) {
    blockquote.style.display = "block";
    blockquote.innerText = quote;
  }

  function quoteMalfunction() {
    blockquote.style.display = "none";
    errorMessage.style.display = "block";
  }
}

const button = document.querySelector("button");
button.addEventListener("click", getRonQuote, false);
window.addEventListener("DOMContentLoaded", getRonQuote, false);
