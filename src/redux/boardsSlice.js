import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boards: [],
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard: (state, action) => {
            const newBoard = {
                id: Date.now(),
                title: action.payload,
                columns: [],
            };
            state.boards.push(newBoard);
        },

        updateBoard: (state, action) => {
            const { id, title } = action.payload;
            const board = state.boards.find((b) => b.id === id);
            if (board) {
                board.title = title;
            }
        },

        deleteBoard: (state, action) => {
            state.boards = state.boards.filter((b) => b.id !== action.payload);
        },

        addColumn: (state, action) => {
            const { boardId, title, description = '' } = action.payload;
            const board = state.boards.find((b) => b.id === boardId);
            if (board) {
                board.columns.push({
                    id: Date.now(),
                    title,
                    description,
                    tasks: [],
                });
            }
        },

        updateColumn: (state, action) => {
            const { boardId, columnId, title } = action.payload;
            const board = state.boards.find((b) => b.id === boardId);
            if (board) {
                const column = board.columns.find((c) => c.id === columnId);
                if (column) {
                    column.title = title;
                }
            }
        },

        deleteColumn: (state, action) => {
            const { boardId, columnId } = action.payload;
            const board = state.boards.find((b) => b.id === boardId);
            if (board) {
                board.columns = board.columns.filter((c) => c.id !== columnId);
            }
        },

        moveColumn: (state, action) => {
            const { boardId, fromIndex, toIndex } = action.payload;
            const board = state.boards.find((b) => b.id === boardId);
            if (board) {
                const columns = [...board.columns];
                const [moved] = columns.splice(fromIndex, 1);
                columns.splice(toIndex, 0, moved);
                board.columns = columns;
            }
        },

        addTask: (state, action) => {
            const { boardId, columnId, title, description } = action.payload;
            const board = state.boards.find((b) => b.id === boardId);
            if (board) {
                const column = board.columns.find((c) => c.id === columnId);
                if (column) {
                    column.tasks.push({
                        id: Date.now(),
                        title,
                        description,
                        completed: false,
                    });
                }
            }
        },

        updateTask: (state, action) => {
            const { boardId, columnId, taskId, title, description } = action.payload;
            const board = state.boards.find((b) => b.id === boardId);
            if (board) {
                const column = board.columns.find((c) => c.id === columnId);
                if (column) {
                    const task = column.tasks.find((t) => t.id === taskId);
                    if (task) {
                        task.title = title;
                        task.description = description;
                    }
                }
            }
        },

        deleteTask: (state, action) => {
            const { boardId, columnId, taskId } = action.payload;
            const board = state.boards.find((b) => b.id === boardId);
            if (board) {
                const column = board.columns.find((c) => c.id === columnId);
                if (column) {
                    column.tasks = column.tasks.filter((t) => t.id !== taskId);
                }
            }
        },

        toggleTaskCompletion: (state, action) => {
            const { boardId, columnId, taskId } = action.payload;
            const board = state.boards.find((b) => b.id === boardId);
            if (board) {
                const column = board.columns.find((c) => c.id === columnId);
                if (column) {
                    const task = column.tasks.find((t) => t.id === taskId);
                    if (task) {
                        task.completed = !task.completed;
                    }
                }
            }
        },

        moveTask: (state, action) => {
            const { boardId, fromColumnId, toColumnId, fromIndex, toIndex } = action.payload;
            const board = state.boards.find((b) => b.id === boardId);
            if (!board) return;

            const fromColumn = board.columns.find((c) => c.id === fromColumnId);
            const toColumn = board.columns.find((c) => c.id === toColumnId);
            if (!fromColumn || !toColumn) return;

            const [movedTask] = fromColumn.tasks.splice(fromIndex, 1);
            if (movedTask) {
                toColumn.tasks.splice(toIndex, 0, movedTask);
            }
        },
    },
});

export const {
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
} = boardsSlice.actions;

export default boardsSlice.reducer;
