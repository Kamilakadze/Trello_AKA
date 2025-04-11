// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadUser = () => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: loadUser(), // сохраняем при входе
    },
    reducers: {
        register: (state, action) => {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(action.payload);
            localStorage.setItem('users', JSON.stringify(users));
        },
        login: (state, action) => {
            const { email, password } = action.payload;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const found = users.find((u) => u.email === email && u.password === password);
            if (found) {
                state.user = found;
                localStorage.setItem('user', JSON.stringify(found));
            }
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
