import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Create a new ticket and get QR code
 * @param {string} name - Participant name
 * @param {string} email - Participant email
 */
export const createTicket = async (name, email) => {
  try {
    const response = await api.post('/tickets/create', { name, email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create ticket' };
  }
};

/**
 * List all tickets
 */
export const listTickets = async () => {
  try {
    const response = await api.get('/tickets/list');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch tickets' };
  }
};

/**
 * Verify QR code payload
 * @param {object} payload - QR code payload { ticketId, email, createdAt, signature }
 */
export const verifyTicket = async (payload) => {
  try {
    const response = await api.post('/tickets/verify', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to verify ticket' };
  }
};

/**
 * Mark ticket as used
 * @param {string} ticketId - Ticket ID
 */
export const markTicketUsed = async (ticketId) => {
  try {
    const response = await api.post('/tickets/mark-used', { ticketId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to mark ticket as used' };
  }
};

