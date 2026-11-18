import { useState } from 'react';
import type { SubmitEvent } from 'react';
import type { TaskFormValues } from '../types/task';

interface TaskFormProps {
  initialValues?: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
  onCancel?: () => void;
}

function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(
    initialValues?.title ?? ''
  );

  const [description, setDescription] = useState(
    initialValues?.description ?? ''
  );

  const isEditing = initialValues !== undefined;

const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Editar tarea' : 'Nueva tarea'}</h2>

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

      <div className="task-form__actions">
        <button type="submit" disabled={!title.trim()}>
          {isEditing ? 'Guardar cambios' : 'Agregar tarea'}
        </button>

        {isEditing && onCancel && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;