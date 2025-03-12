import React, { useContext, useState } from 'react';
import TaskBoardContext from '../context/TaskBoardContext';

const BoardList = ({ onSelectBoard }) => {
    const { boards, addBoard, deleteBoard } = useContext(TaskBoardContext);
    const [newBoardTitle, setNewBoardTitle] = useState("");

    return (
        <div className="board-list">
            <h2>Список досок</h2>
            
            {/* Отображение всех досок */}
            <div className="boards-container">
                {boards.map(board => (
                    <div key={board.id} className="board-item">
                        <button onClick={() => onSelectBoard(board.id)}>{board.title}</button>
                        <button className="delete-btn" onClick={() => deleteBoard(board.id)}>Удалить</button>
                    </div>
                ))}
            </div>

            {/* Добавление новой доски */}
            <div className="add-board">
                <input 
                    type="text" 
                    placeholder="Название доски..." 
                    value={newBoardTitle} 
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                />
                <button onClick={() => {
                    if (newBoardTitle.trim()) {
                        addBoard(newBoardTitle);
                        setNewBoardTitle("");
                    }
                }}>Добавить доску</button>
            </div>
        </div>
    );
};

export default BoardList;
