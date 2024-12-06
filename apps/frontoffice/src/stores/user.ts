import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: null,
    setUser: (user: unknown) => set({ user }),
}))