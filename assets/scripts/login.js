const phoneInput = document.querySelector('#phone-input');
const passwordInput = document.querySelector('#password-input');
const phoneInputMessage = document.querySelector('#phone-input ~ .form__validation-message');
const passwordInputMessage = document.querySelector('#password-input ~ .form__validation-message');
const togglePasswordButton = document.querySelector('.form__toggle-password');
const submitButton = document.querySelector('.form__submit');
const submitText = document.querySelector('.submit__text');
const submitSpinner = document.querySelector('.submit__spinner');


const convertNumberToPersian = (number) => {
    const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const convertedValue = number.toString().replace(/\d/g, index => PERSIAN_DIGITS[index]);
    phoneInput.value = convertedValue;
};
const setSubmitButtonState = () => {
    const isInputValid = passwordInput.checkValidity() && phoneInput.checkValidity();
    isInputValid ? submitButton.disabled = false : submitButton.disabled = true;
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
    convertNumberToPersian(event.target.value);
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

let localUser;

const handleSubmitClick = (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    submitText.classList.add('submit__text_loading');
    submitSpinner.classList.add('submit__spinner_loading');

    // const phoneInputValue = phoneInput.value;
    const phoneInputValue = 1234567890;
    const passwordInputValue = passwordInput.value;
    const userData = {
        phone: phoneInputValue,
        password: passwordInputValue
    };
    localUser = new User(userData, new CustomLocalStorage());
    localUser.save();

    setTimeout(() => {
        submitButton.disabled = false;
        submitText.classList.remove('submit__text_loading');
        submitSpinner.classList.remove('submit__spinner_loading');

        window.location.href = 'dashboard-inactive.html';
    }, 3000);
};
submitButton.addEventListener('click', handleSubmitClick);