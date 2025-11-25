import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Igniting Ideas,
              <br />
              <span className="text-accent">Nurturing Ventures</span>
              <br />
              Building Leaders
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Welcome to the E-Cell Member Portal. Join a community of innovators, 
              entrepreneurs, and future leaders.
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
          </div>

          {/* Mission Card */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-white/90 text-center leading-relaxed">
              "Igniting Ideas, Nurturing Ventures, Building Leaders."
            </p>
            <p className="text-base md:text-lg text-white/80 text-center mt-6 leading-relaxed">
              To foster a spirit of entrepreneurship, innovation, and leadership among students.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Innovation', icon: '💡', desc: 'Think beyond boundaries' },
              { title: 'Collaboration', icon: '🤝', desc: 'Together we achieve more' },
              { title: 'Execution', icon: '⚡', desc: 'Ideas into reality' },
              { title: 'Resilience', icon: '🔥', desc: 'Persevere and overcome' },
            ].map((value, idx) => (
              <div key={idx} className="glass rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-200">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-white/80">{value.desc}</p>
              </div>
            ))}
          </div>

          {/* Key Activities */}
          <div className="glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              What We Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Hackathons',
                'Business Plan Competitions',
                'Mentorship Programs',
                'VC Pitches',
                'Workshops',
                'Networking Events',
              ].map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-white/90 text-lg">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

