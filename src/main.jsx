import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // atau './App.jsx'
import './index.css' // jika ada

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)