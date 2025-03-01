import React, { useContext, useState } from 'react';
import TaskBoardContext from '../context/TaskBoardContext';
import Column from './Column';

const Board = () => {
    const { boards, addBoard, updateBoard, deleteBoard, addColumn } = useContext(TaskBoardContext);
    const [newBoardTitle, setNewBoardTitle] = useState('');

    return (
        <div className="board-container">
            <input
                type="text"
                placeholder="Название новой доски..."
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
            />
            <button onClick={() => { addBoard(newBoardTitle); setNewBoardTitle(''); }}>Добавить доску</button>

            {boards.map(board => (
                <div key={board.id} className="board">
                    <input
                        type="text"
                        value={board.title}
                        onChange={(e) => updateBoard(board.id, e.target.value)}
                    />
                    <button onClick={() => deleteBoard(board.id)}>Удалить</button>

                    <div className="columns-container">
                        {board.columns.map(column => (
                            <Column key={column.id} boardId={board.id} column={column} />
                        ))}
                    </div>

                    <button onClick={() => addColumn(board.id, "Новая колонка")}>Добавить колонку</button>
                </div>
            ))}
        </div>
    );
};

export default Board;