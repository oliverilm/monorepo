import axios, { AxiosError } from "axios"
import localStorage, { LocalStorageKey } from "../services/local-storage"
import { notifications } from "@mantine/notifications"

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


function tryParseKnownErrors(error: AxiosError<{ statusCode: number, error: string, message: string }>) {
    if (error.response?.data?.message) {
        notifications.show({
            message: error.response?.data?.message
        })
    }
}
client.interceptors.response.use((value) => value, tryParseKnownErrors)