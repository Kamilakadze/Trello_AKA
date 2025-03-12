import React, { memo, useState, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskBoardContext from '../context/TaskBoardContext';

const Task = memo(({ task, columnId, boardId, index }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskDescription, setTaskDescription] = useState(task.description || "");
    const { updateTask, deleteTask, toggleTaskCompletion, moveTask } = useContext(TaskBoardContext);

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id, index, columnId, boardId },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });   

    const [, drop] = useDrop({
        accept: 'TASK',
        hover: (item, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;
            if (item.columnId !== columnId || item.index !== index) {
                moveTask(boardId, item.columnId, columnId, item.index, index);
                item.index = index;
                item.columnId = columnId;
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} className="task" style={{
            opacity: isDragging ? 0.5 : 1,
            textDecoration: task.completed ? "line-through" : "none",
            backgroundColor: task.completed ? "#d4edda" : "#fff"
        }}>
            {isEditing ? (
                <div>
                    <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                    <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Описание задачи..." />
                    <button onClick={() => { updateTask(boardId, columnId, task.id, taskTitle, taskDescription); setIsEditing(false); }}>Сохранить</button>
                    <button onClick={() => setIsEditing(false)}>Отмена</button>
                </div>
            ) : (
                <div>
                    <input type="checkbox" checked={task.completed || false} onChange={() => toggleTaskCompletion(boardId, columnId, task.id)} />
                    <p><strong>{task.title}</strong></p>
                    <p>{task.description ? task.description : "Нет описания"}</p>
                    <button onClick={() => setIsEditing(true)}>Изменить</button>
                    <button onClick={() => deleteTask(boardId, columnId, task.id)}>Удалить</button>
                </div>
            )}
        </div>
    );
});

export default Task;
