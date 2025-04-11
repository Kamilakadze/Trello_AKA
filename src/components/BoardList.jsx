import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    addBoard,
    deleteBoard,
    updateBoard,
} from '../redux/boardsSlice.js';

const BoardList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards.boards);
    const user = useSelector((state) => state.auth.user); // ✅ получаем текущего пользователя

    const [newBoardTitle, setNewBoardTitle] = useState('');
    const [editingBoardId, setEditingBoardId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null);

    // ✅ Фильтруем доски только по текущему пользователю
    const userBoards = boards.filter((board) => board.owner === user?.email);

    return (
        <div className="board-list">
            <h2>Мои доски</h2>
            <div className="boards-container">
                {userBoards.map((board) => (
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
                                            dispatch(updateBoard({ id: board.id, title: editedTitle }));
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
                                <button
                                    onClick={() => navigate(`/board/${board.id}`)}
                                    className="board-title-btn"
                                >
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
                                            <button
                                                className="delete-btn"
                                                onClick={() => dispatch(deleteBoard(board.id))}
                                            >
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

            <div className="add-board">
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
                            dispatch(addBoard({ title: newBoardTitle, userEmail: user.email })); // ✅ передаём владельца
                            setNewBoardTitle('');
                        }
                    }}
                >
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default BoardList;
