// See this regex: https://regex101.com/r/PM7lwE/1/
const REGEX_MATCH_WORDS = /\w+(['-]\w+)*/g;

var textarea = document.querySelector('#text');
var count = document.querySelector('#counts');

function updateCounts(event) {
  if (event.target.type !== 'textarea' && event.type !== 'pageshow') return;
  var charCount = getCharCount(textarea);
  var wordCount = getWordCount(textarea);
  count.innerHTML = `
    You have written <b>${wordCount}</b> 
    ${wordOrWords(wordCount)}
    and <b>${charCount}</b> characters`;
}

function getCharCount(text) {
  return text.value.length;
}

function getWordCount(text) {
  return splitStringToWords(text).length;
}

function splitStringToWords(text) {
  return text.value.match(REGEX_MATCH_WORDS) || [];
}

function wordOrWords(wordCount) {
  return wordCount === 1 ? 'word' : 'words';
}

// REGISTER EVENT LISTENERS ----------------------------------------------------
function registerEventListeners(func) {
  events.forEach((event) => window.addEventListener(event, func, false));
}

var events = ['input', 'pageshow'];
registerEventListeners(updateCounts);
