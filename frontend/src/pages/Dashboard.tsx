import React from 'react';
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <TaskList />
    </Layout>
  );
};

export default Dashboard;