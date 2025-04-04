// src/components/ThemeSwitcher.jsx

import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext.jsx';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: theme === 'light' ? '#333' : '#f5f5f5',
                transition: '0.3s',
            }}
            title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
        >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
    );
};

export default ThemeSwitcher;
