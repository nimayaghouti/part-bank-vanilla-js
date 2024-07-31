class User {
    tel;
    password;

    constructor(tel, password) {
        this.tel = tel;
        this.password = password;
    }

    static setUserToLocalStorage(user) {
        localStorage.setItem("user", JSON.stringify({
            tel: user.tel,
            password: user.password,
        }));
    }

    static getUserFromLocalStorage() {
        return localStorage.getItem("user");
    }
}