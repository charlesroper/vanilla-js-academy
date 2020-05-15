function togglePasswords(event) {
  // We only want to get into the machinery of this function if we're actually
  // clicking on a checkbox, so return if the user didn't click a checkbox
  if (event.target.type !== 'checkbox') return;

  // Get the type of password field we are toggling from the data-checkbox-for
  // data attribute.
  var checkboxFor = event.target.getAttribute('data-checkbox-for');

  // Get a NodeList of the password fields we are targeting. Construct the
  // query using the checkboxFor variable. Using template literal just for fun.
  var passwordsToToggle = document.querySelectorAll(
    `[data-password='${checkboxFor}']`
  );

  // Iterate over each password to toggle and call the toggle function
  passwordsToToggle.forEach(toggle);

  // The toggle function takes the password argument and flips it based on the
  // target checkbox's current state
  function toggle(password) {
    password.type = event.target.checked ? 'text' : 'password';
  }
}

window.addEventListener('click', togglePasswords, false);