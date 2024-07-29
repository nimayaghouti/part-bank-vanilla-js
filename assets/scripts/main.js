// show / hide password //////////////////////////////////////////
const passInput = document.querySelector('#pass');
const eyeButton = document.querySelector('.form__eye');
const submitButton = document.querySelector('.form__submit');

eyeButton.addEventListener("click", () => {
    passInput.focus();
    if (passInput.type === "password") {
        passInput.type = "text";
        eyeButton.style.backgroundImage =
            "url('/assets/svg/icons/outline/eye.svg')";
    } else {
        passInput.type = "password";
        eyeButton.style.backgroundImage =
            "url('/assets/svg/icons/outline/eye-closed.svg')";
    }
});

// loader on submit /////////////////////////////////////////////