import { client } from "./instance";

export interface AuthenticationPayload {
    email: string;
    password: string;
}
export function login(payload: AuthenticationPayload ) {
    return client.post("/public/auth/login", payload)
}

export function register(payload: AuthenticationPayload ) {
    return client.post("/public/auth/register", payload)
}