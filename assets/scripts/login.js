// getting elements //////////////////////////////////////////////
const tellInput = document.querySelector('#phone');
const passInput = document.querySelector('#pass');
const eyeButton = document.querySelector('.form__toggle-password');
const submitButton = document.querySelector('.form__submit');

const submitText = document.querySelector('.submit__text');
const submitSpinner = document.querySelector('.submit__spinner');

// show / hide password //////////////////////////////////////////
eyeButton.addEventListener('click', () => {
  passInput.focus();
  if (passInput.type === 'password') {
    passInput.type = 'text';
    eyeButton.style.backgroundImage =
      "url('./assets/svg/icons/outline/eye.svg')";
  } else {
    passInput.type = 'password';
    eyeButton.style.backgroundImage =
      "url('./assets/svg/icons/outline/eye-closed.svg')";
  }
});

// check input validity ///////////////////////////////////////
function setSubmitPermission() {
  const isValid = passInput.checkValidity() && tellInput.checkValidity();
  if (isValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

passInput.addEventListener('keyup', () => setSubmitPermission());
tellInput.addEventListener('keyup', () => setSubmitPermission());

// loader on submit /////////////////////////////////////////////
submitButton.addEventListener('click', (event) => {
  event.preventDefault();

  submitButton.disabled = true;
  submitText.classList.add('submit__text_loading');
  submitSpinner.classList.add('submit__spinner_loading');

  // save user to localStorage
  const tellInputValue = tellInput.value;
  const passInputValue = passInput.value;
  const user = new User(tellInputValue, passInputValue);
  User.setUserToLocalStorage(user);

  setTimeout(() => {
    submitButton.disabled = false;
    submitText.classList.remove('submit__text_loading');
    submitSpinner.classList.remove('submit__spinner_loading');

    window.location.href = 'dashboard.html';
  }, 3000);
});
