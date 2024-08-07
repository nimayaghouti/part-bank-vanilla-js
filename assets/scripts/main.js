class User {
    #data;
    #storage;

    constructor(data, storage) {
        this.#data = data;
        this.#storage = storage;
    }

    save() {
        this.#storage.setItem('userData', this.#data);
    }

    load() {
        const storedData = this.#storage.getItem('userData');
        if (storedData) {
            this.#data = storedData;
        }
        return this.#data;
    }

    clear() {
        this.#storage.removeItem('userData');
        this.#data = null;
    }

    clearStorage() {
        this.#storage.clearStorage();
    }
}

//////////////////////////////////////////////////////////////////

class BaseHashing {
    hash(value) {
        throw new Error("Method 'hash()' must be implemented.");
    }

    unhash(value) {
        throw new Error("Method 'unhash()' must be implemented.");
    }
}

class CustomBase64Hashing extends BaseHashing {
    hash(value) {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        return btoa(stringValue);
    }

    unhash(value) {
        try {
            const decoded = atob(value);
            // Check if the decoded value is JSON
            if (decoded.startsWith('{') || decoded.startsWith('[')) {
                return JSON.parse(decoded);
            } else {
                return decoded;
            }
        } catch (error) {
            console.error("Error in unhashing value:", error);
            return null;
        }
    }
}

//////////////////////////////////////////////////////////////////

class BaseStorage {
    setItem(key, value) {
        throw new Error("Method 'setItem()' must be implemented.");
    }

    getItem(key) {
        throw new Error("Method 'getItem()' must be implemented.");
    }

    removeItem(key) {
        throw new Error("Method 'removeItem()' must be implemented.");
    }

    clearStorage() {
        throw new Error("Method 'clearStorage()' must be implemented.");
    }
}

class CustomSessionStorage extends BaseStorage {
    constructor() {
        super();
        this.hashing = new CustomBase64Hashing();
    }

    setItem(key, value) {
        const hashedValue = this.hashing.hash(value);
        sessionStorage.setItem(key, hashedValue);
    }

    getItem(key) {
        const value = sessionStorage.getItem(key);
        return value ? this.hashing.unhash(value) : null;
    }

    removeItem(key) {
        sessionStorage.removeItem(key);
    }

    clearStorage() {
        sessionStorage.clear();
    }
}

class CustomLocalStorage extends BaseStorage {
    constructor() {
        super();
        this.hashing = new CustomBase64Hashing();
    }

    setItem(key, value) {
        const hashedValue = this.hashing.hash(value);
        localStorage.setItem(key, hashedValue);
    }

    getItem(key) {
        const value = localStorage.getItem(key);
        return value ? this.hashing.unhash(value) : null;
    }

    removeItem(key) {
        localStorage.removeItem(key);
    }

    clearStorage() {
        localStorage.clear();
    }
}
