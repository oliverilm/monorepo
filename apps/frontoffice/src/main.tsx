import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { AppRouter } from './routes';
import { createTheme, MantineColorsTuple, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const myColor: MantineColorsTuple = [
  '#dffbff',
  '#caf2ff',
  '#99e2ff',
  '#64d2ff',
  '#3cc4fe',
  '#23bcfe',
  '#09b8ff',
  '#00a1e4',
  '#008fcd',
  '#007cb6'
];

const theme = createTheme({
  colors: {
    myColor,
  }
});




root.render(
  <StrictMode>
    <MantineProvider theme={theme} forceColorScheme="dark">
      <AppRouter />
    </MantineProvider>
  </StrictMode>
);
