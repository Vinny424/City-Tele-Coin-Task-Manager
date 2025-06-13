import React, { useState, useEffect } from 'react';
import type { Task, CreateTaskDto } from '../types';
import { taskService } from '../services/tasks';
import { useAuth } from '../context/AuthContext';

const ModernDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filterCategory, setFilterCategory] = useState<string>('');
  const { logout } = useAuth();

  // Form state
  const [formData, setFormData] = useState<CreateTaskDto>({
    title: '',
    description: '',
    category: 'Personal',
    completed: false,
    dueDate: undefined,
  });

  const fetchTasks = async (category?: string) => {
    try {
      setLoading(true);
      const data = await taskService.getTasks(category);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(filterCategory);
  }, [filterCategory]);

  const handleCreateTask = async (taskData: CreateTaskDto) => {
    try {
      await taskService.createTask(taskData);
      setShowForm(false);
      resetForm();
      fetchTasks(filterCategory);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (taskData: CreateTaskDto) => {
    if (!editingTask) return;
    
    try {
      await taskService.updateTask(editingTask.id, taskData);
      setEditingTask(undefined);
      setShowForm(false);
      resetForm();
      fetchTasks(filterCategory);
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        fetchTasks(filterCategory);
      } catch (err) {
        setError('Failed to delete task');
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (task) {
        await taskService.updateTask(id, {
          title: task.title,
          description: task.description,
          category: task.category,
          completed,
          dueDate: task.dueDate,
        });
        fetchTasks(filterCategory);
      }
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      category: task.category,
      completed: task.completed,
      dueDate: task.dueDate,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Personal',
      completed: false,
      dueDate: undefined,
    });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      if (editingTask) {
        handleUpdateTask(formData);
      } else {
        handleCreateTask(formData);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let processedValue: any = value;
    
    if (type === 'checkbox') {
      processedValue = (e.target as HTMLInputElement).checked;
    } else if (name === 'dueDate') {
      processedValue = value ? new Date(value).toISOString() : undefined;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#fff',
      minHeight: '100vh',
      color: '#363942'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4B7BE5 0%, #6A89CC 100%)',
        padding: '24px 20px',
        marginBottom: '24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              letterSpacing: '0.5px'
            }}>
              Welcome to Task Nexus
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '16px',
              fontWeight: '400',
              margin: 0,
              letterSpacing: '0.2px'
            }}>
              Manage your tasks efficiently and boost productivity
            </p>
          </div>
          <button
            onClick={logout}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div style={{
            background: '#F8F9FE',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #E8EAED',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#4B7BE5',
              marginBottom: '8px'
            }}>
              {totalTasks}
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#6B7280',
              letterSpacing: '0.2px'
            }}>
              Total Tasks
            </div>
          </div>

          <div style={{
            background: '#FFF8F0',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #FFE4B5',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#FF8C00',
              marginBottom: '8px'
            }}>
              {pendingTasks}
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#6B7280',
              letterSpacing: '0.2px'
            }}>
              Pending Tasks
            </div>
          </div>

          <div style={{
            background: '#F0FDF4',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #BBF7D0',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#22C55E',
              marginBottom: '8px'
            }}>
              {completedTasks}
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#6B7280',
              letterSpacing: '0.2px'
            }}>
              Completed Tasks
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '500',
                color: '#363942',
                background: 'white',
                minWidth: '150px'
              }}
            >
              <option value="">All Categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            onClick={() => setShowForm(true)}
            style={{
              background: '#4B7BE5',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '0.2px'
            }}
          >
            + Add New Task
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Tasks Grid */}
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #E5E7EB',
              borderTop: '4px solid #4B7BE5',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        ) : tasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '64px 20px',
            color: '#9CA3AF'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 8px 0',
              color: '#6B7280'
            }}>
              No tasks found
            </h3>
            <p style={{
              fontSize: '14px',
              margin: 0,
              color: '#9CA3AF'
            }}>
              Create your first task to get started!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {tasks.map((task) => (
              <div
                key={task.id}
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
                      onChange={(e) => handleToggleComplete(task.id, e.target.checked)}
                      style={{
                        marginRight: '8px',
                        transform: 'scale(1.2)'
                      }}
                    />
                    {task.completed ? 'Completed' : 'Mark complete'}
                  </label>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEditTask(task)}
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
                      onClick={() => handleDeleteTask(task.id)}
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
            ))}
          </div>
        )}
      </div>

      {/* Task Form Modal */}
      {showForm && (
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

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onClick={handleCloseForm}
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
      )}

      {/* Add CSS for spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

// Helper functions for category colors
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

export default ModernDashboard;