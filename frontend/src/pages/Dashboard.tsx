import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Task, CreateTaskDto } from '../types';
import { taskService } from '../services/tasks';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';

const Dashboard: React.FC = () => {
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
      color: '#363942',
      paddingBottom: '100px'
    }}>
      <Header onLogout={logout} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <StatsCards 
          totalTasks={totalTasks}
          pendingTasks={pendingTasks}
          completedTasks={completedTasks}
        />

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
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '16px' 
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="10,9 9,9 8,9" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
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
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </div>

      <TaskFormModal
        isOpen={showForm}
        editingTask={editingTask}
        formData={formData}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onClose={handleCloseForm}
      />

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#F8F6FF',
        borderTop: '1px solid #E5E7EB',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#4B7BE5',
            fontSize: '10px',
            fontWeight: '500'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '4px' }}>
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Dashboard
        </Link>
        
        <Link
          to="/schedule"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#6B7280',
            fontSize: '10px',
            fontWeight: '500'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '4px' }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#6B7280" strokeWidth="2"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Schedule
        </Link>
        
        <Link
          to="/about"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#6B7280',
            fontSize: '10px',
            fontWeight: '500'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '4px' }}>
            <circle cx="12" cy="12" r="10" stroke="#6B7280" strokeWidth="2"/>
            <path d="M12 16V12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          About
        </Link>
      </div>

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

export default Dashboard;