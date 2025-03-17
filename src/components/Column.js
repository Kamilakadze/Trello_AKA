import React, { useContext, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import TaskBoardContext from '../context/TaskBoardContext';
import Task from './Task';

const Column = ({ boardId, column, index, moveColumn }) => {
    const { updateColumn, deleteColumn, addTask, moveTask } = useContext(TaskBoardContext);
    const [newTitle, setNewTitle] = useState(column.title);
    const [isEditing, setIsEditing] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [taskList, setTaskList] = useState(column.tasks || []);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setTaskList(column.tasks || []);
    }, [column.tasks]);

    const handleSaveTitle = () => {
        updateColumn(boardId, column.id, newTitle);
        setIsEditing(false);
    };

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
                moveColumn(boardId, draggedColumn.index, index);
                draggedColumn.index = index;
            }
        },
    });

    const [, dropTask] = useDrop({
        accept: 'TASK',
        drop: (item, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;

            if (item.columnId !== column.id) {
                moveTask(boardId, item.columnId, column.id, item.index, taskList.length);
                item.columnId = column.id;
                item.index = taskList.length;
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} className="column" style={{ opacity: isDragging ? 0.5 : 1 }}>
            {isEditing ? (
                <div>
                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <button className="save-btn-name-column" onClick={handleSaveTitle}>Сохранить</button>
                    <button className="cancel-btn-name-column" onClick={() => setIsEditing(false)}>Отмена</button>
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
                                <button onClick={() => { setIsEditing(true); setMenuOpen(false); }}>
                                    <FaEdit /> Редактировать
                                </button>
                                <button className="delete-btn" onClick={() => { deleteColumn(boardId, column.id); setMenuOpen(false); }}>
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

            <input type="text" placeholder="Название задачи..." value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
            <textarea placeholder="Описание задачи..." value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} />
            <button className="add-task-btn" onClick={() => { addTask(boardId, column.id, newTaskTitle, newTaskDescription); setNewTaskTitle(''); setNewTaskDescription(''); }}>Добавить задачу</button>
        </div>
    );
};

export default Column;
