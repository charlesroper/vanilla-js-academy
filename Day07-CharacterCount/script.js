// The id of the textarea to count (the target) is stored as a selector in
// the data-count-for attribute. Have a look at the HTML. This means I don't
// have to hard-code the #text selector into my JS - I declare it in HTML, which
// I think is more in keeping with the Web's grain[1].

// This gets the element to store the counter
var counter = document.querySelector('[data-count-for]');

// The counter element has an attribute that contains a selector for the target
// textarea
var targetId = counter.getAttribute('data-count-for');

// This gets the textarea element using the targetId selector
var target = document.querySelector(targetId);

function updateCharacterCount() {
  if (!target.type === 'textarea') return;

  var charCount = target.value.length;
  counter.textContent = charCount;
}

window.addEventListener('input', updateCharacterCount, false);
window.addEventListener('pageshow', updateCharacterCount, false);

// [1] The web's grain: https://frankchimero.com/blog/2015/the-webs-grain/
