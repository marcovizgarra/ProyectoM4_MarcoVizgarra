import { useState } from 'react';
import type { Task, TaskFormValues } from '../types/task';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Estudiar React',
    description: 'Practicar componentes y props',
    completed: false,
  },
  {
    id: '2',
    title: 'Practicar TypeScript',
    description: 'Repasar interfaces y tipos',
    completed: true,
  },
];

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const editingTask = tasks.find(
    (task) => task.id === editingTaskId
  );

  const handleSaveTask = (values: TaskFormValues) => {
    if (editingTaskId !== null) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTaskId
            ? { ...task, ...values }
            : task
        )
      );

      setEditingTaskId(null);
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      ...values,
      completed: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const handleEdit = (id: string) => {
    setEditingTaskId(id);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const handleToggle = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );

    if (editingTaskId === id) {
      setEditingTaskId(null);
    }
  };

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <main className="tasks-page">
      <h1>Gestor de tareas</h1>

      <TaskForm
        key={editingTask?.id ?? 'create'}
        initialValues={
          editingTask
            ? {
                title: editingTask.title,
                description: editingTask.description,
              }
            : undefined
        }
        onSubmit={handleSaveTask}
        onCancel={editingTask ? handleCancelEdit : undefined}
      />

      <p>
        Tareas completadas: {completedCount} / {tasks.length}
      </p>

      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default TasksPage;