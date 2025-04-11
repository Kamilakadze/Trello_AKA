import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { register, login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // ✅ получаем тему

    const handleSubmit = () => {
        if (!email || !password) return alert('Заполните все поля!');

        if (isLogin) {
            dispatch(login({ email, password }));
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                navigate('/');
            } else {
                alert('Неверные данные!');
            }
        } else {
            dispatch(register({ email, password }));
            alert('Регистрация успешна!');
            setIsLogin(true);
        }
    };

    const isDark = theme === 'dark';

    return (
        <div
            className="auth-container"
            style={{
                ...styles.container,
                background: isDark ? '#2e2e3e' : '#f8f9fa',
                color: isDark ? '#ffffff' : '#000000',
                boxShadow: isDark ? '0 0 15px rgba(0,0,0,0.4)' : '0 0 10px rgba(0,0,0,0.1)',
            }}
        >
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    ...styles.input,
                    background: isDark ? '#444' : '#fff',
                    color: isDark ? '#fff' : '#000',
                    border: isDark ? '1px solid #666' : '1px solid #ccc',
                }}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    ...styles.input,
                    background: isDark ? '#444' : '#fff',
                    color: isDark ? '#fff' : '#000',
                    border: isDark ? '1px solid #666' : '1px solid #ccc',
                }}
            />
            <button onClick={handleSubmit} style={styles.button}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <p style={styles.switchText}>
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
                <button onClick={() => setIsLogin(!isLogin)} style={styles.link}>
                    {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
                </button>
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '320px',
        margin: '50px auto',
        padding: '25px',
        borderRadius: '10px',
        textAlign: 'center',
        transition: '0.3s',
    },
    input: {
        width: '90%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        fontSize: '16px',
        outline: 'none',
        transition: '0.2s',
    },
    button: {
        padding: '10px 20px',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    switchText: {
        marginTop: '15px',
        fontSize: '14px',
    },
    link: {
        background: 'none',
        color: '#007bff',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '14px',
    },
};

export default AuthPage;
