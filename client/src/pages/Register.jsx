import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/dataService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNumber: '',
  });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');  // ← NEW: for VIT email error
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setEmailError(''); // clear email error on typing
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.rollNumber) {
      setError('All fields are required');
      return false;
    }

    // ← NEW: Only allow @vitbhopal.ac.in emails
    if (!formData.email.endsWith('@vitbhopal.ac.in')) {
      setEmailError('Only @vitbhopal.ac.in emails are allowed');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.name.length < 2) {
      setError('Name must be at least 2 characters long');
      return false;
    }

    setEmailError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const response = await registerUser(
        formData.name,
        formData.email,
        formData.password,
        formData.rollNumber
      );
      if (response.success) {
        navigate('/login', { state: { message: 'Registration successful! Please login.' } });
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Join E-Cell</h2>
          <p className="text-white/70 text-center mb-8">Create your member account</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white/90 mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white/90 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="yourname@vitbhopal.ac.in"
                required
              />
              {emailError && (
                <p className="text-red-400 text-sm mt-2 animate-pulse">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="rollNumber" className="block text-white/90 mb-2 font-medium">
                Roll Number
              </label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., 2024CS001"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white/90 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-center text-white/70">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:text-accent-light font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
