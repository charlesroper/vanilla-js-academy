// Grab the password input element
var pwInput = document.querySelector('#password');

// Grab the show password checkbox
var pwToggle = document.querySelector('#show-password');

function togglePasswordVisibility(event) {
  console.log(event);
  console.log(event.target);

  // Set pwType based on whether the checkbox is ticked or not
  var pwType = event.target.checked ? 'text' : 'password';

  // Toggle the password type
  pwInput.type = pwType;

  // Better to use setAttribute?
  // pwInput.setAttribute("type", pwType);
}

// Listen for click events on the password checkbox
// Could also use a change event, but not sure if there is any benefit?
pwToggle.addEventListener('click', togglePasswordVisibility, false);
