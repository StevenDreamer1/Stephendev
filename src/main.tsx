import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Keep as is, assuming App.tsx is in the same directory
import './index.css'; // Keep as is, assuming index.css is in the same directory

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
