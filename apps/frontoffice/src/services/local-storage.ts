export enum LocalStorageKey {
    Token = 'token'
}

class LocalStorage {

    get(key: LocalStorageKey) {
        return localStorage.getItem(key)
    }

    set(key: LocalStorageKey, value: string) {
        localStorage.setItem(key, value)
    }

    remove(key: LocalStorageKey) {
        localStorage.removeItem(key)
    }
}

export default new LocalStorage()