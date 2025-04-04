// src/components/BoardList.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskBoardContext from '../context/TaskBoardContext.jsx';


const BoardList = () => {
  const navigate = useNavigate();
  const { boards, addBoard, deleteBoard, updateBoard } = useContext(TaskBoardContext);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <div className="board-list">
      <h2>Список досок</h2>
      <div className="boards-container">
        {boards.map((board) => (
          <div
            key={board.id}
            className={`board-item ${editingBoardId === board.id ? 'editing' : ''}`}
          >
            {editingBoardId === board.id ? (
              <div className="edit-board">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Новое название..."
                  className="edit-board-input"
                />
                <div className="edit-buttons">
                  <button
                    onClick={() => {
                      updateBoard(board.id, editedTitle);
                      setEditingBoardId(null);
                    }}
                  >
                    Сохранить
                  </button>
                  <button onClick={() => setEditingBoardId(null)}>Отмена</button>
                </div>
              </div>
            ) : (
              <div className="board-title-container">
                <button onClick={() => navigate(`/board/${board.id}`)} className="board-title-btn">
                  {board.title}
                </button>
                <div className={`menu-container ${openMenuId === board.id ? 'open' : ''}`}>
                  <button
                    className="menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === board.id ? null : board.id);
                    }}
                  >
                    ⋮
                  </button>
                  {openMenuId === board.id && (
                    <div className="dropdown-menu">
                      <button
                        onClick={() => {
                          setEditingBoardId(board.id);
                          setEditedTitle(board.title);
                          setOpenMenuId(null);
                        }}
                      >
                        Редактировать
                      </button>
                      <button className="delete-btn" onClick={() => deleteBoard(board.id)}>
                        Удалить
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Название доски..."
        value={newBoardTitle}
        onChange={(e) => setNewBoardTitle(e.target.value)}
        className="add-board-input"
      />
      <button
        className="add-board-btn"
        onClick={() => {
          if (newBoardTitle.trim()) {
            addBoard(newBoardTitle);
            setNewBoardTitle('');
          }
        }}
      >
        Добавить
      </button>
    </div>
  );
};

export default BoardList;
