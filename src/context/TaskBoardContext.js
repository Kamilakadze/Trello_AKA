import { createContext, useState, useEffect } from 'react';
import { moveTaskBetweenColumns } from './taskMovement';

const TaskBoardContext = createContext();

const saveBoardsToLocalStorage = (boards) => {
    localStorage.setItem('boards', JSON.stringify(boards));
};

const loadBoardsFromLocalStorage = () => {
    const savedBoards = localStorage.getItem('boards');
    return savedBoards ? JSON.parse(savedBoards) : [];
};

export const TaskBoardProvider = ({ children }) => {
    const [boards, setBoards] = useState(loadBoardsFromLocalStorage());

    useEffect(() => {
        saveBoardsToLocalStorage(boards);
    }, [boards]);

    // ✅ Добавление доски
    const addBoard = (title) => {
        setBoards([...boards, { id: Date.now(), title, columns: [] }]);
    };

    // ✅ Обновление доски
    const updateBoard = (boardId, title) => {
        setBoards(boards.map(board =>
            board.id === boardId ? { ...board, title } : board
        ));
    };

    // ✅ Удаление доски
    const deleteBoard = (boardId) => {
        setBoards(boards.filter(board => board.id !== boardId));
    };

    // ✅ Добавление новой колонки
    const addColumn = (boardId, columnTitle) => {
        setBoards(boards.map(board =>
            board.id === boardId
                ? { ...board, columns: [...board.columns, { id: Date.now(), title: columnTitle, tasks: [] }] }
                : board
        ));
    };

    // ✅ Обновление названия колонки
    const updateColumn = (boardId, columnId, title) => {
        setBoards(boards.map(board =>
            board.id === boardId
                ? {
                    ...board,
                    columns: board.columns.map(column =>
                        column.id === columnId ? { ...column, title } : column
                    )
                }
                : board
        ));
    };

    // ✅ Удаление колонки
    const deleteColumn = (boardId, columnId) => {
        setBoards(boards.map(board =>
            board.id === boardId
                ? { ...board, columns: board.columns.filter(column => column.id !== columnId) }
                : board
        ));
    };

    // ✅ Перемещение колонок (Drag & Drop)
    const moveColumn = (boardId, fromIndex, toIndex) => {
        setBoards((prevBoards) =>
            prevBoards.map((board) => {
                if (board.id !== boardId) return board;

                const updatedColumns = [...board.columns];
                const [movedColumn] = updatedColumns.splice(fromIndex, 1);
                updatedColumns.splice(toIndex, 0, movedColumn);

                return { ...board, columns: updatedColumns };
            })
        );
    };

    // ✅ Перемещение задач между колонками (Drag & Drop)
    const moveTask = (boardId, fromColumnId, toColumnId, fromIndex, toIndex) => {
        setBoards((prevBoards) => {
            const newBoards = moveTaskBetweenColumns(prevBoards, boardId, fromColumnId, toColumnId, fromIndex, toIndex);
            console.log("Новое состояние досок:", newBoards);
            return [...newBoards]; // ✅ Создаем новый массив, чтобы React видел обновления
        });
    };
  
 
    // ✅ Добавление задачи
const addTask = (boardId, columnId, title, description) => {
    setBoards(boards.map(board =>
        board.id === boardId
            ? {
                ...board,
                columns: board.columns.map(column =>
                    column.id === columnId
                        ? { ...column, tasks: [...column.tasks, { id: Date.now(), title, description, completed: false }] }
                        : column
                )
            }
            : board
    ));
};

// ✅ Обновление задачи
const updateTask = (boardId, columnId, taskId, title, description) => {
    setBoards(boards.map(board =>
        board.id === boardId
            ? {
                ...board,
                columns: board.columns.map(column =>
                    column.id === columnId
                        ? {
                            ...column,
                            tasks: column.tasks.map(task =>
                                task.id === taskId ? { ...task, title, description } : task
                            )
                        }
                        : column
                )
            }
            : board
    ));
};

// ✅ Удаление задачи
const deleteTask = (boardId, columnId, taskId) => {
    setBoards(boards.map(board =>
        board.id === boardId
            ? {
                ...board,
                columns: board.columns.map(column =>
                    column.id === columnId
                        ? { ...column, tasks: column.tasks.filter(task => task.id !== taskId) }
                        : column
                )
            }
            : board
    ));
};

// ✅ Отметка выполнения задачи
const toggleTaskCompletion = (boardId, columnId, taskId) => {
    setBoards(boards.map(board =>
        board.id === boardId
            ? {
                ...board,
                columns: board.columns.map(column =>
                    column.id === columnId
                        ? {
                            ...column,
                            tasks: column.tasks.map(task =>
                                task.id === taskId ? { ...task, completed: !task.completed } : task
                            )
                        }
                        : column
                )
            }
            : board
    ));
};
    
    return (
        <TaskBoardContext.Provider value={{
            boards, addBoard, updateBoard, deleteBoard,
            addColumn, updateColumn, deleteColumn, moveColumn,
            addTask, updateTask, deleteTask, toggleTaskCompletion,
            moveTask
        }}>
            {children}
        </TaskBoardContext.Provider>
    );
};

export default TaskBoardContext;
