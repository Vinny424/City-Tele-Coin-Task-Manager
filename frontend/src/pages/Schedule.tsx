import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/tasks';
import type { Task } from '../types';

const Schedule: React.FC = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  // Get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get start of week (Monday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  // Generate week days
  const getWeekDays = () => {
    const weekStart = getWeekStart(currentWeek);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // Navigate weeks
  const goToPreviousWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(newWeek);
  };

  const goToNextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(newWeek);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const weekDays = getWeekDays();
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#fff',
      minHeight: '100vh',
      paddingBottom: '100px'
    }}>
      {/* Header */}
      <div style={{
        background: '#F8F6FF',
        padding: '20px 24px',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            color: '#363942',
            fontSize: '18px',
            fontWeight: '700',
            margin: 0,
            letterSpacing: '0.18px'
          }}>
            Schedule
          </h1>
          <button
            onClick={logout}
            style={{
              background: 'none',
              border: 'none',
              color: '#6B7280',
              fontSize: '14px',
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
        padding: '24px'
      }}>
        {/* Week Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <button
            onClick={goToPreviousWeek}
            style={{
              background: 'none',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#363942',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            ← Previous
          </button>
          
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#363942',
            margin: 0
          }}>
            {currentWeek.toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </h2>
          
          <button
            onClick={goToNextWeek}
            style={{
              background: 'none',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#363942',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            Next →
          </button>
        </div>

        {/* Week Days Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {weekDays.map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected = day.toDateString() === selectedDate.toDateString();
            
            return (
              <div
                key={index}
                onClick={() => setSelectedDate(day)}
                style={{
                  background: isSelected ? '#4B7BE5' : 'transparent',
                  borderRadius: '8px',
                  padding: '12px 8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: isToday && !isSelected ? '2px solid #4B7BE5' : '1px solid transparent'
                }}
              >
                <div style={{
                  color: isSelected ? '#F8F6FF' : '#363942',
                  fontSize: '10px',
                  fontWeight: '500',
                  marginBottom: '4px',
                  letterSpacing: '0.10px'
                }}>
                  {dayNames[index]}
                </div>
                <div style={{
                  color: isSelected ? '#F8F6FF' : '#363942',
                  fontSize: '16px',
                  fontWeight: '600',
                  letterSpacing: '0.16px'
                }}>
                  {day.getDate()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Date Tasks */}
        <div style={{
          marginTop: '32px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#363942',
            marginBottom: '16px'
          }}>
            Tasks for {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>

          {getTasksForDate(selectedDate).length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6B7280',
              fontSize: '14px'
            }}>
              No tasks scheduled for this date
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {getTasksForDate(selectedDate)
                .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
                .map((task) => (
                <div
                  key={task.id}
                  style={{
                    background: task.completed ? '#4B7BE5' : 'white',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '3px 3px 16px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{
                      color: task.completed ? '#F8F6FF' : '#363942',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '4px',
                      letterSpacing: '0.14px',
                      textDecoration: task.completed ? 'line-through' : 'none'
                    }}>
                      {task.title}
                    </div>
                    {task.dueDate && (
                      <div style={{
                        color: task.completed ? '#F8F6FF' : '#363942',
                        fontSize: '10px',
                        fontWeight: '400',
                        letterSpacing: '0.10px',
                        opacity: task.completed ? 0.8 : 0.7
                      }}>
                        {formatTime(task.dueDate)}
                      </div>
                    )}
                  </div>
                  <div style={{
                    background: task.completed ? 'rgba(248, 246, 255, 0.2)' : `rgba(${task.category === 'Work' ? '75, 123, 229' : task.category === 'Personal' ? '34, 197, 94' : '156, 163, 175'}, 0.1)`,
                    color: task.completed ? '#F8F6FF' : '#363942',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '500'
                  }}>
                    {task.category}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
            color: '#6B7280',
            fontSize: '10px',
            fontWeight: '500'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '4px' }}>
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
            color: '#4B7BE5',
            fontSize: '10px',
            fontWeight: '500'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '4px' }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#4B7BE5" strokeWidth="2"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round"/>
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
    </div>
  );
};

export default Schedule;