// src/components/ThemeSwitcher.jsx

import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext.jsx';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            style={{
                margin: '10px',
                padding: '8px 12px',
                fontSize: '16px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: '1px solid #ccc',
                backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
                color: theme === 'light' ? '#000' : '#fff',
                transition: '0.3s ease'
            }}
        >
            Переключить тему: {theme === 'light' ? '🌞 Светлая' : '🌙 Тёмная'}
        </button>
    );
};

export default ThemeSwitcher;
