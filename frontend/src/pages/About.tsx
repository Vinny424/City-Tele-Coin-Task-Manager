import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const About: React.FC = () => {
  const { logout } = useAuth();

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
            About Task Nexus
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
        maxWidth: '800px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        {/* App Logo/Icon */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 16px auto',
            background: 'linear-gradient(135deg, #4B7BE5 0%, #6A89CC 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(75, 123, 229, 0.3)'
          }}>
            <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
              <rect x="12" y="8" width="36" height="44" rx="4" fill="white" fillOpacity="0.9"/>
              <rect x="16" y="14" width="28" height="3" rx="1.5" fill="#4B7BE5"/>
              <path d="M20 22H44M20 28H44M20 34H38" stroke="#B0C4DE" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="18" cy="22" r="1.5" fill="#6A89CC"/>
              <circle cx="18" cy="28" r="1.5" fill="#6A89CC"/>
              <circle cx="18" cy="34" r="1.5" fill="#6A89CC"/>
              <circle cx="36" cy="42" r="6" fill="#4B7BE5"/>
              <path d="M33 42L35 44L39 40" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{
            color: '#363942',
            fontSize: '24px',
            fontWeight: '700',
            margin: '0 0 8px 0'
          }}>
            Task Nexus
          </h2>
          <p style={{
            color: '#6B7280',
            fontSize: '14px',
            margin: 0
          }}>
            Version 1.0.0
          </p>
        </div>

        {/* Description */}
        <div style={{
          background: 'rgba(75, 123, 229, 0.05)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid rgba(75, 123, 229, 0.15)'
        }}>
          <h3 style={{
            color: '#363942',
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 16px 0'
          }}>
            About This Project
          </h3>
          <p style={{
            color: '#6B7280',
            fontSize: '14px',
            lineHeight: '1.6',
            margin: '0 0 16px 0'
          }}>
            Task Nexus is a full-stack task management application built to demonstrate modern web development 
            practices and technologies. This project showcases a complete end-to-end solution for organizing, 
            tracking, and completing tasks efficiently.
          </p>
          <p style={{
            color: '#6B7280',
            fontSize: '14px',
            lineHeight: '1.6',
            margin: 0
          }}>
            Developed with a focus on clean architecture, responsive design, and user experience, 
            this application represents a comprehensive example of contemporary full-stack development.
          </p>
        </div>

        {/* Features */}
        <div style={{
          marginBottom: '32px'
        }}>
          <h3 style={{
            color: '#363942',
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 20px 0'
          }}>
            Key Features
          </h3>
          <div style={{
            display: 'grid',
            gap: '16px'
          }}>
            {[
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Task Management',
                description: 'Create, edit, and organize tasks with categories and due dates'
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#4B7BE5" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Schedule View',
                description: 'Visualize your tasks in a clean calendar interface'
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#6B7280" strokeWidth="2"/>
                    <path d="M7 11V7A5 5 0 0 1 17 7V11" stroke="#6B7280" strokeWidth="2"/>
                  </svg>
                ),
                title: 'Secure Authentication',
                description: 'Protected user accounts with JWT token security'
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#F59E0B" strokeWidth="2"/>
                    <path d="M10 4V2C10 1.46957 10.2107 0.960859 10.5858 0.585786C10.9609 0.210714 11.4696 0 12 0C12.5304 0 13.0391 0.210714 13.4142 0.585786C13.7893 0.960859 14 1.46957 14 2V4" stroke="#F59E0B" strokeWidth="2"/>
                  </svg>
                ),
                title: 'Responsive Design',
                description: 'Works seamlessly on desktop, tablet, and mobile devices'
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 17L12 22L21 17" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12L12 17L21 12" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Modern UI',
                description: 'Clean, intuitive interface with smooth animations'
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Real-time Updates',
                description: 'Instant synchronization across all your devices'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  background: 'white',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  marginTop: '2px'
                }}>
                  {feature.icon}
                </div>
                <div>
                  <h4 style={{
                    color: '#363942',
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: '0 0 4px 0'
                  }}>
                    {feature.title}
                  </h4>
                  <p style={{
                    color: '#6B7280',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div style={{
          background: 'rgba(34, 197, 94, 0.05)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid rgba(34, 197, 94, 0.15)'
        }}>
          <h3 style={{
            color: '#363942',
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 16px 0'
          }}>
            Technology Stack
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px'
          }}>
            {[
              'React',
              'TypeScript',
              'ASP.NET Core',
              'PostgreSQL',
              'Docker',
              'JWT Auth'
            ].map((tech, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  color: '#059669',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  textAlign: 'center'
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Creator Information */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          background: '#F9FAFB',
          borderRadius: '12px',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{
            color: '#363942',
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0'
          }}>
            Created by Vincent Hartline
          </h3>
          <p style={{
            color: '#6B7280',
            fontSize: '14px',
            lineHeight: '1.6',
            margin: '0 0 16px 0'
          }}>
            This application was built as a full-stack project demonstrating modern web development practices. 
            Feel free to reach out with questions or feedback!
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#4B7BE5',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              vhartline03@gmail.com
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#4B7BE5',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 19C-2 19 -2 5 9 5C20 5 20 19 9 19Z" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 19C26 19 26 5 15 5C4 5 4 19 15 19Z" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="9" y1="12" x2="15" y2="12" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <a href="https://github.com/Vinny424" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                github.com/Vinny424
              </a>
            </div>
          </div>
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
            color: '#4B7BE5',
            fontSize: '10px',
            fontWeight: '500'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '4px' }}>
            <circle cx="12" cy="12" r="10" stroke="#4B7BE5" strokeWidth="2"/>
            <path d="M12 16V12" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="#4B7BE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          About
        </Link>
      </div>
    </div>
  );
};

export default About;