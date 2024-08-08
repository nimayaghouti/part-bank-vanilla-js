import instance, { setToken } from '../services/apiService.js';
import { setUserDataToLocalStorage } from './main.js';
import { convertNumberToPersian, convertNumberToEnglish } from './utils.js';

const phoneInput = document.querySelector('#phone-input');
const passwordInput = document.querySelector('#password-input');
const phoneInputMessage = document.querySelector(
  '#phone-input ~ .form__validation-message'
);
const passwordInputMessage = document.querySelector(
  '#password-input ~ .form__validation-message'
);
const togglePasswordButton = document.querySelector('.form__toggle-password');
const submitButton = document.querySelector('.form__submit');
const submitText = document.querySelector('.submit__text');
const submitSpinner = document.querySelector('.submit__spinner');

const setSubmitButtonState = () => {
  const isInputValid =
    passwordInput.checkValidity() && phoneInput.checkValidity();
  isInputValid
    ? (submitButton.disabled = false)
    : (submitButton.disabled = true);
};

const setMessageElementState = (inputElement, messageElement) => {
  if (inputElement.checkValidity()) {
    messageElement.style.opacity = '0';
  } else {
    messageElement.style.opacity = '1';
    messageElement.style.color = 'var(--fail-500)';
  }
};

phoneInput.addEventListener('input', (event) => {
  phoneInput.value = convertNumberToPersian(event.target.value);
  setMessageElementState(phoneInput, phoneInputMessage);
  setSubmitButtonState();
});

passwordInput.addEventListener('input', () => {
  setMessageElementState(passwordInput, passwordInputMessage);
  setSubmitButtonState();
});

const togglePasswordType = () => {
  passwordInput.focus();
  const iconOnShow = "url('./assets/svg/icons/login/eye.svg')";
  const iconOnHide = "url('./assets/svg/icons/login/eye-closed.svg')";

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePasswordButton.style.backgroundImage = iconOnShow;
  } else {
    passwordInput.type = 'password';
    togglePasswordButton.style.backgroundImage = iconOnHide;
  }
};
togglePasswordButton.addEventListener('click', togglePasswordType);

const setLoadingState = (isLoading) => {
  submitButton.disabled = isLoading;
  submitText.classList.toggle('submit__text_loading', isLoading);
  submitSpinner.classList.toggle('submit__spinner_loading', isLoading);
};

const handleLogin = async (phoneNumber, password) => {
  try {
    // real endpoint
    const response = await instance.post('/auth/login', {
      phoneNumber,
      password,
    });

    // endpoint for test with json server mock data
    // const response = await instance.post('/auth', {
    //   phoneNumber,
    //   password,
    // });

    console.log('Login successful', response.data.data);
    return {
      ...response.data.data,
      phoneNumber: phoneNumber,
    };
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();

  setLoadingState(true);

  try {
    const phoneInputValue = convertNumberToEnglish(phoneInput.value);
    const passwordInputValue = passwordInput.value;

    const data = await handleLogin(phoneInputValue, passwordInputValue);

    setUserDataToLocalStorage(data);

    window.location = '../../dashboard.html';
  } catch (error) {
    console.error('Error during login:', error);
    alert('نام کاربری یا رمز عبور اشتباه است.');
  } finally {
    setLoadingState(false);
  }
};
submitButton.addEventListener('click', handleSubmit);
