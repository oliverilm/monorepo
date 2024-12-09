
import { Outlet } from 'react-router-dom';
import { AppShell, Box } from '@mantine/core';
import { Header } from './components/header/Header';
import { Notifications } from "@mantine/notifications"
import { useAppAuthState } from './hooks/useAppAuthState';


export function App() {
  useAppAuthState()
  
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
      <Box 
      w={"100%"}  
      px={{
          base: "md",
          sm: "xs",
          md: "md",
          lg: "md",
          xl: "md"
        }}
    >
      <Notifications />
      <Outlet />
    </Box>
      </AppShell.Main>
    </AppShell>
    
  );
}

export default App;
