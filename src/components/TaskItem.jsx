import React, { useState } from 'react';
import { Check, Edit, Trash, X, Save } from 'lucide-react';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const getPriorityStyles = () => {
    switch (task.priority) {
      case 'high':
        return 'border-red-500 dark:border-red-400';
      case 'medium':
        return 'border-amber-500 dark:border-amber-400';
      case 'low':
        return 'border-emerald-500 dark:border-emerald-400';
      default:
        return 'border-gray-300 dark:border-gray-600';
    }
  };

  const getPriorityBadgeStyles = () => {
    switch (task.priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'low':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEditTask(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <div 
      className={`group p-4 mb-3 rounded-lg border-l-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 ${getPriorityStyles()}`}
      data-testid="task-item"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-grow">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-full border border-gray-300 dark:border-gray-600 ${
              task.completed
                ? 'bg-blue-500 dark:bg-blue-600 border-blue-500 dark:border-blue-600'
                : 'bg-white dark:bg-gray-700'
            } flex items-center justify-center transition-colors duration-200`}
            data-testid="complete-button"
          >
            {task.completed && <Check size={14} className="text-white" />}
          </button>
          
          {isEditing ? (
            <div className="flex-grow">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                data-testid="edit-input"
              />
            </div>
          ) : (
            <div className="flex-grow">
              <p 
                className={`text-gray-800 dark:text-gray-200 break-words ${
                  task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                }`}
                data-testid="task-text"
              >
                {task.text}
              </p>
              <span 
                className={`inline-block mt-2 text-xs font-medium px-2.5 py-0.5 rounded ${getPriorityBadgeStyles()}`}
                data-testid="priority-badge"
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                className="p-1.5 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full transition-colors duration-200"
                data-testid="save-button"
              >
                <Save size={18} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors duration-200"
                data-testid="cancel-button"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors duration-200"
                data-testid="edit-button"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors duration-200"
                data-testid="delete-button"
              >
                <Trash size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;