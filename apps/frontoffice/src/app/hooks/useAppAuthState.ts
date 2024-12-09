import { useLayoutEffect } from "react";
import { useUserStore } from "../../stores/user";
import localStorage, { LocalStorageKey } from "../../services/local-storage";

export function useAppAuthState() {
    const store = useUserStore()

    useLayoutEffect(() => {
      const tokenFromLocalStorage = localStorage.get(LocalStorageKey.Token)
      if (tokenFromLocalStorage) {
        store.setIsAuthenticated(true)
        return;
      }
  
      store.setIsAuthenticated(false)
      return;
    }, [])
}