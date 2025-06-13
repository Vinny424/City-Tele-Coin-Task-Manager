import React from 'react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const categoryColors = {
    Work: 'bg-blue-100 text-blue-800',
    Personal: 'bg-green-100 text-green-800',
    Other: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                categoryColors[task.category as keyof typeof categoryColors] || categoryColors.Other
              }`}
            >
              {task.category}
            </span>
          </div>
          {task.description && (
            <p className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              {task.description}
            </p>
          )}
          {task.dueDate && (
            <div className="mb-3">
              <span className={`text-sm ${
                new Date(task.dueDate) < new Date() && !task.completed
                  ? 'text-red-600 font-medium'
                  : task.completed
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }`}>
                Due: {new Date(task.dueDate).toLocaleDateString()} at {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {new Date(task.dueDate) < new Date() && !task.completed && (
                  <span className="ml-2 text-red-600 font-medium">(Overdue)</span>
                )}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                {task.completed ? 'Completed' : 'Mark as complete'}
              </span>
            </label>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TaskCard;