// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { TaskBoardProvider } from './context/TaskBoardContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <TaskBoardProvider>
                    <App />
                </TaskBoardProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
