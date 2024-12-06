import { create } from "zustand";

export const useUserStore = create<{
    isAuthenticated: boolean,
    setIsAuthenticated: (bool: boolean) => void
    user: unknown;
    setUser: (user: unknown) => void
}>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (bool: boolean) => set({ isAuthenticated: bool}), 
    user: null,
    setUser: (user: unknown) => set({ user }),
}))