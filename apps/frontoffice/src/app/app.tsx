import styled from 'styled-components';

import { Outlet } from 'react-router-dom';
import { useUserStore } from '../stores/user';
import { useEffect, useLayoutEffect } from 'react';
import localStorage, { LocalStorageKey } from '../services/local-storage';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const store = useUserStore()

  useLayoutEffect(() => {
    const tokenFromLocalStorage = localStorage.get(LocalStorageKey.Token)

    if (tokenFromLocalStorage) {
      // validate tokens validity
      store.setIsAuthenticated(true)
      return;
    }

    store.setIsAuthenticated(false)
    return;
  }, [])
  
  return (
    <StyledApp>
      {/* <NxWelcome title="frontoffice" /> */}
      {store.isAuthenticated ? "AUTH" : ""}
      <Outlet />
    </StyledApp>
  );
}

export default App;
