import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#fff',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        {/* Logo/Illustration */}
        <div style={{
          marginBottom: '40px'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 24px auto',
            background: 'linear-gradient(135deg, #4B7BE5 0%, #6A89CC 100%)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(75, 123, 229, 0.3)'
          }}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
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
          <h1 style={{
            color: '#363942',
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '1.2',
            letterSpacing: '0.5px',
            margin: '0 0 12px 0'
          }}>
            Welcome to Task Nexus
          </h1>
          <p style={{
            color: 'rgba(54, 57, 66, 0.7)',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '1.5',
            margin: '0 0 32px 0',
            maxWidth: '320px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Advanced task management for productive teams and individuals
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {error && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'left'
            }}>
              {error}
            </div>
          )}

          <div style={{ textAlign: 'left' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#363942',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                fontSize: '16px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '400',
                color: '#363942',
                backgroundColor: '#FAFBFC',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4B7BE5';
                e.target.style.boxShadow = '0 0 0 3px rgba(75, 123, 229, 0.1)';
                e.target.style.backgroundColor = '#fff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB';
                e.target.style.boxShadow = 'none';
                e.target.style.backgroundColor = '#FAFBFC';
              }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#363942',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                fontSize: '16px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '400',
                color: '#363942',
                backgroundColor: '#FAFBFC',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4B7BE5';
                e.target.style.boxShadow = '0 0 0 3px rgba(75, 123, 229, 0.1)';
                e.target.style.backgroundColor = '#fff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB';
                e.target.style.boxShadow = 'none';
                e.target.style.backgroundColor = '#FAFBFC';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #4B7BE5 0%, #6A89CC 100%)',
              color: 'white',
              fontSize: '16px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '600',
              letterSpacing: '0.5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: loading ? 'none' : '0 4px 12px rgba(75, 123, 229, 0.3)',
              marginTop: '8px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(75, 123, 229, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(75, 123, 229, 0.3)';
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div style={{
            marginTop: '16px',
            fontSize: '14px',
            color: 'rgba(54, 57, 66, 0.7)'
          }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={{
                color: '#4B7BE5',
                textDecoration: 'none',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Create Account
            </Link>
          </div>
        </form>

        {/* Page Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '40px'
        }}>
          <div style={{
            width: '20px',
            height: '3px',
            borderRadius: '10px',
            background: '#4B7BE5'
          }} />
          <div style={{
            width: '20px',
            height: '3px',
            borderRadius: '10px',
            background: '#D9D9D9'
          }} />
          <div style={{
            width: '20px',
            height: '3px',
            borderRadius: '10px',
            background: '#D9D9D9'
          }} />
        </div>
      </div>
    </div>
  );
};

export default Login;