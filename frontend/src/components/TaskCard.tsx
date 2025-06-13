import React from 'react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Work': return '#DBEAFE';
      case 'Personal': return '#D1FAE5';
      case 'Other': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  };

  const getCategoryTextColor = (category: string): string => {
    switch (category) {
      case 'Work': return '#1E40AF';
      case 'Personal': return '#065F46';
      case 'Other': return '#374151';
      default: return '#374151';
    }
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          margin: 0,
          color: task.completed ? '#9CA3AF' : '#363942',
          textDecoration: task.completed ? 'line-through' : 'none',
          lineHeight: '1.5'
        }}>
          {task.title}
        </h3>
        <span style={{
          background: getCategoryColor(task.category),
          color: getCategoryTextColor(task.category),
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          whiteSpace: 'nowrap'
        }}>
          {task.category}
        </span>
      </div>

      {task.description && (
        <p style={{
          fontSize: '14px',
          color: task.completed ? '#D1D5DB' : '#6B7280',
          margin: '0 0 16px 0',
          lineHeight: '1.5'
        }}>
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <div style={{
          fontSize: '12px',
          color: new Date(task.dueDate) < new Date() && !task.completed ? '#DC2626' : '#6B7280',
          marginBottom: '16px',
          fontWeight: '500'
        }}>
          Due: {new Date(task.dueDate).toLocaleDateString()} at {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {new Date(task.dueDate) < new Date() && !task.completed && (
            <span style={{ color: '#DC2626', marginLeft: '8px' }}>(Overdue)</span>
          )}
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#6B7280'
        }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggleComplete(task.id, e.target.checked)}
            style={{
              marginRight: '8px',
              transform: 'scale(1.2)'
            }}
          />
          {task.completed ? 'Completed' : 'Mark complete'}
        </label>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onEdit(task)}
            style={{
              background: 'none',
              border: 'none',
              color: '#4B7BE5',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            style={{
              background: 'none',
              border: 'none',
              color: '#DC2626',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;