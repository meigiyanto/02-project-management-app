'use client';

import { useDrop } from 'react-dnd';
import type { LegacyRef } from 'react';
import TaskCard from './TaskCard';
import type { Board, Task } from '../types';

const BoardColumn = ({
  board,
  tasks,
  onDropTask,
}: {
  board: Board;
  tasks: Task[];
  onDropTask: (taskId: string, sourceBoardId: string, targetBoardId: string) => void;
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'TASK',
      drop: (item: { id: string; boardId: string }) => {
        if (item.boardId !== board.id) {
          onDropTask(item.id, item.boardId, board.id);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [board.id, onDropTask],
  );

  return (
    <section
      ref={(node) => {
        drop(node as any);
      }}
      className={`panel board-column ${isOver && canDrop ? 'board-column-active' : ''}`}
    >
      <div className="board-column-header">
        <h2>{board.name}</h2>
        <span className="badge badge-outline">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="board-column-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default BoardColumn;
