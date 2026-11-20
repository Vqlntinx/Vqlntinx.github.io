import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrefsProvider } from './lib/i18n.jsx';
import App from './App.jsx';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrefsProvider>
      <App />
    </PrefsProvider>
  </React.StrictMode>
);
