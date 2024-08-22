import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MouseContextProvider from './context/mouse-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// <React.StrictMode>
// </React.StrictMode>
root.render(
  <BrowserRouter>
    <MouseContextProvider>
      <App />
    </MouseContextProvider>

  </BrowserRouter>
);
