import React, { memo, useState, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskBoardContext from '../context/TaskBoardContext.jsx';

const Task = memo(({ task, columnId, boardId, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description || '');
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
    <div
      ref={(node) => drag(drop(node))}
      className={`task ${task.completed ? 'task-completed' : ''} ${isEditing ? 'task-editing' : ''}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: task.completed ? '#d4edda' : '#fff', // ✅ Фон задачи меняется в зависимости от выполнения
      }}
    >
      {isEditing ? (
        <div className="task-edit-form">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="task-input"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="task-textarea"
          />
          <div className="task-buttons">
            <button
              className="save-task-btn"
              onClick={() => {
                updateTask(boardId, columnId, task.id, taskTitle, taskDescription);
                setIsEditing(false);
              }}
            >
              Сохранить
            </button>
            <button className="cancel-task-btn" onClick={() => setIsEditing(false)}>
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className="task-content">
          <input
            type="checkbox"
            checked={task.completed || false}
            onChange={() => toggleTaskCompletion(boardId, columnId, task.id)}
          />
          <p
            className={`task-title ${task.completed ? 'completed-text' : ''}`}
            style={{ fontWeight: 'bold' }}
          >
            {task.title}
          </p>
          <p className={`task-description ${task.completed ? 'completed-text' : ''}`}>
            {task.description ? task.description : null}
          </p>
          <div className="task-buttons">
            <button className="edit-task-btn" onClick={() => setIsEditing(true)}>
              Изменить
            </button>
            <button
              className="delete-task-btn"
              onClick={() => deleteTask(boardId, columnId, task.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default Task;
