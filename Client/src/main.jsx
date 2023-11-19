import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css';
import { APIProvider } from './Context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <APIProvider>
    <App />
    </APIProvider>
  </React.StrictMode>,
)
