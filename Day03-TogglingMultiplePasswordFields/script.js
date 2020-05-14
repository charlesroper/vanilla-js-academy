// Grab the password input element as a NodeList
// Don't need to convert to Array because forEach is polyfilled
var passwords = document.querySelectorAll('[type=password]');

// Grab the show password checkbox
var checkbox = document.querySelector('#show-passwords');

function togglePasswordVisibility() {
  passwords.forEach(togglePassword);
}

function togglePassword(password) {
  password.type = checkbox.checked ? 'text' : 'password';
}

// Listen for click events on the password checkbox
checkbox.addEventListener('click', togglePasswordVisibility, false);
