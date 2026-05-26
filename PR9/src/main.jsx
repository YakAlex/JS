import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Знаходимо HTML-елемент з id="root"
const rootElement = document.getElementById('root');

// Створюємо корінь React-додатка
const root = ReactDOM.createRoot(rootElement);

// Рендеримо компонент App всередині кореня
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
