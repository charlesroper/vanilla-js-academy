// Grab the password input element
var password = document.querySelector('#password');

// Grab the show password checkbox
var checkbox = document.querySelector('#show-password');

function togglePasswordVisibility(event) {
  // Set toggle var based on whether the checkbox is ticked or not
  var toggle = event.target.checked ? 'text' : 'password';

  // Toggle the password type
  password.type = toggle;
}

// Listen for click events on the password checkbox
checkbox.addEventListener('click', togglePasswordVisibility, false);
