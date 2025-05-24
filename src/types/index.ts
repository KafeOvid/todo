export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskFilter = 'all' | 'active' | 'completed';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: number;
}