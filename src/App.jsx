import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CheckSquare } from 'lucide-react';
import { saveTasks, loadTasks } from './utils/storage';
import { ThemeProvider } from './contexts/ThemeContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (text, priority) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const taskCount = {
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CheckSquare size={28} className="text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Todo App</h1>
              </div>
              <ThemeToggle />
            </div>
            <TaskForm onAddTask={addTask} />
            <FilterBar
              currentFilter={filter}
              onFilterChange={setFilter}
              taskCount={taskCount}
            />
          </header>

          <main>
            <TaskList
              tasks={tasks}
              filter={filter}
              onToggleComplete={toggleComplete}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
            />
          </main>

          <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>{new Date().getFullYear()} Todo App - {taskCount.completed} of {taskCount.all} tasks completed</p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;