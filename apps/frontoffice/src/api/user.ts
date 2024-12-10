import { AxiosResponse } from "axios";
import { client } from "./instance";

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    nationalId: string | null;
    nationalIdType: string | null;
    dateOfBirth: Date | null;
    userId: string | null;
    clubId: string | null;
    belt: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export function getUserProfile(): Promise<AxiosResponse<UserProfile>> {
    return client.get("/user/profile")
}

export interface UpdateUserProfile {
    firstName: string;
    lastName: string;
    nationalId: string;
    nationalIdType: string;
    dateOfBirth: Date;
}

export function updateUserProfile(data: UpdateUserProfile): Promise<AxiosResponse<UserProfile>> {
    return client.patch("/user/profile", data)
}