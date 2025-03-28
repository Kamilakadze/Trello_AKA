export const moveTaskBetweenColumns = (
  boards,
  boardId,
  fromColumnId,
  toColumnId,
  fromIndex,
  toIndex
) => {
  console.log(
    `Перемещение задачи из ${fromColumnId} в ${toColumnId} (index: ${fromIndex} → ${toIndex})`
  );

  return boards.map((board) => {
    if (board.id !== boardId) return board;

    const updatedBoard = { ...board };

    updatedBoard.columns = board.columns.map((col) => ({
      ...col,
      tasks: col.tasks ? [...col.tasks] : [],
    }));

    const fromColumn = updatedBoard.columns.find((col) => col.id === fromColumnId);
    const toColumn = updatedBoard.columns.find((col) => col.id === toColumnId);

    if (!fromColumn || !toColumn) return board;

    const [movedTask] = fromColumn.tasks.splice(fromIndex, 1);

    if (!toColumn.tasks) {
      toColumn.tasks = [];
    }

    if (movedTask) {
      toColumn.tasks.splice(toIndex !== undefined ? toIndex : 0, 0, {
        ...movedTask,
        columnId: toColumnId,
      });
    }

    console.log('Обновленные колонки:', updatedBoard.columns);

    return { ...updatedBoard };
  });
};
