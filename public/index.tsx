import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: Added .tsx extension to fix module resolution error.
// UPDATE: Changed path to App.tsx to be relative to the new location in /public.
import App from '../App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);