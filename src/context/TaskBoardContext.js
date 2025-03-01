import { createContext, useState, useEffect } from 'react';

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

    // Сохраняем данные в localStorage при каждом изменении boards
    useEffect(() => {
        saveBoardsToLocalStorage(boards);
    }, [boards]);

    const addBoard = (title) => {
        const newBoards = [...boards, { id: Date.now(), title, columns: [] }];
        setBoards(newBoards);
    };

    const updateBoard = (boardId, title) => {
        const newBoards = boards.map(board =>
            board.id === boardId ? { ...board, title } : board
        );
        setBoards(newBoards);
    };

    const deleteBoard = (boardId) => {
        const newBoards = boards.filter(board => board.id !== boardId);
        setBoards(newBoards);
    };

    const addColumn = (boardId, columnTitle) => {
        const newBoards = boards.map(board =>
            board.id === boardId
                ? { ...board, columns: [...board.columns, { id: Date.now(), title: columnTitle, tasks: [] }] }
                : board
        );
        setBoards(newBoards);
    };

    const updateColumn = (boardId, columnId, title) => {
        const newBoards = boards.map(board =>
            board.id === boardId
                ? {
                    ...board,
                    columns: board.columns.map(column =>
                        column.id === columnId ? { ...column, title } : column
                    )
                }
                : board
        );
        setBoards(newBoards);
    };

    const deleteColumn = (boardId, columnId) => {
        const newBoards = boards.map(board =>
            board.id === boardId
                ? { ...board, columns: board.columns.filter(column => column.id !== columnId) }
                : board
        );
        setBoards(newBoards);
    };

    const addTask = (boardId, columnId, title) => {
        const newBoards = boards.map(board =>
            board.id === boardId
                ? {
                    ...board,
                    columns: board.columns.map(column =>
                        column.id === columnId
                            ? { ...column, tasks: [...column.tasks, { id: Date.now(), title }] }
                            : column
                    )
                }
                : board
        );
        setBoards(newBoards);
    };

    const updateTask = (boardId, columnId, taskId, title) => {
        const newBoards = boards.map(board =>
            board.id === boardId
                ? {
                    ...board,
                    columns: board.columns.map(column =>
                        column.id === columnId
                            ? {
                                ...column,
                                tasks: column.tasks.map(task =>
                                    task.id === taskId ? { ...task, title } : task
                                )
                            }
                            : column
                    )
                }
                : board
        );
        setBoards(newBoards);
    };

    const deleteTask = (boardId, columnId, taskId) => {
        const newBoards = boards.map(board =>
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
        );
        setBoards(newBoards);
    };

    const moveTask = (fromColumnId, toColumnId, fromIndex, toIndex) => {
        const newBoards = boards.map(board => {
            const fromColumn = board.columns.find(col => col.id === fromColumnId);
            const toColumn = board.columns.find(col => col.id === toColumnId);

            if (fromColumn && toColumn) {
                const task = fromColumn.tasks[fromIndex];
                fromColumn.tasks.splice(fromIndex, 1);
                toColumn.tasks.splice(toIndex, 0, task);
            }
            return board;
        });
        setBoards(newBoards);
    };

    return (
        <TaskBoardContext.Provider value={{
            boards, addBoard, updateBoard, deleteBoard, addColumn, updateColumn, deleteColumn,
            addTask, updateTask, deleteTask, moveTask
        }}>
            {children}
        </TaskBoardContext.Provider>
    );
};

export default TaskBoardContext;