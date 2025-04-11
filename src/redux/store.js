// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './boardsSlice';
import authReducer from './authSlice';

// Загрузка из localStorage
const loadState = () => {
    try {
        const saved = localStorage.getItem('boards');
        if (!saved) return undefined;
        return { boards: { boards: JSON.parse(saved) } };
    } catch (e) {
        console.error('Ошибка загрузки из localStorage:', e);
        return undefined;
    }
};

// Сохранение в localStorage
const saveState = (state) => {
    try {
        const boardsToSave = state.boards.boards;
        localStorage.setItem('boards', JSON.stringify(boardsToSave));
    } catch (e) {
        console.error('Ошибка сохранения в localStorage:', e);
    }
};

const store = configureStore({
    reducer: {
        boards: boardsReducer,
        auth: authReducer,
    },
    preloadedState: loadState(),
});

// Подписка на изменения
store.subscribe(() => {
    saveState(store.getState());
});



export default store;
