import React from 'react';
import { createRoot } from 'react-dom/client';
import { LazyMotion, domAnimation } from 'framer-motion';
import App from './App';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </React.StrictMode>
);
