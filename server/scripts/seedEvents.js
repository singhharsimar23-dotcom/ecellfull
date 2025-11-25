const mongoose = require('mongoose');
const Event = require('../models/Event');
require('dotenv').config();

const events = [
  {
    title: 'Startup Hackathon 2024',
    description: 'Join us for a 48-hour hackathon to build innovative solutions and compete for prizes worth ₹50,000.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  },
  {
    title: 'VC Pitch Session',
    description: 'Pitch your startup idea to real venture capitalists and get valuable feedback on your business model.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
  },
  {
    title: 'Business Plan Workshop',
    description: 'Learn how to create a compelling business plan that investors will love. Hands-on session with templates.',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
  },
  {
    title: 'Innovation Challenge',
    description: 'Showcase your innovative ideas and win mentorship opportunities with industry leaders.',
    date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
  },
  {
    title: 'Mentorship Meetup',
    description: 'Connect with successful entrepreneurs and get guidance on your startup journey. One-on-one sessions available.',
    date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800',
  },
  {
    title: 'Entrepreneurship Summit',
    description: 'Annual summit featuring keynote speakers, networking sessions, and startup exhibitions. Don\'t miss out!',
    date: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
  },
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecell-portal');
    console.log('✅ Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('✅ Cleared existing events');

    // Insert new events
    await Event.insertMany(events);
    console.log('✅ Seeded events successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding events:', error);
    process.exit(1);
  }
};

seedEvents();

