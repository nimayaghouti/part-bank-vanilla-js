const userPhone = document.querySelector(".user-info__tel");

const user = JSON.parse(User.getUserFromLocalStorage());

if (user) {
    userPhone.textContent = "۰" + parseInt(user.phone).toLocaleString("fa-IR").replace(/٬/g, "");
} else {
    userPhone.textContent = "- - - - - -";
}