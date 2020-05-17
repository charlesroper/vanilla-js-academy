// Get the element that will store the count and assign it to counter variable.
var counter = document.querySelector('[data-count-for]');

// The counter element contains a selector in the data-watch-for attribute
// Use this selector to target the textarea to count.
var watchThis = counter.getAttribute('data-count-for');

function updateCharacterCount(event) {
  if (!event.target.matches(watchThis)) return;
  var charCount = event.target.value.length;
  counter.textContent = charCount;
}

window.addEventListener('input', updateCharacterCount, false);
// window.addEventListener('DOMContentLoaded', updateCharacterCount, false);
