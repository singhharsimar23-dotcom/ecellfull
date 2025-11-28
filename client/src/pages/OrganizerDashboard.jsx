import React, { useState, useEffect } from 'react';
import { createTicket, listTickets } from '../services/ticketService';

const OrganizerDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [generatedQR, setGeneratedQR] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const response = await listTickets();
      if (response.success) {
        setTickets(response.tickets);
      }
    } catch (err) {
      setError(err.message || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setGeneratedQR(null);

    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await createTicket(formData.name, formData.email);
      if (response.success) {
        setSuccess('Ticket created successfully!');
        setGeneratedQR(response.qrCode);
        setSelectedTicket(response.ticket);
        setFormData({ name: '', email: '' });
        loadTickets(); // Refresh list
      }
    } catch (err) {
      setError(err.message || 'Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!generatedQR) return;
    
    const link = document.createElement('a');
    link.href = generatedQR;
    link.download = `ticket-${selectedTicket?.ticketId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen pt-16 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Organizer Dashboard
        </h1>

        {/* Create Ticket Form */}
        <div className="glass rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Add Participant & Generate Ticket</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-200 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white/90 mb-2 font-medium">
                Participant Name
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
                placeholder="participant@example.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating Ticket...' : 'Generate QR Ticket'}
            </button>
          </form>

          {/* Generated QR Code Display */}
          {generatedQR && selectedTicket && (
            <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Generated Ticket</h3>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-white p-4 rounded-lg">
                  <img src={generatedQR} alt="QR Code" className="w-48 h-48" />
                </div>
                <div className="flex-1 text-white">
                  <p className="mb-2"><span className="text-white/70">Ticket ID:</span> <span className="font-bold">{selectedTicket.ticketId}</span></p>
                  <p className="mb-2"><span className="text-white/70">Name:</span> {selectedTicket.name}</p>
                  <p className="mb-2"><span className="text-white/70">Email:</span> {selectedTicket.email}</p>
                  <p className="mb-4"><span className="text-white/70">Status:</span> <span className="text-green-400 font-semibold">Unused</span></p>
                  <button
                    onClick={downloadQR}
                    className="px-4 py-2 bg-primary-light hover:bg-primary-dark text-white rounded-lg transition-colors duration-200"
                  >
                    Download QR Code
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tickets List */}
        <div className="glass rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">All Tickets</h2>
            <button
              onClick={loadTickets}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200"
            >
              Refresh
            </button>
          </div>

          {loading && tickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/70">Loading tickets...</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/70">No tickets generated yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-white/90 font-semibold">Ticket ID</th>
                    <th className="text-left py-3 px-4 text-white/90 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-white/90 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 text-white/90 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-white/90 font-semibold">Created</th>
                    <th className="text-left py-3 px-4 text-white/90 font-semibold">Used At</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white font-mono text-sm">{ticket.ticketId}</td>
                      <td className="py-3 px-4 text-white">{ticket.name}</td>
                      <td className="py-3 px-4 text-white/80">{ticket.email}</td>
                      <td className="py-3 px-4">
                        {ticket.used ? (
                          <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-semibold">
                            Used
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">
                            Unused
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-white/70 text-sm">{formatDate(ticket.createdAt)}</td>
                      <td className="py-3 px-4 text-white/70 text-sm">
                        {ticket.usedAt ? formatDate(ticket.usedAt) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;

