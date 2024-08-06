const phoneInput = document.querySelector('#phone');
const passwordInput = document.querySelector('#pass');
const togglePasswordButton = document.querySelector('.form__toggle-password');
const submitButton = document.querySelector('.form__submit');
const submitText = document.querySelector('.submit__text');
const submitSpinner = document.querySelector('.submit__spinner');


const onToggle = () => {
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
togglePasswordButton.addEventListener('click', onToggle);


const setSubmitPermission = () => {
    const isInputValid = passwordInput.checkValidity() && phoneInput.checkValidity();
    isInputValid ? submitButton.disabled = false : submitButton.disabled = true;
};
passwordInput.addEventListener('keyup', setSubmitPermission);
phoneInput.addEventListener('keyup', setSubmitPermission);


const onSubmit = (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    submitText.classList.add('submit__text_loading');
    submitSpinner.classList.add('submit__spinner_loading');

    const phoneInputValue = phoneInput.value;
    const passwordInputValue = passwordInput.value;
    const user = new User(phoneInputValue, passwordInputValue);
    Storage.setItem('user', user);

    setTimeout(() => {
        submitButton.disabled = false;
        submitText.classList.remove('submit__text_loading');
        submitSpinner.classList.remove('submit__spinner_loading');

        window.location.href = 'dashboard.html';
    }, 3000);
};
submitButton.addEventListener('click', onSubmit);