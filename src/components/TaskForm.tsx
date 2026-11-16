import { useState } from 'react';
import type { FormEvent } from 'react';
import type { TaskFormValues } from '../types/task';

interface TaskFormProps {
  onAddTask: (values: TaskFormValues) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onAddTask({
      title: trimmedTitle,
      description: description.trim(),
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__field">
        <label htmlFor="task-title">Título</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ingresá el título"
          required
        />
      </div>

      <div className="task-form__field">
        <label htmlFor="task-description">Descripción</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describí la tarea"
        />
      </div>

      <button type="submit" disabled={!title.trim()}>
        Agregar tarea
      </button>
    </form>
  );
}

export default TaskForm;