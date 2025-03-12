export const moveTaskBetweenColumns = (boards, boardId, fromColumnId, toColumnId, fromIndex, toIndex) => {
    console.log(`Перемещение задачи из ${fromColumnId} в ${toColumnId} (index: ${fromIndex} → ${toIndex})`);

    return boards.map((board) => {
        if (board.id !== boardId) return board;

        // ✅ Глубокая копия доски (чтобы React видел изменения)
        const updatedBoard = { ...board };

        // ✅ Глубокая копия колонок (чтобы React видел изменения)
        updatedBoard.columns = board.columns.map((col) => ({
            ...col,
            tasks: col.tasks ? [...col.tasks] : [], // ✅ Теперь `tasks` ВСЕГДА массив
        }));

        const fromColumn = updatedBoard.columns.find((col) => col.id === fromColumnId);
        const toColumn = updatedBoard.columns.find((col) => col.id === toColumnId);

        if (!fromColumn || !toColumn) return board;

        // ✅ Удаляем задачу из старой колонки
        const [movedTask] = fromColumn.tasks.splice(fromIndex, 1);

        // ✅ Если колонка пустая, создаем `tasks` массив
        if (!toColumn.tasks) {
            toColumn.tasks = [];
        }

        // ✅ Добавляем задачу в новую колонку
        if (movedTask) {
            toColumn.tasks.splice(toIndex !== undefined ? toIndex : 0, 0, { ...movedTask, columnId: toColumnId });
        }

        console.log("Обновленные колонки:", updatedBoard.columns);

        return { ...updatedBoard }; // ✅ Теперь React видит изменения
    });
};
