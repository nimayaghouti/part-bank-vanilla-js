// show / hide password //////////////////////////////////////////
const passInput = document.querySelector('#pass');
const eyeButton = document.querySelector('.form__eye');
const submitButton = document.querySelector('.form__submit');

eyeButton.addEventListener('click', () => {
  passInput.focus();
  if (passInput.type === 'password') {
    passInput.type = 'text';
    eyeButton.style.backgroundImage =
      "url('/assets/svg/icons/outline/eye.svg')";
  } else {
    passInput.type = 'password';
    eyeButton.style.backgroundImage =
      "url('/assets/svg/icons/outline/eye-closed.svg')";
  }
});

// loader on submit /////////////////////////////////////////////
const submitText = document.querySelector('.submit__text');
const submitSpinner = document.querySelector('.submit__spinner');

submitButton.addEventListener('click', event => {
  event.preventDefault();

  submitButton.disabled = true;
  submitText.classList.add('submit__text_loading');
  submitSpinner.classList.add('submit__spinner_loading');

  setTimeout(() => {
    submitBtn.disabled = false;
    submitText.classList.remove('submit__text_loading');
    submitSpinner.classList.remove('submit__spinner_loading');

    window.location.href = 'dashboard.html';
  }, 3000);
});
