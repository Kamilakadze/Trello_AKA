import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TaskBoardProvider } from './context/TaskBoardContext';
import Board from './components/Board';
import './styles/App.css';

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <TaskBoardProvider>
                <div className="app-container">
                    <h1>Task Board</h1>
                    <Board />
                </div>
            </TaskBoardProvider>
        </DndProvider>
    );
};

export default App;