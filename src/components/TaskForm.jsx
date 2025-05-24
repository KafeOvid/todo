import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const TaskForm = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim(), priority);
      setText('');
      setPriority('medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          data-testid="task-input"
        />
        <div className="flex gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            data-testid="priority-select"
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <button
            type="submit"
            className="flex items-center justify-center gap-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            data-testid="add-task-button"
          >
            <PlusCircle size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;