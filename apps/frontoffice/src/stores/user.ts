import { create } from "zustand";
import { UserProfile } from "../api/user";

export const useUserStore = create<{
    isAuthenticated: boolean,
    setIsAuthenticated: (bool: boolean) => void
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void
}>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (bool: boolean) => set({ isAuthenticated: bool}), 
    user: null,
    setUser: (user: UserProfile | null) => set({ user }),
}))