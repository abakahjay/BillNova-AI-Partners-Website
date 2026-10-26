import { createRoot } from 'react-dom/client';
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

createRoot(document.getElementById('root')).render(<App />);
