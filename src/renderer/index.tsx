// src/renderer/index.tsx
import React from 'react';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';


const container = document.getElementById('root') || document.body;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);