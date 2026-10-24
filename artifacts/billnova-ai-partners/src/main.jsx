import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import './index.css';
// Fonts are bundled with the site: loading them from Google's CDN sends every visitor's IP to Google (GDPR).
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';

const theme = extendTheme({
  colors: {
    brand: {
      navy: '#071B3A',
      blue: '#1267C9',
      cyan: '#00A9E8',
      light: '#F7F9FC',
      text: '#162033',
      muted: '#64748B',
    },
  },
  fonts: {
    heading: 'Space Grotesk, sans-serif',
    body: 'DM Sans, sans-serif',
  },
});

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
);