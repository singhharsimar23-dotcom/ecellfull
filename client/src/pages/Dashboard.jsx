import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserProfile, fetchUpcomingEvents } from '../services/dataService';

const Dashboard = () => {
  const { user: authUser, token } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError('');

      try {
        // Fetch user profile
        if (token) {
          try {
            const profileResponse = await fetchUserProfile(token);
            if (profileResponse.success) {
              setUserProfile(profileResponse.user);
            }
          } catch (err) {
            // If API fails, use auth context user
            setUserProfile(authUser);
          }
        } else {
          setUserProfile(authUser);
        }

        // Fetch events
        const eventsResponse = await fetchUpcomingEvents();
        if (eventsResponse.success) {
          setEvents(eventsResponse.events.slice(0, 6)); // Ensure exactly 6 events
        }
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token, authUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Member Dashboard
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg max-w-2xl mx-auto">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>
              {userProfile && (
                <div className="space-y-4">
                  <div>
                    <p className="text-white/70 text-sm mb-1">Full Name</p>
                    <p className="text-white text-lg font-semibold">{userProfile.name}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-1">Email</p>
                    <p className="text-white text-lg font-semibold">{userProfile.email}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-1">Roll Number</p>
                    <p className="text-white text-lg font-semibold">{userProfile.rollNumber}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-1">Member ID</p>
                    <p className="text-accent text-lg font-bold">{userProfile.memberId}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Events Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
            {events.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center">
                <p className="text-white/70">No upcoming events at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="glass rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center text-accent text-sm font-medium">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {formatDate(event.date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

