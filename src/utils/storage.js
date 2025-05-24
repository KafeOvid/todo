export const saveTasks = (tasks) => {
  localStorage.setItem('todo-app-tasks', JSON.stringify(tasks));
};

export const loadTasks = () => {
  const tasks = localStorage.getItem('todo-app-tasks');
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTheme = (isDark) => {
  localStorage.setItem('todo-app-theme', JSON.stringify(isDark));
};

export const loadTheme = () => {
  const theme = localStorage.getItem('todo-app-theme');
  return theme ? JSON.parse(theme) : false;
};