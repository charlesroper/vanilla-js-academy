// Grab the password input element
var passwords = Array.from(document.querySelectorAll('[type=password]'));

// Grab the show password checkbox
var checkbox = document.querySelector('#show-passwords');

function togglePasswordVisibility(event) {
  var toggle = event.target.checked ? 'text' : 'password';

  passwords.forEach(function(password) {
    password.type = toggle;
  });
}

// Listen for click events on the password checkbox
checkbox.addEventListener('click', togglePasswordVisibility, false);
