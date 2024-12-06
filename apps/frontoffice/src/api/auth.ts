import { ExecFileSyncOptionsWithBufferEncoding } from "child_process";
import { client } from "./instance";
import { AxiosResponse } from "axios";

export interface AuthenticationPayload {
    email: string;
    password: string;
}

export interface AuthenticationResponse {
    profile: {
        createdAt: string,
        id: string,
        updatedAt: string;
        userId: string;
    },
    token: string
}
export function login(payload: AuthenticationPayload ): Promise<AxiosResponse<AuthenticationResponse>> {
    return client.post("/public/auth/login", payload)
}

export function register(payload: AuthenticationPayload ): Promise<AxiosResponse<AuthenticationResponse>> {
    return client.post("/public/auth/register", payload)
}