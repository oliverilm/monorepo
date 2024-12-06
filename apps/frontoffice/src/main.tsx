import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { AppRouter } from './routes';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <MantineProvider>
      <AppRouter />
    </MantineProvider>
  </StrictMode>
);
