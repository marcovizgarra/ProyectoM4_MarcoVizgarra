import { useState } from 'react';
import type { Task } from '../types/task';
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
  };

  return (
    <main className="tasks-page">
      <h1>Gestor de tareas</h1>

      <p>
        Tareas completadas: {tasks.filter((task) => task.completed).length}
        {' / '}
        {tasks.length}
      </p>

      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default TasksPage;