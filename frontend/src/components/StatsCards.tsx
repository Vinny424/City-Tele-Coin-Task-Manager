import React from 'react';

interface StatsCardsProps {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ totalTasks, pendingTasks, completedTasks }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    }}>
      <div style={{
        background: 'rgba(75, 123, 229, 0.05)',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid rgba(75, 123, 229, 0.15)',
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
        background: 'rgba(210, 133, 98, 0.05)',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid rgba(210, 133, 98, 0.15)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#d28562',
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
        background: 'rgba(133, 210, 98, 0.05)',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid rgba(133, 210, 98, 0.15)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#85d262',
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
  );
};

export default StatsCards;