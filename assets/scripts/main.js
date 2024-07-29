const submitButton = document.querySelector('.submit');
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
