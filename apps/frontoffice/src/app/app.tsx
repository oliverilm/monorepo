import styled from 'styled-components';
import NxWelcome from './nx-welcome';

import { Outlet } from 'react-router-dom';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <NxWelcome title="frontoffice" />

      <Outlet />
    </StyledApp>
  );
}

export default App;
