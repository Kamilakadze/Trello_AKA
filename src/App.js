// src/App.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TaskBoardProvider } from './context/TaskBoardContext';
import Board from './components/Board';
import BoardList from './components/BoardList'; // ✅ Новый компонент для списка досок
import './styles/App.css';

const App = () => {
    const [activeBoardId, setActiveBoardId] = useState(null);

    return (
        <DndProvider backend={HTML5Backend}>
            <TaskBoardProvider>
                <div className="app-container">
                    <h1>Task Board</h1>
                    {activeBoardId ? (
                        <Board boardId={activeBoardId} onBack={() => setActiveBoardId(null)} />
                    ) : (
                        <BoardList onSelectBoard={setActiveBoardId} />
                    )}
                </div>
            </TaskBoardProvider>
        </DndProvider>
    );
};

export default App;
