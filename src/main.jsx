import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrefsProvider } from './lib/i18n.jsx';
import App from './App.jsx';
import './global.css';

// Every link to another website opens in a new tab. Links already say target="_blank",
// but some embedded browsers ignore that, so external clicks are opened explicitly.
document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest?.('a[href]');
  if (!a) return;
  const url = new URL(a.href, location.href);
  if (!/^https?:$/.test(url.protocol) || url.origin === location.origin) return;
  e.preventDefault();
  window.open(url.href, '_blank', 'noopener,noreferrer');
}, true);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrefsProvider>
      <App />
    </PrefsProvider>
  </React.StrictMode>
);
