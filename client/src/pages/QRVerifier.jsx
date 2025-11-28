import React, { useState, useRef, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { verifyTicket, markTicketUsed } from '../services/ticketService';

const QRVerifier = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setError('');
      setResult(null);

      const html5QrCode = new Html5Qrcode("reader");
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        (errorMessage) => {
          // Ignore scanning errors
        }
      );

      setScanning(true);
    } catch (err) {
      setError('Failed to start camera. Please check permissions.');
      console.error('Start scanning error:', err);
    }
  };

  const stopScanning = async () => {
    try {
      if (html5QrCodeRef.current) {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
      }
      setScanning(false);
      setError('');
    } catch (err) {
      console.error('Stop scanning error:', err);
    }
  };

  const handleScanSuccess = async (decodedText) => {
    try {
      if (html5QrCodeRef.current) {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
      }
      setScanning(false);

      let payload;
      try {
        payload = JSON.parse(decodedText);
      } catch (e) {
        setError('Invalid QR code format. Please scan a valid ticket.');
        return;
      }

      if (!payload.ticketId || !payload.email || !payload.createdAt || !payload.signature) {
        setError('Invalid ticket data. Missing required fields.');
        return;
      }

      setLoading(true);
      setError('');

      const verifyResponse = await verifyTicket(payload);

      if (verifyResponse.success) {
        const markResponse = await markTicketUsed(payload.ticketId);

        if (markResponse.success) {
          setResult({
            success: true,
            ticket: verifyResponse.ticket,
            message: 'Ticket verified and marked as used!',
          });
        } else {
          setError(markResponse.message || 'Ticket verified but failed to mark as used.');
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to verify ticket. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    if (!scanning) {
      // allow user to start scanning again
      html5QrCodeRef.current = null;
    }
  };

  return (
    <div className="min-h-screen pt-16 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          QR Ticket Verifier
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {result && result.success && (
          <div className="mb-6 p-6 bg-green-500/20 border border-green-500/50 rounded-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-300 mb-2">Ticket Verified!</h3>
                <p className="text-green-200 mb-4">{result.message}</p>
                <div className="bg-white/10 rounded-lg p-4 space-y-2">
                  <p><span className="text-green-200/70">Ticket ID:</span> <span className="text-green-300 font-bold">{result.ticket.ticketId}</span></p>
                  <p><span className="text-green-200/70">Name:</span> <span className="text-green-300">{result.ticket.name}</span></p>
                  <p><span className="text-green-200/70">Email:</span> <span className="text-green-300">{result.ticket.email}</span></p>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-colors duration-200"
                >
                  Scan Another Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scanner Section */}
        <div className="glass rounded-2xl p-8 relative">
          <div
            id="reader"
            className="w-full max-w-md mx-auto relative rounded-lg overflow-hidden bg-black"
            style={{ height: '400px' }}
          >
            {/* Frame Overlay */}
            <div className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 border-4 border-green-500 rounded-lg pointer-events-none"></div>
          </div>

          {/* Start button */}
          {!scanning && !loading && !result && (
            <div className="text-center py-12">
              <p className="text-white/70 mb-6">Click the button below to start scanning QR codes</p>
              <button
                onClick={startScanning}
                className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-semibold transition-colors duration-200"
              >
                Start Scanning
              </button>
            </div>
          )}

          {scanning && (
            <div className="mb-4 flex justify-between items-center">
              <p className="text-white/70">Position the QR code within the frame</p>
              <button
                onClick={stopScanning}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors duration-200"
              >
                Stop Scanning
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mb-4"></div>
              <p className="text-white/70">Verifying ticket...</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        {!result && (
          <div className="mt-6 glass rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-3">How to Use:</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>• Click "Start Scanning" to activate your camera</li>
              <li>• Point your camera at the QR code on the ticket</li>
              <li>• Wait for automatic verification</li>
              <li>• The ticket will be marked as used after successful verification</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRVerifier;
