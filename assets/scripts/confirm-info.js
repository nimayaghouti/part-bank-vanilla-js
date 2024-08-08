const errorSanckbar = document.querySelector('.snackbar_error');
const nextButton = document.querySelector('.button_primary');
const previousButton = document.querySelector('.button_secondary');

const displaySnackbar = () => {
  errorSanckbar.style.opacity = '1';
  errorSanckbar.style.right = '3rem';

  setTimeout(() => {
    errorSanckbar.style.opacity = '0';
    errorSanckbar.style.right = 'calc(var(--snackbar-width) * -1)';
  }, 5000);
};

const handleNextButtonClick = () => {
  const TEMP_IS_ACCOUNT_CREATED = true;

  TEMP_IS_ACCOUNT_CREATED
    ? displaySnackbar()
    : (window.location = '../../dashboard.html');
};

nextButton.addEventListener('click', (event) => {
  event.preventDefault();
  handleNextButtonClick();
});

previousButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location = 'id-card.html';
});
