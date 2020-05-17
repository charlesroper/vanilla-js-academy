// The id of the textarea to count (the target) is stored as a selector in
// the data-count-for attribute. Have a look at the HTML.
var counter = document.querySelector('[data-count-for]');
var targetId = counter.getAttribute('data-count-for');
var target = document.querySelector(targetId);

function updateCharacterCount() {
  if (!target.type === 'textarea') return;

  var charCount = target.value.length;
  counter.textContent = charCount;
}

window.addEventListener('input', updateCharacterCount, false);
window.addEventListener('DOMContentLoaded', updateCharacterCount, false);
