class User {
    phone;
    password;

    constructor(phone, password) {
        this.phone = phone;
        this.password = password;
    }

    static setUserToLocalStorage(user) {
        localStorage.setItem("user", JSON.stringify({
            phone: user.phone,
            password: user.password,
        }));
    }

    static getUserFromLocalStorage() {
        return localStorage.getItem("user");
    }
}