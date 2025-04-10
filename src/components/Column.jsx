import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import {
    updateColumn,
    deleteColumn,
    addTask,
    moveTask,
    moveColumn,
} from '../redux/boardsSlice';
import Task from './Task.jsx';

const Column = ({ boardId, column, index }) => {
    const dispatch = useDispatch();
    const [newTitle, setNewTitle] = useState(column.title);
    const [isEditing, setIsEditing] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const [{ isDragging }, drag] = useDrag({
        type: 'COLUMN',
        item: { index, boardId, columnId: column.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'COLUMN',
        hover: (draggedColumn) => {
            if (draggedColumn.index !== index) {
                dispatch(moveColumn({ boardId, fromIndex: draggedColumn.index, toIndex: index }));
                draggedColumn.index = index;
            }
        },
    });

    const [, dropTask] = useDrop({
        accept: 'TASK',
        drop: (item, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;
            if (item.columnId !== column.id) {
                dispatch(
                    moveTask({
                        boardId,
                        fromColumnId: item.columnId,
                        toColumnId: column.id,
                        fromIndex: item.index,
                        toIndex: column.tasks.length,
                    })
                );
                item.columnId = column.id;
                item.index = column.tasks.length;
            }
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            className="column"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button
                        className="save-btn-name-column"
                        onClick={() => {
                            dispatch(updateColumn({ boardId, columnId: column.id, title: newTitle }));
                            setIsEditing(false);
                        }}
                    >
                        Сохранить
                    </button>
                    <button className="cancel-btn-name-column" onClick={() => setIsEditing(false)}>
                        Отмена
                    </button>
                </div>
            ) : (
                <div className="column-header">
                    <h3>{column.title}</h3>
                    <div className="menu-container">
                        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                            <FaEllipsisV />
                        </button>
                        {menuOpen && (
                            <div className="dropdown-menu">
                                <button
                                    onClick={() => {
                                        setIsEditing(true);
                                        setMenuOpen(false);
                                    }}
                                >
                                    <FaEdit /> Редактировать
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        dispatch(deleteColumn({ boardId, columnId: column.id }));
                                        setMenuOpen(false);
                                    }}
                                >
                                    <FaTrash /> Удалить
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div ref={dropTask} className="tasks-container">
                {column.tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} columnId={column.id} boardId={boardId} />
                ))}
            </div>

            <input
                type="text"
                placeholder="Название задачи..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <textarea
                placeholder="Описание задачи..."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <button
                className="add-task-btn"
                onClick={() => {
                    if (newTaskTitle.trim()) {
                        dispatch(
                            addTask({
                                boardId,
                                columnId: column.id,
                                title: newTaskTitle.trim(),
                                description: newTaskDescription.trim(),
                            })
                        );
                        setNewTaskTitle('');
                        setNewTaskDescription('');
                    }
                }}
            >
                Добавить задачу
            </button>
        </div>
    );
};

export default Column;
