const phoneDisplayElement = document.querySelector(".user-info__phone");
const storedUser = Storage.getItem('user');

const formattedPhone = storedUser?.phone;
phoneDisplayElement.textContent = formattedPhone;