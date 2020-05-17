function updateCharacterCount(event) {
  if (!event.type == 'input' || !event.type === 'DOMContentLoaded') return;
  var counter = document.querySelector('[data-count-for]');
  var targetId = counter.getAttribute('data-count-for');
  var target = document.querySelector(targetId);
  var charCount = target.value.length;
  counter.textContent = charCount;
}

window.addEventListener('input', updateCharacterCount, false);
window.addEventListener('DOMContentLoaded', updateCharacterCount, false);
