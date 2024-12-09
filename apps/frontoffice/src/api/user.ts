import { AxiosResponse } from "axios";
import { client } from "./instance";

export interface UserProfile {
    id: string;
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