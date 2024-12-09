
import { Outlet } from 'react-router-dom';
import { Box } from '@mantine/core';
import { Header } from './components/header/Header';
import { useAppAuthState } from './hooks/useAppAuthState';


export function App() {
  useAppAuthState()
  
  return (
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
      <Header />
      <Outlet />
    </Box>
  );
}

export default App;
