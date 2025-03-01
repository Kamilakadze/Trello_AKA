import React, { useContext, useState } from 'react';
import TaskBoardContext from '../context/TaskBoardContext';
import Task from './Task';

const Column = ({ boardId, column }) => {
    const { updateColumn, deleteColumn, addTask, moveTask } = useContext(TaskBoardContext);
    const [newTitle, setNewTitle] = useState(column.title);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    return (
        <div className="column">
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => updateColumn(boardId, column.id, newTitle)}
            />
            <button onClick={() => deleteColumn(boardId, column.id)}>Удалить</button>

            <div className="tasks-container">
                {column.tasks.map((task, index) => (
                    <Task
                        key={task.id}
                        task={task}
                        index={index}
                        columnId={column.id}
                        boardId={boardId}
                        moveTask={moveTask} // Передаем moveTask в Task
                    />
                ))}
            </div>

            <input
                type="text"
                placeholder="Новая задача..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <button onClick={() => { addTask(boardId, column.id, newTaskTitle); setNewTaskTitle(''); }}>Добавить задачу</button>
        </div>
    );
};

export default Column;