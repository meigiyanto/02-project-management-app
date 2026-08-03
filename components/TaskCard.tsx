'use client';

import { useDrag } from 'react-dnd';
import type { Task } from '../types';

const TaskCard = ({ task }: { task: Task }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'TASK',
      item: { id: task.id, boardId: task.boardId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task],
  );

  return (
    <article
      ref={(node) => {
        drag(node as any);
      }}
      className="card task-card"
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <div className="task-card-header">
        <h3>{task.title}</h3>
        {task.dueDate ? <span className="badge badge-outline">Due {task.dueDate}</span> : null}
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-tags">
        {task.labels.map((label) => (
          <span
            key={label.id}
            className="badge"
            style={{ background: label.color, color: '#fff' }}
          >
            {label.name}
          </span>
        ))}
      </div>
      <div className="task-footer">
        <span>{task.attachments.length} attachment{task.attachments.length !== 1 ? 's' : ''}</span>
        <span>{task.commentsCount} comment{task.commentsCount !== 1 ? 's' : ''}</span>
      </div>
    </article>
  );
};

export default TaskCard;
