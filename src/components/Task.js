import React, { memo, useState, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskBoardContext from '../context/TaskBoardContext';

const Task = memo(({ task, columnId, boardId, index, moveTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);
    const { updateTask, deleteTask } = useContext(TaskBoardContext);

    const [, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id, index, columnId },
    });

    const [, drop] = useDrop({
        accept: 'TASK',
        hover: (draggedItem) => {
            if (draggedItem.id !== task.id) {
                moveTask(draggedItem.columnId, columnId, draggedItem.index, index);
                draggedItem.index = index;
                draggedItem.columnId = columnId;
            }
        },
    });

    const handleSave = () => {
        updateTask(boardId, columnId, task.id, taskTitle); // Вызов функции updateTask
        setIsEditing(false);
    };

    return (
        <div ref={(node) => drag(drop(node))} className="task">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={() => setIsEditing(false)}>Отмена</button>
                </div>
            ) : (
                <div>
                    <p>{task.title}</p>
                    <button onClick={() => setIsEditing(true)}>Изменить</button>
                    <button onClick={() => deleteTask(boardId, columnId, task.id)}>Удалить</button>
                </div>
            )}
        </div>
    );
});

export default Task;