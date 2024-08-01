const userTel = document.querySelector(".user-info__tel");

const user = JSON.parse(User.getUserFromLocalStorage());

if (user) {
    userTel.textContent = "۰" + parseInt(user.tel).toLocaleString("fa-IR").replace(/٬/g, "");
} else {
    userTel.textContent = "- - - - - -";
}