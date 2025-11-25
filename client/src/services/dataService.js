import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const buildMockEvents = () => [
  {
    _id: '1',
    title: 'Startup Hackathon 2024',
    description:
      'Join us for a 48-hour hackathon to build innovative solutions and compete for prizes.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  },
  {
    _id: '2',
    title: 'VC Pitch Session',
    description:
      'Pitch your startup idea to real venture capitalists and get valuable feedback.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
  },
  {
    _id: '3',
    title: 'Business Plan Workshop',
    description: 'Learn how to create a compelling business plan that investors will love.',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
  },
  {
    _id: '4',
    title: 'Innovation Challenge',
    description:
      'Showcase your innovative ideas and win mentorship opportunities with industry leaders.',
    date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
  },
  {
    _id: '5',
    title: 'Mentorship Meetup',
    description:
      'Connect with successful entrepreneurs and get guidance on your startup journey.',
    date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800',
  },
  {
    _id: '6',
    title: 'Entrepreneurship Summit',
    description:
      'Annual summit featuring keynote speakers, networking sessions, and startup exhibitions.',
    date: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
  },
];

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (name, email, password, rollNumber) => {
  try {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      rollNumber,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const fetchUserProfile = async (token) => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch profile' };
  }
};

export const fetchUpcomingEvents = async () => {
  try {
    const response = await api.get('/events/upcoming');
    if (response.data?.events?.length) {
      return response.data;
    }
    const mockEvents = buildMockEvents();
    return { success: true, count: mockEvents.length, events: mockEvents };
  } catch (error) {
    // For development, return mock data if API fails
    if (error.response?.status === 404 || !error.response) {
      const mockEvents = buildMockEvents();
      return { success: true, count: mockEvents.length, events: mockEvents };
    }
    throw error.response?.data || { message: 'Failed to fetch events' };
  }
};

