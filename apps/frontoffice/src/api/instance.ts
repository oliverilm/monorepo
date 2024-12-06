import axios from "axios"
import localStorage, { LocalStorageKey } from "../services/local-storage"

export const client = axios.create({
  baseURL: "http://localhost:3000",
})

// @ts-expect-error -- will investigate later
client.interceptors.request.use((config) => {
    const token = localStorage.get(LocalStorageKey.Token)

    if (!token) return config

    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`
        }
    }
})