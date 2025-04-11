import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from './redux/authSlice';
import Board from './components/Board.jsx';
import BoardList from './components/BoardList.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import AuthPage from './pages/AuthPage.jsx';

import './styles/App.css';

const App = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth');
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app-container">
                <header
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 20px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <ThemeSwitcher />
                        {user && <span style={{ fontSize: '14px' }}>👤 {user.email}</span>}
                    </div>
                    <h1 style={{ margin: 0, textAlign: 'center', flex: 1 }}>Task Board</h1>
                    {user && (
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '5px',
                                background: '#dc3545',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Выйти
                        </button>
                    )}
                </header>

                <Routes>
                    {!user ? (
                        <>
                            <Route path="*" element={<AuthPage />} />
                            <Route path="/auth" element={<AuthPage />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<BoardList />} />
                            <Route path="/board/:id" element={<BoardWrapper />} />
                        </>
                    )}
                </Routes>
            </div>
        </DndProvider>
    );
};

const BoardWrapper = () => {
    const navigate = useNavigate();
    const id = window.location.pathname.split('/').pop();
    return <Board boardId={parseInt(id)} onBack={() => navigate('/')} />;
};

export default App;
