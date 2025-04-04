// src/App.jsx
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TaskBoardProvider } from './context/TaskBoardContext.jsx';
import Board from './components/Board.jsx';
import BoardList from './components/BoardList.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import './styles/App.css';

const App = () => {
  return (
      <DndProvider backend={HTML5Backend}>
        <TaskBoardProvider>
          <div className="app-container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
              <h1>Task Board</h1>
              <ThemeSwitcher />
            </header>

            <Routes>
              <Route path="/" element={<BoardList />} />
              <Route path="/board/:id" element={<BoardWrapper />} />
            </Routes>
          </div>
        </TaskBoardProvider>
      </DndProvider>
  );
};

const BoardWrapper = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split('/').pop();

  return <Board boardId={parseInt(id)} onBack={() => navigate('/')} />;
};

export default App;
