import React, { useContext, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskBoardContext from '../context/TaskBoardContext';
import Task from './Task';


const Column = ({ boardId, column, index, moveColumn }) => {
    const { updateColumn, deleteColumn, addTask, moveTask } = useContext(TaskBoardContext);
    const [newTitle, setNewTitle] = useState(column.title);
    const [isEditing, setIsEditing] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [taskList, setTaskList] = useState(column.tasks || []);
    useEffect(() => {
        setTaskList(column.tasks || []); // ✅ Обновляем `tasks` при изменении состояния
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

            console.log(`Drop: перемещаем задачу ${item.id} в колонку ${column.id}`);

            if (item.columnId !== column.id) {
                moveTask(boardId, item.columnId, column.id, item.index, taskList.length);
                item.columnId = column.id; // ✅ Теперь React обновляет состояние задачи
                item.index = taskList.length;
            }
        },
    });
    
    return (
        <div ref={(node) => drag(drop(node))} className="column" style={{ opacity: isDragging ? 0.5 : 1 }}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button onClick={handleSaveTitle}>Сохранить</button>
                    <button onClick={() => setIsEditing(false)}>Отмена</button>
                </div>
            ) : (
                <div>
                    <h3>{column.title}</h3>
                    <button onClick={() => setIsEditing(true)}>Редактировать</button>
                    <button onClick={() => deleteColumn(boardId, column.id)}>Удалить</button>
                </div>
            )}

            <div ref={dropTask} className="tasks-container">
                {column.tasks.map((task, index) => (
                    <Task
                        key={task.id}
                        task={task}
                        index={index}
                        columnId={column.id}
                        boardId={boardId}
                    />
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
            <button onClick={() => { 
                addTask(boardId, column.id, newTaskTitle, newTaskDescription);
                setNewTaskTitle('');
                setNewTaskDescription('');
            }}>Добавить задачу</button>
        </div>
    );
};

export default Column;
