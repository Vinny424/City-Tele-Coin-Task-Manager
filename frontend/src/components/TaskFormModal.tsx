import React from 'react';
import type { Task, CreateTaskDto } from '../types';

interface TaskFormModalProps {
  isOpen: boolean;
  editingTask?: Task;
  formData: CreateTaskDto;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onClose: () => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  editingTask,
  formData,
  onSubmit,
  onInputChange,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '700',
          margin: '0 0 20px 0',
          color: '#363942'
        }}>
          {editingTask ? 'Edit Task' : 'Create New Task'}
        </h2>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#363942',
              marginBottom: '6px'
            }}>
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={onInputChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#363942',
              marginBottom: '6px'
            }}>
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={onInputChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#363942',
              marginBottom: '6px'
            }}>
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={onInputChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif',
                boxSizing: 'border-box'
              }}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#363942',
              marginBottom: '6px'
            }}>
              Due Date
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              value={formData.dueDate ? new Date(formData.dueDate).toISOString().slice(0, 16) : ''}
              onChange={onInputChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={onInputChange}
              style={{ transform: 'scale(1.2)' }}
            />
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#363942'
            }}>
              Mark as completed
            </label>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '8px'
          }}>
            <button
              type="submit"
              style={{
                flex: 1,
                background: '#4B7BE5',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              {editingTask ? 'Update Task' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                background: '#F3F4F6',
                color: '#374151',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;