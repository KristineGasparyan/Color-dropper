import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ColorDropperApp from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ColorDropperApp />
  </React.StrictMode>
);

reportWebVitals();
