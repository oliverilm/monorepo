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
}

export default new LocalStorage()