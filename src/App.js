<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
=======
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
>>>>>>> 8b527a8dc91e50d789b57b62d65a3e1e1a56e97a

export default App;
