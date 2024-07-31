const userTel = document.querySelector(".user-info__tel");

const user = JSON.parse(User.getUserFromLocalStorage());

if (user) {
    userTel.textContent = parseInt(user.tel).toLocaleString("fa-IR").replace(/٬/g, "");
} else {
    userTel.textContent = "- - - - - -";
}