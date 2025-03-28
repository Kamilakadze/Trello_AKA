import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { moveTaskBetweenColumns } from './taskMovement.js';

const TaskBoardContext = createContext();

const apiUrl = 'http://localhost:3001/boards';

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
        const fetchBoards = async () => {
            try {
                console.log('Запрос к серверу для получения данных...');
                const response = await axios.get(apiUrl);
                console.log('Полученные данные:', response.data);
                setBoards(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных с сервера:', error);
            }
        };
        fetchBoards();
    }, []);

    useEffect(() => {
        saveBoardsToLocalStorage(boards);
        axios
            .put(apiUrl, boards)
            .catch((error) => console.error('Ошибка синхронизации с сервером:', error));
    }, [boards]);

    const addBoard = (title) => {
        const newBoard = { id: Date.now(), title, columns: [] };
        setBoards([...boards, newBoard]);
        axios
            .post(apiUrl, newBoard)
            .catch((error) => console.error('Ошибка добавления доски на сервер:', error));
    };

    const updateBoard = (boardId, title) => {
        const updatedBoards = boards.map((board) =>
            board.id === boardId ? { ...board, title } : board
        );
        setBoards(updatedBoards);
        axios
            .put(`${apiUrl}/${boardId}`, { title })
            .catch((error) => console.error('Ошибка обновления доски на сервере:', error));
    };

    const deleteBoard = (boardId) => {
        const updatedBoards = boards.filter((board) => board.id !== boardId);
        setBoards(updatedBoards);
        axios
            .delete(`${apiUrl}/${boardId}`)
            .catch((error) => console.error('Ошибка удаления доски с сервера:', error));
    };

    const addColumn = (boardId, columnTitle, columnDescription = '') => {
        setBoards(
            boards.map((board) =>
                board.id === boardId
                    ? {
                        ...board,
                        columns: [
                            ...board.columns,
                            {
                                id: Date.now(),
                                title: columnTitle,
                                description: columnDescription,
                                tasks: [],
                            },
                        ],
                    }
                    : board
            )
        );
    };

    const updateColumn = (boardId, columnId, title) => {
        setBoards(
            boards.map((board) =>
                board.id === boardId
                    ? {
                        ...board,
                        columns: board.columns.map((column) =>
                            column.id === columnId ? { ...column, title } : column
                        ),
                    }
                    : board
            )
        );
    };

    const deleteColumn = (boardId, columnId) => {
        setBoards(
            boards.map((board) =>
                board.id === boardId
                    ? { ...board, columns: board.columns.filter((column) => column.id !== columnId) }
                    : board
            )
        );
    };

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

    const moveTask = (boardId, fromColumnId, toColumnId, fromIndex, toIndex) => {
        setBoards((prevBoards) => {
            const newBoards = moveTaskBetweenColumns(
                prevBoards,
                boardId,
                fromColumnId,
                toColumnId,
                fromIndex,
                toIndex
            );
            return [...newBoards];
        });
    };

    const addTask = (boardId, columnId, title, description) => {
        setBoards(
            boards.map((board) =>
                board.id === boardId
                    ? {
                        ...board,
                        columns: board.columns.map((column) =>
                            column.id === columnId
                                ? {
                                    ...column,
                                    tasks: [
                                        ...column.tasks,
                                        { id: Date.now(), title, description, completed: false },
                                    ],
                                }
                                : column
                        ),
                    }
                    : board
            )
        );
    };

    const updateTask = (boardId, columnId, taskId, title, description) => {
        setBoards(
            boards.map((board) =>
                board.id === boardId
                    ? {
                        ...board,
                        columns: board.columns.map((column) =>
                            column.id === columnId
                                ? {
                                    ...column,
                                    tasks: column.tasks.map((task) =>
                                        task.id === taskId ? { ...task, title, description } : task
                                    ),
                                }
                                : column
                        ),
                    }
                    : board
            )
        );
    };

    const deleteTask = (boardId, columnId, taskId) => {
        setBoards(
            boards.map((board) =>
                board.id === boardId
                    ? {
                        ...board,
                        columns: board.columns.map((column) =>
                            column.id === columnId
                                ? { ...column, tasks: column.tasks.filter((task) => task.id !== taskId) }
                                : column
                        ),
                    }
                    : board
            )
        );
    };

    const toggleTaskCompletion = (boardId, columnId, taskId) => {
        setBoards(
            boards.map((board) =>
                board.id === boardId
                    ? {
                        ...board,
                        columns: board.columns.map((column) =>
                            column.id === columnId
                                ? {
                                    ...column,
                                    tasks: column.tasks.map((task) =>
                                        task.id === taskId ? { ...task, completed: !task.completed } : task
                                    ),
                                }
                                : column
                        ),
                    }
                    : board
            )
        );
    };

    return (
        <TaskBoardContext.Provider
            value={{
                boards,
                addBoard,
                updateBoard,
                deleteBoard,
                addColumn,
                updateColumn,
                deleteColumn,
                moveColumn,
                addTask,
                updateTask,
                deleteTask,
                toggleTaskCompletion,
                moveTask,
            }}
        >
            {children}
        </TaskBoardContext.Provider>
    );
};

export default TaskBoardContext;