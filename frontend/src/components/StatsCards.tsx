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
  );
};

export default StatsCards;