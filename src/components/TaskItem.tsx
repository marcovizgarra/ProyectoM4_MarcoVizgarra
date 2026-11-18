import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <div className="task-item__content">
        <label className="task-item__label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />

          <span>{task.title}</span>
        </label>

        {task.description && (
          <p className="task-item__description">
            {task.description}
          </p>
        )}
      </div>

      <div className="task-item__actions">
        <button
          type="button"
          onClick={() => onEdit(task.id)}
          aria-label={`Editar tarea: ${task.title}`}
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`Eliminar tarea: ${task.title}`}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default TaskItem;