import React from 'react';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

const TaskList = ({ tasks, filter, onToggleComplete, onDeleteTask, onEditTask }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  if (sortedTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        <ClipboardList size={48} className="mb-4 opacity-50" />
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm mt-1">
          {filter === 'all'
            ? 'Add a new task to get started'
            : filter === 'active'
            ? 'No active tasks - great job!'
            : 'No completed tasks yet'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-testid="task-list">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;