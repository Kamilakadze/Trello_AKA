import React, { useContext, useState } from 'react';
import TaskBoardContext from '../context/TaskBoardContext';
import Column from './Column';

const Board = ({ boardId, onBack }) => {
    const { boards, addColumn, moveColumn, updateBoard, deleteBoard } = useContext(TaskBoardContext);
    const board = boards.find(b => b.id === boardId);

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(board ? board.title : "");

    const MAX_COLUMNS_PER_ROW = 4;

    if (!board) return <p>Доска не найдена</p>;

    return (
        <div className="board-container">
            <button onClick={onBack}>⬅ Назад</button>

            {isEditing ? (
  <div className="edit-board-container">
    <input
      type="text"
      className="board-title-input"
      value={editedTitle}
      onChange={(e) => setEditedTitle(e.target.value)}
    />
    <div className="edit-buttons">
      <button onClick={() => { updateBoard(board.id, editedTitle); setIsEditing(false); }}>Сохранить</button>
      <button onClick={() => setIsEditing(false)}>Отмена</button>
    </div>
  </div>
) : (
  <div>
    <h2>{board.title}</h2>
    <button onClick={() => { setEditedTitle(board.title); setIsEditing(true); }}>Редактировать</button>
    <button className="delete-btn" onClick={() => { deleteBoard(board.id); onBack(); }}>Удалить доску</button>
  </div>
)}


            <div className="columns-wrapper">
                {board.columns.reduce((rows, column, index) => {
                    if (index % MAX_COLUMNS_PER_ROW === 0) rows.push([]);
                    rows[rows.length - 1].push(
                        <Column key={column.id} boardId={board.id} column={column} index={index} moveColumn={moveColumn} />
                    );
                    return rows;
                }, []).map((row, rowIndex) => (
                    <div key={rowIndex} className="column-row" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '15px',
                        marginBottom: '20px'
                    }}>
                        {row}
                    </div>
                ))}
            </div>

            <button onClick={() => addColumn(board.id, "Новая колонка")}>Добавить колонку</button>
        </div>
    );
};

export default Board;
