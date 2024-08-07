const phoneDisplayElement = document.querySelector('.user-info__phone');
const createAccountButton = document.querySelector('.dialog__button');

// const storedUser = Storage.getItem('user');
// phoneDisplayElement.textContent = storedUser?.phone;

createAccountButton.addEventListener('click', () => {
  window.location = 'pages/create-account/personal-info.html';
});
