import React from 'react';

const FilterBar = ({ currentFilter, onFilterChange, taskCount }) => {
  const filters = [
    { value: 'all', label: 'All', count: taskCount.all },
    { value: 'active', label: 'Active', count: taskCount.active },
    { value: 'completed', label: 'Completed', count: taskCount.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
            currentFilter === filter.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          data-testid={`filter-${filter.value}`}
        >
          {filter.label}
          <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-white/20 text-white dark:bg-black/20">
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;