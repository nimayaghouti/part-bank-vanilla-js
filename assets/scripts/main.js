const bitHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
    }
    hash = ((hash << 5) - hash);
    hash = hash & hash;
    return hash;
}

class Storage {
    static setItem(key, data) {
        const stringifiedData = JSON.stringify(data);
        localStorage.setItem(key, stringifiedData);
    }

    static getItem(key) {
        const stringifiedData = localStorage.getItem(key);
        if (stringifiedData === null) return null;
        const parsedData = JSON.parse(stringifiedData);
        return parsedData;
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

class User {
    // id;
    phone;
    password;
    // hasAccount;

    constructor(phone, password) {
        this.phone = phone;
        this.password = bitHash(password);
    }
}