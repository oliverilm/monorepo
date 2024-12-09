import { useLayoutEffect } from "react";
import { useUserStore } from "../../stores/user";
import localStorage, { LocalStorageKey } from "../../services/local-storage";
import { getUserProfile } from "../../api/user";

export function useAppAuthState() {
    const store = useUserStore()

    const performUserValidation = async () => {
      const tokenFromLocalStorage = localStorage.get(LocalStorageKey.Token)
      if (tokenFromLocalStorage) {
        const useProfile = await getUserProfile()
        store.setUser(useProfile.data)
        store.setIsAuthenticated(true)
        return;
      }
  
      store.setIsAuthenticated(false)
      return;
    }

    useLayoutEffect(() => {
      performUserValidation()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}