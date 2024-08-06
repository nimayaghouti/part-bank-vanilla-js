const phoneDisplayElement = document.querySelector(".user-info__phone");
const storedUser = Storage.getItem('user');

phoneDisplayElement.textContent = storedUser?.phone;